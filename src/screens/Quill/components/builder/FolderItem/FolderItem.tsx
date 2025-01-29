import React from "react";

import { StyledFolderItem } from "./FolderItem.styles";

type Props = {
	children: React.ReactNode;
};

const FolderItem: React.FC<Props> = ({ children }) => {
	return <StyledFolderItem>{children}</StyledFolderItem>;
};

export default FolderItem;
