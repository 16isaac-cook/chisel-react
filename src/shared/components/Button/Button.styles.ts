import styled, { css } from "styled-components";

import { font, modify } from "../../util/styles";

export type ButtonVariants = keyof typeof variants | null;

interface ButtonProps {
	fontSize?: number;
	color?: string;
	$variant?: ButtonVariants;
	$margin?: boolean;
	$active?: boolean;
}

export const StyledButton = styled.button<ButtonProps>`
	display: flex;
	flex: 0 1 0;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	border: 0;
	background-color: ${(props) => props.theme.mixed300};
	padding: 0.3em;
	margin: ${(props) => (props.$margin ? `3px` : `0`)};
	${modify.clickable};
	border-radius: 5px;
	font-size: ${(props) =>
		props.fontSize === 0 ? `inherit` : `${props.fontSize}px`};
	color: ${(props) => props.color};
	&:not(:disabled) {
		&:hover {
			background-color: ${(props) => props.theme.mixed400};
		}
		&:active {
			background-color: ${(props) => props.theme.mixed300};
		}
	}
	${(props) => props.$variant && variants[props.$variant]}
	&:disabled {
		opacity: 0.6;
		cursor: default;
	}
	${(props) =>
		props.$active ? `background-color: ${props.theme.primary300}` : null}
`;

const variants = {
	primary: css`
		background-color: ${(props) => props.theme.primary300};
		&:not(:disabled) {
			&:hover {
				background-color: ${(props) => props.theme.primary400};
			}
			&:active {
				background-color: ${(props) => props.theme.primary300};
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
				color: ${(props) => props.theme.primary400};
				background-color: transparent;
				border-radius: 5px;
				border-color: ${(props) => props.theme.primary400};
			}
			&:active {
				color: ${(props) => props.theme.primary300};
				background-color: transparent;
				border-radius: 5px;
				border-color: ${(props) => props.theme.primary300};
			}
		}
	`,
	big: css`
		justify-content: left;
		${font.size("big")};
		background-color: ${(props) => props.theme.mixed300};
		&:not(:disabled) {
			&:hover {
				background-color: ${(props) => props.theme.mixed400};
			}
			&:active {
				background-color: ${(props) => props.theme.primary300};
			}
		}
	`,
	vertical: css`
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
	`,
};
