import styled from "styled-components";

interface Props {}

export const StyledTitleBar = styled.div<Props>`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 0.3em;
	margin: 0.3em 0.3em 0em 0.3em;
	background-color: transparent;
	border-radius: 5px;
	flex: 1 0 auto;
`;

export const TitleBarBackButton = styled.div`
	position: absolute;
	left: 0;
	font-size: 24px;
`;

export const TitleBarTitle = styled.div`
	text-align: center;
	font-size: 24px;
`;
