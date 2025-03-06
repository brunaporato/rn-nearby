import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  TextProps,
  ActivityIndicator,
} from "react-native";
import { s } from "./styles";
import { colors } from "@/styles/colors";
import { IconProps } from "@tabler/icons-react-native";

interface IButtonProps extends TouchableOpacityProps {
  isLoading?: boolean;
}

function Button({ children, style, isLoading = false, ...rest }: IButtonProps) {
  return (
    <TouchableOpacity
      style={[s.container, style]}
      activeOpacity={0.8}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.gray[100]} />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

function Title({ children, ...rest }: TextProps) {
  return (
    <Text style={s.title} {...rest}>
      {children}
    </Text>
  );
}

interface IIconProps {
  icon: React.ComponentType<IconProps>;
}

function Icon({ icon: IconComponent }: IIconProps) {
  return <IconComponent size={24} color={colors.gray[100]} />;
}

Button.Title = Title;
Button.Icon = Icon;

export { Button };
