import { Categories, CategoryProps } from "@/components/Categories";
import { PlaceProps } from "@/components/Place";
import { Places } from "@/components/Places";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";

export default function Home() {
  const [categories, setCategories] = useState<CategoryProps[]>();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [places, setPlaces] = useState<PlaceProps[]>();

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

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchPlaces();
  }, [selectedCategory]);

  return (
    <View style={{ flex: 1, backgroundColor: "#CECECE" }}>
      {categories && (
        <Categories
          data={categories}
          selectedId={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      )}

      {places && <Places data={places} />}
    </View>
  );
}
