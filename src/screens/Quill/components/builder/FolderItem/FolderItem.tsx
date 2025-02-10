import React from "react";
import { Link } from "react-router";

import {
	FolderItemContainer,
	StyledFolderItem,
	FolderItemButton,
} from "./FolderItem.styles";

import Icon from "src/shared/components/Icon/Icon";

type Props = {
	toEdit: string;
	toPreview: string;
	children: React.ReactNode;
};

const FolderItem: React.FC<Props> = ({ children, toEdit, toPreview }) => {
	return (
		<FolderItemContainer>
			<StyledFolderItem>{children}</StyledFolderItem>
			<Link to={toPreview}>
				<FolderItemButton left right>
					<Icon icon="eyeOpen" />
				</FolderItemButton>
			</Link>
			<Link to={toEdit}>
				<FolderItemButton>
					<Icon icon="edit" />
				</FolderItemButton>
			</Link>
		</FolderItemContainer>
	);
};

export default FolderItem;
