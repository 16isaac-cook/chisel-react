import { styled } from "styled-components";

import { modify, font, fontSizes, clickable } from "src/shared/util/styles";

const StyledFolderItem = styled.li`
	background-color: ${(props) => props.theme.dark300};
	padding: 0.3em;
	margin-bottom: 0.3em;
	border-radius: 5px;
	${clickable.normal};
	user-select: none;
	overflow-x: hidden;
	&:last-of-type {
		margin-bottom: 0;
	}
`;
