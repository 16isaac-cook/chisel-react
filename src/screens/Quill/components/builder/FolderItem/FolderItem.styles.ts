import { styled } from "styled-components";

import { clickable } from "src/shared/util/styles";

export const StyledFolderItem = styled.li`
	flex: 0 1 0;
	background-color: ${(props) => props.theme.dark300};
	padding: 0.3em;
	margin-bottom: 0.3em;
	border-radius: 5px;
	${clickable.normal};
	user-select: none;
	overflow-x: hidden;
	text-wrap: nowrap;
	&:last-of-type {
		margin-bottom: 0;
	}
`;
