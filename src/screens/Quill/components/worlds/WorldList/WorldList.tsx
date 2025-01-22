import React from "react";

import { StyledWorldList } from "./WorldList.styles";
import WorldTile from "../WorldTile/WorldTile";

import { worldThemes } from "src/screens/Quill/constants/worldThemes";

type WorldProps = {
	worldId: string;
	label: string;
	theme: keyof typeof worldThemes;
	image?: string;
};

type Props = {
	worlds: WorldProps[];
	switchToWorld: (worldName: string) => void;
};

const WorldList: React.FC<Props> = ({ worlds, switchToWorld }) => {
	return (
		<StyledWorldList>
			{worlds.map((world, index) => {
				return (
					<WorldTile
						icon={worldThemes[world.theme].icon}
						label={world.label}
						image={world.image}
						key={index}
						onClick={() => switchToWorld(world.worldId)}
					/>
				);
			})}
		</StyledWorldList>
	);
};

export default WorldList;
