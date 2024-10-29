import React from "react";
import { TouchableOpacityProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Container, Icon, ButtonIconTypeStyleProps } from "./styles";

type Props = TouchableOpacityProps & {
    // passa a tipagem dos icones aceitos
    icon: keyof typeof MaterialIcons.glyphMap;
    type?: ButtonIconTypeStyleProps
}

export function ButtonIcon({ icon, type = 'primary', ...rest}: Props) {
    return (
        <Container
            {...rest}
        >
            <Icon
                type={type}
                name={icon}
            />
        </Container>
    );
}