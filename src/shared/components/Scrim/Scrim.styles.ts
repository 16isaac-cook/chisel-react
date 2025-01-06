import styled from "styled-components";

import { modify } from "src/shared/util/styles";

interface Props {
	$zIndex: number;
}

export const StyledScrim = styled.div<Props>`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: ${(props) => modify.rgba(props.theme.dark100, 0.5)};
	z-index: ${(props) => props.$zIndex};
`;
