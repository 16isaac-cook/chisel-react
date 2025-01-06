import React, { CSSProperties, ReactNode } from "react";

import { StyledScrim } from "./Scrim.styles";

interface Props {
	zIndex: number;
	style?: CSSProperties;
	children?: ReactNode;
	close?: (event: React.MouseEvent) => void;
}

const Scrim: React.FC<Props> = ({ zIndex, close, style, children }) => {
	return (
		<StyledScrim $zIndex={zIndex} onClick={close} style={style} id="scrim">
			{children}
		</StyledScrim>
	);
};

export default Scrim;
