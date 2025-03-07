import { ImageBackground, View } from "react-native";
import { s } from "./styles";
import { Button } from "../Button";
import { router } from "expo-router";
import { IconArrowLeft } from "@tabler/icons-react-native";

interface IDetailsCoverProps {
  uri: string;
}

export function DetailsCover({ uri }: IDetailsCoverProps) {
  return (
    <ImageBackground source={{ uri }} style={s.container}>
      <View style={s.header}>
        <Button style={{ width: 40, height: 40 }} onPress={() => router.back()}>
          <Button.Icon icon={IconArrowLeft} />
        </Button>
      </View>
    </ImageBackground>
  );
}
