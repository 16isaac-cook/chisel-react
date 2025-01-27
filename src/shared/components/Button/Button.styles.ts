import styled, { css } from "styled-components";

import { font, modify, clickable } from "../../util/styles";

export type ButtonVariants = keyof typeof variants | null;

interface ButtonProps {
	fontSize?: number;
	color?: string;
	$variant?: ButtonVariants;
	$top?: boolean;
	$right?: boolean;
	$bottom?: boolean;
	$left?: boolean;
	$active?: boolean;
}

export const StyledButton = styled.button<ButtonProps>`
	display: flex;
	flex: 0 1 0;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	border: 0;
	padding: 0.3em;
	margin-top: ${(props) => (props.$top ? `0.3em` : null)};
	margin-right: ${(props) => (props.$right ? `0.3em` : null)};
	margin-bottom: ${(props) => (props.$bottom ? `0.3em` : null)};
	margin-left: ${(props) => (props.$left ? `0.3em` : null)};
	${clickable.basic};
	border-radius: 5px;
	text-align: center;
	font-size: ${(props) =>
		props.fontSize === 0 ? `inherit` : `${props.fontSize}px`};
	color: ${(props) => (props.color ? props.color : props.theme.font)};
	${(props) =>
		props.$active
			? `background-color: ${props.theme.primary300}`
			: `background-color: ${props.theme.dark300}`};
	&:not(:disabled) {
		&:hover {
			${(props) =>
				props.$active
					? `background-color: ${props.theme.primary400}`
					: `background-color: ${props.theme.dark400}`}
		}
		&:active {
			${(props) =>
				props.$active
					? `background-color: ${props.theme.primary300}`
					: `background-color: ${props.theme.primary300}`}
		}
	}
	${(props) => props.$variant && variants[props.$variant]}
	&:disabled {
		opacity: 0.6;
		cursor: default;
	}
`;

export const StyledSubmitButton = styled.input<ButtonProps>`
	display: flex;
	flex: 0 1 0;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	border: 0;
	padding: 0.3em;
	margin-top: ${(props) => (props.$top ? `0.3em` : null)};
	margin-right: ${(props) => (props.$right ? `0.3em` : null)};
	margin-bottom: ${(props) => (props.$bottom ? `0.3em` : null)};
	margin-left: ${(props) => (props.$left ? `0.3em` : null)};
	${clickable.basic};
	border-radius: 5px;
	text-align: center;
	font-size: ${(props) =>
		props.fontSize === 0 ? `inherit` : `${props.fontSize}px`};
	color: ${(props) => (props.color ? props.color : props.theme.font)};
	${(props) =>
		props.$active
			? `background-color: ${props.theme.primary300}`
			: `background-color: ${props.theme.dark300}`};
	&:not(:disabled) {
		&:hover {
			${(props) =>
				props.$active
					? `background-color: ${props.theme.primary400}`
					: `background-color: ${props.theme.dark400}`}
		}
		&:active {
			${(props) =>
				props.$active
					? `background-color: ${props.theme.primary200}`
					: `background-color: ${props.theme.primary200}`}
		}
	}
	${(props) => props.$variant && variants[props.$variant]}
	&:disabled {
		opacity: 0.6;
		cursor: default;
	}
`;

const variants = {
	none: css``,
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
		font-size: ${font.size("huge")};
	`,
	vertical: css`
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
	`,
};
