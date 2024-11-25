import styled, { css } from "styled-components";

import { modify } from "../../util/styles";

export type ButtonVariants = keyof typeof variants | null;

interface ButtonProps {
	$fontSize?: number;
	$color?: string;
	$variant?: ButtonVariants;
}

export const StyledButton = styled.button<ButtonProps>`
	flex: 1;
	flex-direction: "row";
	justify-content: "space-between";
	align-items: "center";
	border: 0;
	background-color: ${(props) => props.theme.mixed300};
	padding: 0.3em;
	${modify.clickable};
	border-radius: 5px;
	font-size: ${(props) =>
		props.$fontSize === 0 ? `inherit;` : `${props.$fontSize}px;`};
	color: ${(props) => props.$color};
	&:not(:disabled) {
		&:hover {
			background-color: ${(props) => props.theme.mixed400};
		}
		&:active {
			background-color: ${(props) => props.theme.mixed200};
		}
	}
	${(props) => props.$variant && variants[props.$variant]}
	&:disabled {
		opacity: 0.6;
		cursor: default;
	}
`;
const variants = {
	primary: css`
		background-color: ${(props) => props.theme.primary300};
		&:not(:disabled) {
			&:hover {
				background-color: ${(props) => props.theme.primary400};
			}
			&:active {
				background-color: ${(props) => props.theme.primary200};
			}
		}
	`,
	border: css`
		background-color: transparent;
		color: ${(props) => props.theme.primary300};
		border: 2px solid;
		border-radius: 5px;
		border-color: ${(props) => props.theme.primary300};
		font-weight: bold;
		&:not(:disabled) {
			&:hover {
				color: ${(props) => props.theme.primary200};
				background-color: transparent;
				border-radius: 5px;
				border-color: ${(props) => props.theme.primary200};
			}
			&:active {
				color: ${(props) => props.theme.primary400};
				background-color: transparent;
				border-radius: 5px;
				border-color: ${(props) => props.theme.primary400};
			}
		}
	`,
};
