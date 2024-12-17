import React, { ReactNode, CSSProperties } from "react";

import { StyledContainer } from "./Container.styles";

interface Props {
	column?: boolean;
	justify?: string;
	align?: string;
	padding?: boolean;
	children?: ReactNode;
	style?: CSSProperties;
	[key: string]: any;
}

const Container: React.FC<Props> = ({
	column = true,
	justify = "center",
	align = "center",
	padding = true,
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
			style={style}
			{...containerProps}
		>
			{children}
		</StyledContainer>
	);
};

export default Container;
