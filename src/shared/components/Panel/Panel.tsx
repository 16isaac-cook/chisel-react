import React, { ReactNode } from "react";

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
		>
			{title ? <StyledPanelTitle>{title}</StyledPanelTitle> : null}
			{children}
		</StyledPanel>
	);
};

export default Panel;
