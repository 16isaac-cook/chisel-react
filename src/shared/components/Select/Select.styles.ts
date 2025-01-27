import styled from "styled-components";

import { modify, clickable } from "src/shared/util/styles";

interface Props {
	fontSize?: number;
	$margin?: boolean;
}

export const SelectContainer = styled.div<Props>`
	position: relative;
	margin: ${(props) => (props.$margin ? `3px` : `0`)};
	font-size: ${(props) =>
		props.fontSize === 0 ? `inherit` : `${props.fontSize}px`};
`;

export const SelectedValue = styled.div`
	padding: 0.3em;
	border: 0;
	border-radius: 5px;
	background-color: ${(props) => props.theme.dark300};
	display: flex;
	flex: 1;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	${clickable.normal}
	&:disabled {
		opacity: 0.6;
		cursor: default;
	}
	overflow-x: hidden;
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
	position: absolute;
	width: 100%;
	max-height: 300px;
	overflow-y: auto;
	margin: 0;
	margin-top: 3px;
	padding: 0;
	list-style: none;
	border: 0;
	border-radius: 5px;
	background-color: ${(props) => props.theme.dark300};
	display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
	z-index: 10;
`;

export const Option = styled.li`
	padding: 0.3em;
	${clickable.transparent}
`;
