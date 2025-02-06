import { fontSizes } from "src/shared/util/styles";
import { StyledIcon } from "./Icon.styles";

const iconCodes = {
    //quill builder icons
    building: "home-3-fill",
    celestialBody: "moon-fill",
    character: "user-fill",
    condition: "alert-fill",
    conflict: "sword-fill",
    country: "government-fill",
    currency: "coins-fill",
    deity: "psychotherapy-fill",
    document: "file-paper-2-fill",
    ethnicity: "walk-fill",
    item: "key-2-fill",
    landmark: "building-2-fill",
    language: "character-recognition-fill",
    material: "box-3-fill",
    military: "honour-fill",
    monster: "skull-2-fill",
    myth: "book-2-fill",
    naturalLaw: "flashlight-fill",
    naturalRegion: "landscape-fill",
    organization: "team-fill",
    profession: "account-box-fill",
    religion: "sparkling-2-fill",
    rule: "dice-fill",
    settlement: "community-fill",
    species: "aliens-fill",
    spell: "fire-fill",
    technology: "flask-fill",
    title: "vip-crown-fill",
    tradition: "chat-history-fill",
    vehicle: "riding-line",
    //other
    home: "home-2-fill",
    globe: "globe-fill",
    book: "book-2-fill",
    world: "haze-fill",
    map: "map-fill",
    hourglass: "hourglass-fill",
    team: "team-fill",
    pen: "pen-nib-fill",
    files: "folder-3-fill",
    settings: "settings-5-fill",
    help: "question-fill",
    quill: "quill-pen-fill",
    left: "arrow-left-line",
    info: "information-fill",
    hammer: "hammer-fill",
    scroll: "file-paper-2-fill",
    add: "add-box-fill",
    brain: "brain-fill",
    cactus: "cactus-fill",
    skull: "skull-fill",
    scraper: "building-2-fill",
    unhappy: "emotion-unhappy-fill",
} as const;

export type IconName = keyof typeof iconCodes;

interface IconProps {
    icon?: IconName;
    right?: boolean;
    size?: number | keyof typeof fontSizes;
    [key: string]: any;
}

const Icon: React.FC<IconProps> = ({
    icon = "home",
    right,
    size = 0,
    ...iconProps
}) => {
    return (
        <StyledIcon
            {...iconProps}
            className={"ri-" + iconCodes[icon as keyof typeof iconCodes]}
            $right={right}
            size={size}
        />
    );
};

export default Icon;
