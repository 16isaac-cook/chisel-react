import styled from "styled-components";

import { clickable, font } from "src/shared/util/styles";

export const PickerContainer = styled.div`
	flex: 1 1 0;
	padding: 0.3em;
	overflow-y: auto;
	display: flex;
	flex-direction: column;
	font-size: ${font.size("huge")};
`;

export const PickerButtonContainer = styled.div`
	flex: 1 1 0;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	align-items: flex-start;
	padding: 0.6em;
`;

export const PickerButton = styled.div`
	height: max-content;
	display: flex;
	flex-direction: column;
	${clickable.normal};
	padding: 0.3em;
	font-size: ${font.size("big")};
	border-radius: 5px;
	margin: 0.15em;
	width: 15%;
	min-height: 4.5em;
`;

export const PickerIconContainer = styled.div`
	flex: 1 0 auto;
	font-size: ${font.size("huge")};
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	pointer-events: none;
`;
