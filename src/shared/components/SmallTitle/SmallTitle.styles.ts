import styled from "styled-components";

interface Props {}

export const StyledTitle = styled.div<Props>`
	display: flex;
	flex: 0 1 0;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	background-color: ${(props) => props.theme.mixed200};
	padding: 0.3em;
	border: 0;
	border-radius: 0.3em;
	text-align: center;
	width: 100%;
	margin-bottom: 0.3em;
`;
