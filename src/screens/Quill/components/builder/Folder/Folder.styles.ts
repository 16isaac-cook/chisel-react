import { styled } from "styled-components";

import { clickable, fontSizes } from "src/shared/util/styles";
import { modify, font } from "src/shared/util/styles";

interface Props {
	fontSize: number | keyof typeof fontSizes;
	$margin?: boolean;
}

export const FolderContainer = styled.div<Props>`
	position: relative;
	margin: ${(props) => (props.$margin ? `0.3em` : `0`)};
	font-size: ${(props) =>
		props.fontSize === 0 ? `inherit` : `${font.size(props.fontSize)}`};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
`;

export const FolderLabel = styled.div<{ $isOpen: boolean }>`
	padding: 0.3em;
	border: 0;
	border-radius: 5px;
	background-color: ${(props) =>
		props.$isOpen ? props.theme.primary300 : props.theme.dark300};
	display: flex;
	flex: 1;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	${clickable.basic}
	&:not(:disabled) {
		&:hover {
			background-color: ${(props) =>
				props.$isOpen ? props.theme.primary400 : props.theme.dark400};
		}
		&:active {
			background-color: ${(props) =>
				props.$isOpen ? props.theme.primary200 : props.theme.dark300};
		}
	}
	&:disabled {
		opacity: 0.6;
		cursor: default;
	}
	width: 100%;
`;

export const DropdownArrow = styled.div<{ $isOpen: boolean }>`
	width: 0;
	height: 0;
	margin-left: 0.3em;
	border-left: 5px solid transparent;
	border-right: 5px solid transparent;
	border-top: 5px solid ${(props) => props.theme.font};
	transition: transform 0.2s ease;
	${({ $isOpen }) => ($isOpen ? `transform: rotate(180deg)` : null)}
`;

export const Dropdown = styled.ul<{ $isOpen: boolean }>`
	width: 100%;
	max-height: 300px;
	overflow-y: auto;
	margin-top: 0.3em;
	padding: 0em 0.9em 0em 0.3em;
	list-style: none;
	border: 0;
	border-radius: 5px;
	background-color: transparent;
	display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
`;

export const Item = styled.li`
	padding: 0.3em;
	${clickable.normal}
`;
