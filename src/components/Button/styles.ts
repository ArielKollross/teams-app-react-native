import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export type ButtonTypeStylesProps = 'primary' | 'secondary'

type Props = {
    type: ButtonTypeStylesProps
}

export const Container = styled(TouchableOpacity)<Props>`
    flex: 1;
    min-height: 56px;
    max-height: 56px;

    background-color: ${({ theme, type }) => type === 'primary' ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK};
    border-radius: 6px;

    justify-content: center;
    align-items: center;
    flex-direction: row;
`

export const Title = styled.Text`
    font-size: ${ ({ theme }) => theme.FONT_SIZE.SM}px;
    color: ${ ({ theme }) => theme.COLORS.WHITE};
    font-family: ${ ({ theme }) => theme.FONT_FAMILY.BOLD};
`