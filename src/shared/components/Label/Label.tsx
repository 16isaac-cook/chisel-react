import React, { ReactNode, CSSProperties } from "react";

import { CommonStylePropsIcon } from "src/shared/util/styles";

import { StyledLabel } from "./Label.styles";
import Icon, { IconName } from "../Icon/Icon";

interface Props extends CommonStylePropsIcon {
    children: ReactNode;
    center?: boolean;
    style?: CSSProperties;
    [key: string]: any;
}

const Label: React.FC<Props> = ({
    children,
    fontSize = 0,
    color,
    icon = undefined,
    center = false,
    style = undefined,
    ...labelProps
}) => {
    return (
        <StyledLabel
            fontSize={fontSize}
            color={color}
            $center={center}
            style={style}
            {...labelProps}
        >
            {icon && typeof icon === "string" ? (
                <Icon icon={icon} color={color} />
            ) : (
                icon
            )}
            {children}
        </StyledLabel>
    );
};

export default Label;
