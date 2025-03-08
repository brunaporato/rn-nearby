import { Details, DetailsProps } from "@/components/PlaceScreen/Details";
import { DetailsCover } from "@/components/PlaceScreen/DetailsCover";
import { Loading } from "@/components/Loading";
import { api } from "@/services/api";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Modal, ScrollView, StatusBar, View } from "react-native";
import { Coupon } from "@/components/PlaceScreen/Coupon";
import { Button } from "@/components/Button";
import { IconScan } from "@tabler/icons-react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

interface DataProps extends DetailsProps {
  cover: string;
}

export default function Place() {
  const [data, setData] = useState<DataProps>();
  const [isLoading, setIsLoading] = useState(true);
  const [coupon, setCoupon] = useState<string | null>(null);
  const [isFetchingCoupon, setIsFetchingCoupon] = useState(false);
  const [isCameraModalVisible, setIsCameraModalVisible] = useState(false);

  const [_, requestPermission] = useCameraPermissions();
  const { id } = useLocalSearchParams();

  const qrLock = useRef(false);

  async function fetchPlace() {
    try {
      const { data } = await api.get(`/markets/${id}`);
      setData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível carregar o local.", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    }
  }

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission();

      if (!granted) {
        return Alert.alert(
          "Câmera",
          "Você precisa habilitar o acesso à câmera para ler o QR Code."
        );
      }

      qrLock.current = false;
      setIsCameraModalVisible(true);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível abrir a câmera.");
    }
  }

  async function getCoupon(id: string) {
    try {
      setIsFetchingCoupon(true);

      const { data } = await api.patch(`/coupons/${id}`);
      Alert.alert("Cupom", `Seu cupom é: ${data.coupon}`);

      setCoupon(data.coupon);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível obter o cupom.");
    } finally {
      setIsFetchingCoupon(false);
    }
  }

  function handleUseCoupon(id: string) {
    setIsCameraModalVisible(false);

    Alert.alert(
      "Cupom",
      "Não é possível reutilizar um cupom resgatado. Deseja realmente resgatar o cupom?",
      [
        { style: "cancel", text: "Não" },
        { style: "default", text: "Sim", onPress: () => getCoupon(id) },
      ]
    );
  }

  useEffect(() => {
    fetchPlace();
  }, [id, coupon]);

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <Redirect href="/home" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" hidden={isCameraModalVisible} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <DetailsCover uri={data.cover} />
        <Details data={data} />
        {coupon && <Coupon code={coupon} />}
      </ScrollView>

      <View style={{ padding: 32 }}>
        <Button onPress={handleOpenCamera}>
          <Button.Icon icon={IconScan} />
          <Button.Title>Ler QR Code</Button.Title>
        </Button>
      </View>

      <Modal style={{ flex: 1 }} visible={isCameraModalVisible}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true;
              handleUseCoupon(data);
            }
          }}
        />

        <View style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
          <Button
            onPress={() => setIsCameraModalVisible(false)}
            isLoading={isFetchingCoupon}
          >
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  );
}
