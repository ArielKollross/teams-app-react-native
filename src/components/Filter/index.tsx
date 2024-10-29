import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Container, Title, FilterStylesProps } from "./styles";

type Props = TouchableOpacityProps & FilterStylesProps & {
    title: string;
}

export function Filter({ title, isActive = false, ...rest }: Props ) {
    return (
        <Container
            isActive={isActive}
            {...rest}
        >
            <Title>{title}</Title>
        </Container>
    );
}