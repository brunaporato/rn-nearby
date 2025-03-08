import { Button } from "@/components/Button";
import { Steps } from "@/components/Steps";
import { Welcome } from "@/components/Welcome";
import { router } from "expo-router";
import { StatusBar, View } from "react-native";

export default function App() {
  return (
    <View style={{ flex: 1, padding: 40, gap: 40 }}>
      <StatusBar barStyle="dark-content" />
      <Welcome />
      <Steps />
      <Button
        onPress={() => {
          router.push("/home");
        }}
      >
        <Button.Title>Começar</Button.Title>
      </Button>
    </View>
  );
}
