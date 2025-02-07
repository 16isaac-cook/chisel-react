import React, { ReactNode, CSSProperties } from "react";

import { CommonStyleProps } from "src/shared/util/styles";

import { StyledPanel, StyledPanelTitle } from "./Panel.styles";

interface Props extends CommonStyleProps {
    children?: ReactNode;
    title?: string;
    style?: CSSProperties;
    [key: string]: any;
}

const Panel: React.FC<Props> = ({
    children,
    title,
    column,
    top,
    right,
    bottom,
    left,
    style,
    ...panelProps
}) => {
    return (
        <StyledPanel
            {...panelProps}
            column={column}
            top={top}
            right={right}
            bottom={bottom}
            left={left}
            style={style}
        >
            {title ? <StyledPanelTitle>{title}</StyledPanelTitle> : null}
            {children}
        </StyledPanel>
    );
};

export default Panel;
