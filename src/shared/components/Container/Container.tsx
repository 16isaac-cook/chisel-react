import React, { ReactNode, CSSProperties } from "react";

import { StyledContainer } from "./Container.styles";

import { CommonStyleProps } from "src/shared/util/styles";

interface Props extends CommonStyleProps {
    children?: ReactNode;
    style?: CSSProperties;
    [key: string]: any;
}

const Container: React.FC<Props> = ({
    column,
    justify,
    align,
    padding,
    background,
    wide,
    tall,
    children,
    style,
    fontSize,
    ...containerProps
}) => {
    return (
        <StyledContainer
            column={column}
            justify={justify}
            align={align}
            padding={padding}
            background={background}
            wide={wide}
            tall={tall}
            fontSize={fontSize}
            style={style}
            {...containerProps}
        >
            {children}
        </StyledContainer>
    );
};

export default Container;
