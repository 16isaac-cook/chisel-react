import styled from "styled-components";

interface Props {
	$panelVisible: boolean;
}

export const StyledSettingsPanel = styled.div<Props>`
	position: fixed;
	top: 0;
	right: ${(props) => (props.$panelVisible ? "0" : "-40%")};
	height: 100%;
	width: 40%;
	background-color: ${(props) => props.theme.dark200};
	transition: right 0.3s ease;
	z-index: 1000;
	display: flex;
	flex-direction: column;
	padding: 0.3em;
	border-radius: 0.3em 0 0 0.3em;
`;
