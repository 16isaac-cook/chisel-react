import React, { ReactNode } from "react";

import {
	StyledTitleBar,
	TitleBarBackButton,
	TitleBarTitle,
} from "./TitleBar.style";
import Link from "../Link/Link";
import Icon from "../Icon/Icon";

interface Props {
	title: string;
    home?: boolean;
}

const TitleBar: React.FC<Props> = ({ title, home }) => {
	return (
		<StyledTitleBar>
            {!home ? <TitleBarBackButton>
				<Link>
					<Icon icon="left" />
					<Icon icon="home" />
				</Link>
			</TitleBarBackButton> : null }
			<TitleBarTitle>{title}</TitleBarTitle>
		</StyledTitleBar>
	);
};

export default TitleBar;
