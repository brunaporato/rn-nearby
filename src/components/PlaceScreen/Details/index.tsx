import { Text, View } from "react-native";
import { s } from "./styles";
import { Info } from "../Info";
import { IconMapPin, IconPhone, IconTicket } from "@tabler/icons-react-native";

export interface DetailsProps {
  name: string;
  description: string;
  address: string;
  phone: string;
  coupons: number;
  rules: {
    id: string;
    description: string;
  }[];
}

interface IDetailsProps {
  data: DetailsProps;
}

export function Details({ data }: IDetailsProps) {
  return (
    <View style={s.container}>
      <Text style={s.name}>{data.name}</Text>
      <Text style={s.description}>{data.description}</Text>

      <View style={s.group}>
        <Text style={s.title}>Regulamento</Text>
        {data.rules.map((rule) => (
          <Text key={rule.id} style={s.rule}>
            {`\u2022 ${rule.description}`}
          </Text>
        ))}
      </View>

      <View style={s.group}>
        <Text style={s.title}>Informações</Text>
        <Info
          icon={IconTicket}
          description={`${data.coupons} cupons disponíveis`}
        />
        <Info icon={IconMapPin} description={data.address} />
        <Info icon={IconPhone} description={data.phone} />
      </View>
    </View>
  );
}
