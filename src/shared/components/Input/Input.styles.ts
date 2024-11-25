import styled from "styled-components";

interface Props {
	fontSize?: number;
}

export const StyledInput = styled.input<Props>`
	background-color: ${(props) => props.theme.mixed300};
	border: none;
	border-radius: 5px;
	padding: 0.3em;
	font-size: ${(props) =>
		props.fontSize === 0 ? `inherit;` : `${props.fontSize}px;`};
	&:not(:disabled) {
		&:hover {
			background-color: ${(props) => props.theme.mixed400};
		}
		&:focus {
			outline: none;
			background-color: ${(props) => props.theme.mixed400};
		}
	}
	&:disabled {
		opacity: 0.6;
		cursor: default;
	}
`;
