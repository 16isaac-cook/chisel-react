import styled from "styled-components";

import { font } from "src/shared/util/styles";

interface PanelProps {
	$row?: boolean;
	$all?: boolean;
	$top?: boolean;
	$right?: boolean;
	$bottom?: boolean;
	$left?: boolean;
}

export const StyledPanel = styled.div<PanelProps>`
	flex: 1;
	flex-direction: ${(props) => (props.$row ? `row` : `column`)};
	justify-content: ${(props) =>
		props.$row ? `space-between` : `flex-start`};
	align-items: center;
	background-color: ${(props) => props.theme.mixed200};
	padding: 0.3em;
	border: 0;
	border-radius: 0.3em;
	margin: ${(props) => (props.$all ? `0.3em` : null)};
	margin-top: ${(props) => (props.$top ? `0.3em` : null)};
	margin-right: ${(props) => (props.$right ? `0.3em` : null)};
	margin-bottom: ${(props) => (props.$bottom ? `0.3em` : null)};
	margin-left: ${(props) => (props.$left ? `0.3em` : null)};
`;

export const StyledPanelTitle = styled.div`
	text-align: center;
	font-size: ${font.size("small")};
	color: ${(props) => props.theme.mixed600};
	margin-bottom: 0.3em;
`;
