import React, { ReactNode, CSSProperties } from "react";

import { StyledPanel, StyledPanelTitle } from "./Panel.styles";

interface Props {
	children?: ReactNode;
	title?: string;
	row?: boolean;
	all?: boolean;
	top?: boolean;
	right?: boolean;
	bottom?: boolean;
	left?: boolean;
    style?: CSSProperties;
	[key: string]: any;
}

const Panel: React.FC<Props> = ({
	children,
	title = undefined,
	row = false,
	all = true,
	top = false,
	right = false,
	bottom = false,
	left = false,
    style = undefined,
	...panelProps
}) => {
	return (
		<StyledPanel
			{...panelProps}
			$row={row}
			$all={all}
			$top={top}
			$right={right}
			$bottom={bottom}
			$left={left}
            style={style}
		>
			{title ? <StyledPanelTitle>{title}</StyledPanelTitle> : null}
			{children}
		</StyledPanel>
	);
};

export default Panel;
