import React, { ReactNode, CSSProperties } from "react";

import { StyledLabel } from "./Label.styles";
import Icon, { IconName } from "../Icon/Icon";

interface Props {
	children: ReactNode;
	fontSize?: number;
	color?: string;
	icon?: IconName;
	center?: boolean;
	style?: CSSProperties;
	[key: string]: any;
}

const Label: React.FC<Props> = ({
	children,
	fontSize = 0,
	color = "#fff",
	icon = undefined,
	center = false,
	style = undefined,
	...labelProps
}) => {
	return (
		<StyledLabel
			fontSize={fontSize}
			color={color}
			center={center}
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
