import styled from "styled-components";

interface Props {}

export const StyledPopup = styled.form<Props>`
	padding: 0.6em;
	font-size: 24px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 0.3em;
	background-color: ${(props) => props.theme.dark200};
`;
