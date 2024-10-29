import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

export type FilterStylesProps = {
    isActive?: boolean;
}

export const Container = styled(TouchableOpacity)<FilterStylesProps>`
    ${({ theme, isActive }) => css`
        border: 1px solid ${isActive ? theme.COLORS.GREEN_700 : theme.COLORS.GRAY_300};
    `}

    border-radius: 4px;
    margin-right: 12px;
    height: 38px;
    width: 70px;

    align-items: center;
    justify-content: center;
`;

export const Title = styled.Text`
    text-transform: uppercase;
    ${({ theme }) => css`
        font-size: ${theme.FONT_SIZE.SM}px;
        color: ${theme.COLORS.WHITE};
        font-family: ${theme.FONT_FAMILY.BOLD};
    `}
`;