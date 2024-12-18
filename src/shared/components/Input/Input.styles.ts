import styled from "styled-components";

interface Props {
	fontSize?: number;
	$margin?: boolean;
}

export const StyledInput = styled.input<Props>`
	background-color: ${(props) => props.theme.dark300};
	border: none;
	border-radius: 5px;
	padding: 0.3em;
	margin: ${(props) => (props.$margin ? `3px` : `0`)};
	font-size: ${(props) =>
		props.fontSize === 0 ? `inherit;` : `${props.fontSize}px;`};
	&:not(:disabled) {
		&:hover {
			background-color: ${(props) => props.theme.dark400};
		}
		&:focus {
			outline: none;
			background-color: ${(props) => props.theme.dark400};
		}
	}
	&:disabled {
		opacity: 0.6;
		cursor: default;
	}
`;
