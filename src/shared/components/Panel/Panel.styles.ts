import { CSSProperties } from "react";
import styled from "styled-components";

import { font } from "src/shared/util/styles";

interface PanelProps {
	$column?: boolean;
	$top?: boolean;
	$right?: boolean;
	$bottom?: boolean;
	$left?: boolean;
	style?: CSSProperties;
}

export const StyledPanel = styled.div<PanelProps>`
	display: flex;
	flex: 1 1 auto;
	flex-direction: ${(props) => (props.$column ? `column` : `row`)};
	justify-content: ${(props) =>
		props.$column ? `flex-start` : `space-between`};
	align-items: center;
	background-color: ${(props) => props.theme.dark200};
	padding: 0.3em;
	border: 0;
	border-radius: 0.3em;
	margin-top: ${(props) => (props.$top ? `0.3em` : null)};
	margin-right: ${(props) => (props.$right ? `0.3em` : null)};
	margin-bottom: ${(props) => (props.$bottom ? `0.3em` : null)};
	margin-left: ${(props) => (props.$left ? `0.3em` : null)};
	width: ${(props) => (props.$column ? `100%` : null)};
`;

export const StyledPanelTitle = styled.div`
	text-align: center;
	font-size: ${font.size("small")};
	color: ${(props) => props.theme.dark600};
	margin-bottom: 0.3em;
`;
