import React from "react";
import { NavLink } from "react-router";

import {
	StyledTitleBar,
	TitleBarBackButton,
	TitleBarTitle,
} from "./TitleBar.style";
import Icon from "../Icon/Icon";

interface Props {
	title: string;
	home?: boolean;
	back?: string;
}

const TitleBar: React.FC<Props> = ({ title, home, back }) => {
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
		</StyledTitleBar>
	);
};

export default TitleBar;
