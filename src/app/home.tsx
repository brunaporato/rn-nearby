import { Categories, CategoryProps } from "@/components/Categories";
import { PlaceProps } from "@/components/Place";
import { Places } from "@/components/Places";
import { api } from "@/services/api";
import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/font-family";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
// import * as Location from "expo-location";

// REF: temp location
const currentLocation = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494,
};

export default function Home() {
  const [categories, setCategories] = useState<CategoryProps[]>();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [places, setPlaces] = useState<PlaceProps[]>();
  // const [currentLocation, setCurrentLocation] = useState<Location.LocationObject>();

  async function fetchCategories() {
    try {
      const { data } = await api.get("/categories");
      setCategories(data);
      setSelectedCategory(data[0].id);
    } catch (error) {
      console.error(error);
      Alert.alert("Categorias", "Não foi possível carregar as categorias.");
    }
  }

  async function fetchPlaces() {
    try {
      if (!selectedCategory) return;

      const { data } = await api.get("/markets/category/" + selectedCategory);
      setPlaces(data);
    } catch (error) {
      console.error(error);
      Alert.alert("Locais", "Não foi possível carregar os locais.");
    }
  }

  // REF: when fetching actual user's location
  // async function getCurrentLocation() {
  //   try {
  //     const { granted } = await Location.requestForegroundPermissionsAsync();

  //     if (granted) {
  //       const location = await Location.getCurrentPositionAsync();
  //       setCurrentLocation(location);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     Alert.alert("Localização", "Não foi possível obter a localização atual.");
  //   }
  // }

  useEffect(() => {
    fetchCategories();
    // getCurrentLocation();
  }, []);

  useEffect(() => {
    fetchPlaces();
  }, [selectedCategory]);

  return (
    <View style={{ flex: 1 }}>
      {categories && (
        <Categories
          data={categories}
          selectedId={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      )}

      {currentLocation && (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            identifier="current-location"
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            image={require("@/assets/location.png")}
          />

          {places?.map((item) => (
            <Marker
              id={item.id}
              key={item.id}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              image={require("@/assets/pin.png")}
            >
              <Callout onPress={() => router.navigate(`/place/${item.id}`)}>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: colors.gray[600],
                      fontFamily: fontFamily.medium,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.gray[600],
                      fontFamily: fontFamily.regular,
                    }}
                  >
                    {item.address}
                  </Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}

      {places && <Places data={places} />}
    </View>
  );
}
