import { FlatList } from "react-native";
import { Category } from "../Category";
import { s } from "./styles";

export interface CategoryProps {
  id: string;
  name: string;
}

interface ICategoriesProps {
  data: CategoryProps[];
  selectedId: string;
  onSelectCategory: (id: string) => void;
}

export function Categories({
  data,
  selectedId,
  onSelectCategory,
}: ICategoriesProps) {
  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Category
          iconId={item.id}
          name={item.name}
          onPress={() => onSelectCategory(item.id)}
          isSelected={selectedId === item.id}
        />
      )}
      contentContainerStyle={s.content}
      style={s.container}
      showsHorizontalScrollIndicator={false}
    />
  );
}
