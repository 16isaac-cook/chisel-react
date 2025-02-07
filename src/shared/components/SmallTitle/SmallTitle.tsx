import React, { ReactNode, CSSProperties } from "react";

import { StyledTitle } from "./SmallTitle.styles";

interface Props {
    children: ReactNode;
    style?: CSSProperties;
    [key: string]: any;
}

const SmallTitle: React.FC<Props> = ({ children, style, ...titleProps }) => {
    return (
        <StyledTitle {...titleProps} style={style}>
            {children}
        </StyledTitle>
    );
};

export default SmallTitle;
