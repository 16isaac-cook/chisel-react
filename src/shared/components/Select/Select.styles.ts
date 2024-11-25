import styled from "styled-components";

import { modify } from "src/shared/util/styles";

export const SelectContainer = styled.div`
	position: relative;
`;

export const SelectedValue = styled.div`
	padding: 0.3em;
	border: 0;
	border-radius: 5px;
	background-color: ${(props) => props.theme.mixed300};
	display: flex;
	flex: 1;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	${modify.clickable}
	&:not(:disabled) {
		&:hover {
			background-color: ${(props) => props.theme.mixed400};
		}
		&:active {
			background-color: ${(props) => props.theme.mixed200};
		}
	}
	&:disabled {
		opacity: 0.6;
		cursor: default;
	}
`;

export const DropdownArrow = styled.div<{ $isOpen: boolean }>`
	width: 0;
	height: 0;
	border-left: 5px solid transparent;
	border-right: 5px solid transparent;
	border-top: 5px solid ${(props) => props.theme.mixed600};
	transition: transform 0.2s ease;
	${({ $isOpen }) => ($isOpen ? `transform: rotate(180deg)` : null)}
`;

export const Dropdown = styled.ul<{ $isOpen: boolean }>`
	position: absolute;
	width: 100%;
	max-height: 100px;
	overflow-y: auto;
	margin: 0;
	padding: 0;
	list-style: none;
	border: 0;
	border-radius: 5px;
	background-color: ${(props) => props.theme.mixed300};
	display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
	z-index: 10;
`;

export const Option = styled.li`
	padding: 0.3em;
	${modify.clickable}
	&:hover {
		background-color: ${(props) => props.theme.mixed400};
	}
	&:active {
		background-color: ${(props) => props.theme.mixed200};
	}
`;
