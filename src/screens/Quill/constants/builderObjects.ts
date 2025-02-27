import { IconName } from "src/shared/components/Icon/Icon";

type BuilderObjectProps = {
    name: string;
    plural?: string;
    icon: IconName;
};

export const builderObjects: { [key: string]: BuilderObjectProps } = {
    building: { name: "Building", icon: "home" },
    celestialBody: {
        name: "Celestial Body",
        plural: "Celestial Bodies",
        icon: "celestialBody",
    },
    character: { name: "Character", icon: "character" },
    condition: { name: "Condition", icon: "condition" },
    conflict: { name: "Conflict", icon: "conflict" },
    country: { name: "Country", plural: "Countries", icon: "country" },
    currency: { name: "Currency", plural: "Currencies", icon: "currency" },
    deity: { name: "Deity", plural: "Deities", icon: "deity" },
    document: { name: "Document", icon: "document" },
    ethnicity: { name: "Ethnicity", plural: "Ethnicities", icon: "ethnicity" },
    item: { name: "Item", icon: "item" },
    landmark: { name: "Landmark", icon: "landmark" },
    language: { name: "Language", icon: "language" },
    material: { name: "Material", icon: "material" },
    military: { name: "Military", plural: "Militaries", icon: "military" },
    monster: { name: "Monster", icon: "monster" },
    myth: { name: "Myth", icon: "myth" },
    naturalLaw: { name: "Natural Law", icon: "naturalLaw" },
    naturalRegion: { name: "Natural Region", icon: "naturalRegion" },
    organization: { name: "Organization", icon: "organization" },
    profession: { name: "Profession", icon: "profession" },
    religion: { name: "Religion", icon: "religion" },
    rule: { name: "Rule", icon: "rule" },
    settlement: { name: "Settlement", icon: "settlement" },
    species: { name: "Species", plural: "Species", icon: "species" },
    spell: { name: "Spell", icon: "spell" },
    technology: {
        name: "Technology",
        plural: "Technologies",
        icon: "technology",
    },
    title: { name: "Title", icon: "title" },
    tradition: { name: "Tradition", icon: "tradition" },
    vehicle: { name: "Vehicle", icon: "vehicle" },
} as const;

export const objectFields = {
    building: {},
    celestialBody: {},
    character: {},
    condition: {},
    conflict: {},
    country: {},
    currency: {},
    deity: {},
    document: {},
    ethnicity: {},
    item: {},
    landmark: {},
    language: {},
    material: {},
    military: {},
    monster: {},
    myth: {},
    naturalLaw: {},
    naturalRegion: {},
    organization: {},
    profession: {},
    religion: {},
    rule: {},
    settlement: {},
    species: {},
    spell: {},
    technology: {},
    title: {},
    tradition: {},
    vehicle: {},
};
