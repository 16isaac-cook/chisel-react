import styled from "styled-components";

import { modify } from "src/shared/util/styles";

interface SettingsProps {
	panelVisible: boolean;
}

export const StyledTitleBar = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 0.3em;
	margin: 0.3em 0.3em 0em 0.3em;
	background-color: transparent;
	border-radius: 5px;
	flex: 0 1 auto;
	height: auto;
`;

export const TitleBarBackButton = styled.div`
	position: absolute;
	left: 0;
	font-size: 24px;
	margin-left: 0.3em;
`;

export const TitleBarTitle = styled.div`
	text-align: center;
	font-size: 24px;
`;

export const TitleBarSettingsButton = styled.div`
	position: absolute;
	right: 0;
	font-size: 24px;
	margin-right: 0.3em;
`;

export const SettingsCover = styled.div<SettingsProps>`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: ${(props) => modify.rgba(props.theme.dark100, 0.5)};
	z-index: 999;
	${(props) => (props.panelVisible ? null : `display: none`)};
`;

export const SettingsPanel = styled.div<SettingsProps>`
	position: fixed;
	top: 0;
	right: ${(props) => (props.panelVisible ? "0" : "-40%")};
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
