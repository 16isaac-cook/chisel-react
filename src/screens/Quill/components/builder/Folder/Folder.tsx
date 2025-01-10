import React, { useState, ReactNode } from "react";

import {
	FolderContainer,
	FolderLabel,
	Dropdown,
	DropdownArrow,
} from "./Folder.styles";
import Icon, { IconName } from "src/shared/components/Icon/Icon";
import Label from "src/shared/components/Label/Label";
import Container from "src/shared/components/Container/Container";

interface Props {
	icon: IconName;
	label: string;
	margin?: boolean;
	fontSize?: number;
	children?: ReactNode;
	[key: string]: any;
}

const ExplorerFolder: React.FC<Props> = ({
	icon,
	label,
	margin = true,
	fontSize = 0,
	children,
	...folderProps
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => setIsOpen(!isOpen);

	return (
		<FolderContainer $margin={margin} fontSize={fontSize}>
			<FolderLabel onClick={toggleDropdown} $isOpen={isOpen}>
				<Container column={false} padding={false} justify="flex-start">
					<Icon icon={icon} right={true} />
					<Label>{label}</Label>
				</Container>

				<DropdownArrow $isOpen={isOpen} />
			</FolderLabel>
			<Dropdown $isOpen={isOpen}>{children}</Dropdown>
		</FolderContainer>
	);
};

export default ExplorerFolder;
