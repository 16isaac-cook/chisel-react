import styled from "styled-components";

import { modify } from "../../util/styles";

interface Props {
	fontSize?: number;
}

export const StyledLink = styled.button<Props>`
	flex: 1;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	border: 0;
	color: ${(props) => props.theme.primary300};
	padding: 0;
	${modify.clickable};
	background-color: transparent;
	font-size: ${(props) =>
		props.fontSize === 0 ? `inherit;` : `${props.fontSize}px;`};
	&:not(:disabled) {
		&:hover {
			color: ${(props) => props.theme.primary400};
		}
		&:active {
			color: ${(props) => props.theme.primary200};
		}
	}
	&:disabled {
		opacity: 0.6;
		cursor: default;
	}
`;
