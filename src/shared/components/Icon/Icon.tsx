import { StyledIcon } from "./Icon.styles";

const iconCodes = {
	home: "ri-home-2-fill",
	globe: "ri-globe-fill",
	book: "ri-book-2-fill",
	world: "ri-haze-fill",
	map: "ri-map-fill",
	hourglass: "ri-hourglass-fill",
	team: "ri-team-fill",
	pen: "ri-pen-nib-fill",
	folder: "ri-folder-3-fill",
	settings: "ri-settings-5-fill",
	question: "ri-question-fill",
} as const;

type IconName = keyof typeof iconCodes | string;

interface IconProps {
	icon?: IconName;
	right?: boolean;
	[key: string]: any;
}

const Icon: React.FC<IconProps> = ({ icon = "home", right, ...iconProps }) => {
	return (
		<StyledIcon
			{...iconProps}
			icon={iconCodes[icon as keyof typeof iconCodes]}
			right={right}
		/>
	);
};

export default Icon;
