import styled from "styled-components";

import { font } from "src/shared/util/styles";

interface Props {}

export const StyledPopup = styled.form<Props>`
	padding: 0.6em;
	font-size: ${font.size("big")};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 0.3em;
	background-color: ${(props) => props.theme.dark200};
`;
