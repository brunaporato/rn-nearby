import {
  Image,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { s } from "./styles";
import { IconTicket } from "@tabler/icons-react-native";
import { colors } from "@/styles/colors";

export interface PlaceProps {
    address: string;
    categoryId: string;
    coupons: number;
    cover: string;
    description: string;
    id: string;
    latitude: string;
    longitude: string;
    name: string;
    phone: string;
}

interface IPlaceProps extends TouchableOpacityProps {
  data: PlaceProps;
}

export function Place({ data, ...rest }: IPlaceProps) {
  return (
    <TouchableOpacity style={s.container} {...rest}>
      <Image source={{ uri: data.cover }} style={s.image} />
      <View style={s.content}>
        <Text style={s.name}>{data.name}</Text>
        <Text style={s.description} numberOfLines={2}>{data.description}</Text>

        <View style={s.footer}>
          <IconTicket size={16} color={colors.red.base} />
          <Text style={s.coupons}>{data.coupons} cupons disponíveis</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
