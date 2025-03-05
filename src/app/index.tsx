import { Steps } from "@/components/Steps";
import { Welcome } from "@/components/Welcome";
import { View } from "react-native";

export default function App() {
  return (
    <View style={{ flex: 1, padding: 40, gap: 40 }}>
      <Welcome />
      <Steps />
    </View>
  );
}
