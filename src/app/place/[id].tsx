import { DetailsCover } from "@/components/DetailsCover";
import { Loading } from "@/components/Loading";
import { PlaceProps } from "@/components/Place";
import { api } from "@/services/api";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";

export default function Place() {
  const [data, setData] = useState<PlaceProps>();
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

  return (
    <View style={{ flex: 1, }}>
      {data && <DetailsCover uri={data.cover} />}
    </View>
  );
}
