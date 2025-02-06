import React, { useState, ReactNode, useEffect, useCallback } from "react";
import { useTauriContext } from "src/shared/context/tauri-context";

import { WorldObject } from "src/screens/Quill/types/quill.types";

import {
    FolderContainer,
    FolderLabel,
    Dropdown,
    DropdownArrow,
} from "./Folder.styles";
import Icon, { IconName } from "src/shared/components/Icon/Icon";
import Label from "src/shared/components/Label/Label";
import Container from "src/shared/components/Container/Container";
import FolderItem from "../FolderItem/FolderItem";

type Props = {
    icon: IconName;
    fontSize?: number;
    children?: ReactNode;
    worldId: string;
    folderId: string;
    itemList?: string[];
};

const Folder: React.FC<Props> = ({
    icon,
    fontSize = 0,
    children,
    worldId,
    folderId,
    itemList,
}) => {
    const tauri = useTauriContext();

    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState<WorldObject[]>();

    const toggleDropdown = () => setIsOpen(!isOpen);

    const getItems = useCallback(async () => {
        try {
            if (itemList) {
                const newList: WorldObject[] = [];
                itemList.forEach(async (item) => {
                    const getItem = await tauri.loadFile(
                        `quill/worlds/${worldId}/${folderId}`,
                        item,
                        false
                    );
                    if (typeof getItem === "string") {
                        const parsed: WorldObject = JSON.parse(getItem);
                        newList.push(parsed);
                    }
                });
                setItems(newList);
            }
        } catch (error) {
            console.log(error);
        }
    }, [folderId, itemList, tauri, worldId]);

    useEffect(() => {
        getItems();
    }, [getItems]);

    return (
        <FolderContainer fontSize={fontSize}>
            <FolderLabel onClick={toggleDropdown} $isOpen={isOpen}>
                <Container justify="flex-start">
                    <Icon icon={icon} right />
                    <Label>{children}</Label>
                </Container>
                <DropdownArrow $isOpen={isOpen} />
            </FolderLabel>
            <Dropdown $isOpen={isOpen}>
                {items?.map((item, index) => {
                    return (
                        <FolderItem key={`item${index}`}>
                            {item.name}
                        </FolderItem>
                    );
                })}
            </Dropdown>
        </FolderContainer>
    );
};

export default Folder;
