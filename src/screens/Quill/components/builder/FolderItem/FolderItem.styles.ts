import { styled } from "styled-components";

import {
	clickable,
	commonStyles,
	CommonStyleProps,
} from "src/shared/util/styles";

export const FolderItemContainer = styled.div`
	flex: 0 1 0;
	display: flex;
	flex-direction: row;
`;

export const StyledFolderItem = styled.div`
	flex: 1 0 0;
	background-color: ${(props) => props.theme.dark300};
	padding: 0.3em;
	border-radius: 5px;
	user-select: none;
	overflow-x: hidden;
	text-wrap: nowrap;
`;

export const FolderItemButton = styled.div<CommonStyleProps>`
	${commonStyles}
	flex: 0 1 0;
	background-color: ${(props) => props.theme.dark300};
	padding: 0.3em;
	border-radius: 5px;
	${clickable.normal};
	user-select: none;
`;
