import { Text, View } from "react-native";
import { s } from "./styles";
import { IconTicket } from "@tabler/icons-react-native";
import { colors } from "@/styles/colors";

interface ICouponProps {
  code: string;
}

export function Coupon({ code }: ICouponProps) {
  return (
    <View style={s.container}>
      <Text style={s.title}>Utilize este cupom</Text>

      <View style={s.content}>
        <IconTicket size={24} color={colors.green.light} />
        <Text style={s.code}>{code}</Text>
      </View>
    </View>
  );
}
