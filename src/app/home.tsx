import { Categories, CategoryProps } from "@/components/Categories";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";

export default function Home() {
  const [categories, setCategories] = useState<CategoryProps[]>();
  const [selectedCategory, setSelectedCategory] = useState("");

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

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {categories && (
        <Categories
          data={categories}
          selectedId={selectedCategory}
          onSelectCategory={(id) => setSelectedCategory(id)}
        />
      )}
    </View>
  );
}
