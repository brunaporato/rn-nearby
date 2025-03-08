import { Details, DetailsProps } from "@/components/PlaceScreen/Details";
import { DetailsCover } from "@/components/PlaceScreen/DetailsCover";
import { Loading } from "@/components/Loading";
import { api } from "@/services/api";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { Coupon } from "@/components/PlaceScreen/Coupon";

interface DataProps extends DetailsProps {
  cover: string;
}

export default function Place() {
  const [data, setData] = useState<DataProps>();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useLocalSearchParams();

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

  useEffect(() => {
    fetchPlace();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <Redirect href="/home" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <DetailsCover uri={data.cover} />

      <Details data={data} />
      <Coupon code="123456" />
    </View>
  );
}
