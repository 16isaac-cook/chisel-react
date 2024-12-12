import React, { ReactNode } from "react";

import { StyledPage } from "./Page.styles";
import TitleBar from "../TitleBar/TitleBar";

interface Props {
	title: string;
	home?: boolean;
	back?: string;
	children?: ReactNode;
}

const Page: React.FC<Props> = ({
	title,
	home = false,
	back,
	children = null,
}) => {
	return (
		<StyledPage>
			<TitleBar title={title} home={home} back={back} />
			{children}
		</StyledPage>
	);
};

export default Page;
