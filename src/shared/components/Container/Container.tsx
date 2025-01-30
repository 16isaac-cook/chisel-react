import React, { ReactNode, CSSProperties } from "react";

import { StyledContainer } from "./Container.styles";

interface Props {
    column?: boolean;
    justify?: string;
    align?: string;
    padding?: boolean;
    background?: boolean;
    children?: ReactNode;
    style?: CSSProperties;
    [key: string]: any;
}

const Container: React.FC<Props> = ({
    column = true,
    justify = "center",
    align = "center",
    padding = true,
    background = false,
    children = null,
    style = undefined,
    ...containerProps
}) => {
    return (
        <StyledContainer
            $column={column}
            $justify={justify}
            $align={align}
            $padding={padding}
            $background={background}
            style={style}
            {...containerProps}
        >
            {children}
        </StyledContainer>
    );
};

export default Container;
