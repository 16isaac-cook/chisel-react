import React, { ReactNode, CSSProperties } from "react";

import { StyledContainer } from "./Container.styles";

interface Props {
	column?: boolean;
	justify?: string;
	align?: string;
	children?: ReactNode;
	style?: CSSProperties;
	[key: string]: any;
}

const Container: React.FC<Props> = ({
	column = true,
	justify = "center",
	align = "center",
	children = null,
	style = undefined,
	...containerProps
}) => {
	return (
		<StyledContainer
			column={column}
			justify={justify}
			align={align}
			style={style}
			{...containerProps}
		>
			{children}
		</StyledContainer>
	);
};

export default Container;
