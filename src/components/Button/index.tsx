import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { ButtonTypeStylesProps, Container, Title } from './styles'

export interface Props extends TouchableOpacityProps {
    title: string,
    type?: ButtonTypeStylesProps,
}

export function Button({ title, type = 'primary', ...rest }: Props) {
    return (
        <Container
            {...rest}
            type={type}
        >
            <Title>{title}</Title>
        </Container>
    );
}