import React from "react";

import {
    StyledWorldTile,
    TileImageBox,
    TileImage,
    TileFooter,
} from "./WorldTile.styles";

import Icon, { IconName } from "src/shared/components/Icon/Icon";
import Placeholder from "../Placeholder/Placeholder";

type Props = {
    image?: string;
    icon: IconName;
    label: string;
    onClick: () => void;
};

const WorldTile: React.FC<Props> = ({ image, icon, label, onClick }) => {
    return (
        <StyledWorldTile onClick={onClick}>
            <TileImageBox>
                {image ? <TileImage src={image} /> : <Placeholder />}
            </TileImageBox>
            <TileFooter>
                <Icon icon={icon} right={true} />
                {label}
            </TileFooter>
        </StyledWorldTile>
    );
};

export default WorldTile;
