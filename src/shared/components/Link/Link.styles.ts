import styled from "styled-components";

import { modify, clickable } from "../../util/styles";

interface Props {
	fontSize?: number;
}

export const StyledLink = styled.button<Props>`
	display: flex;
	flex: 0 1 0;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	border: 0;
	padding: 0;
	${clickable.link};
	font-size: ${(props) =>
		props.fontSize === 0 ? `inherit;` : `${props.fontSize}px;`};
	&:disabled {
		opacity: 0.6;
		cursor: default;
	}
`;
