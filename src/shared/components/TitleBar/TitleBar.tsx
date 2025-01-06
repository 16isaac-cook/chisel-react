import React, { useState } from "react";
import { NavLink } from "react-router";

import {
	StyledTitleBar,
	TitleBarBackButton,
	TitleBarSettingsButton,
	TitleBarTitle,
} from "./TitleBar.style";
import Icon from "../Icon/Icon";
import Link from "../Link/Link";
import SettingsPanel from "../SettingsPanel/SettingsPanel";

interface Props {
	title: string;
	home?: boolean;
	back?: string;
}

const TitleBar: React.FC<Props> = ({ title, home, back }) => {
	const [panelOpen, setPanelOpen] = useState(false);

	return (
		<StyledTitleBar>
			{back ? (
				<TitleBarBackButton>
					<NavLink to={back}>
						<Icon icon="left" />
						{home ? <Icon icon="home" /> : null}
					</NavLink>
				</TitleBarBackButton>
			) : null}
			<TitleBarTitle>{title}</TitleBarTitle>
			<TitleBarSettingsButton>
				<Link onClick={() => setPanelOpen(true)}>
					<Icon icon="settings" />
				</Link>
			</TitleBarSettingsButton>
			<SettingsPanel
				panelVisible={panelOpen}
				onClick={() => setPanelOpen(false)}
			/>
		</StyledTitleBar>
	);
};

export default TitleBar;
