import { builderObjects } from "src/screens/Quill/constants/builderObjects";
import { worldThemes } from "src/screens/Quill/constants/worldThemes";

export type JsonFile<T extends string> = T extends `${string}.json` ? T : never;

export type WorldObjects = {
	[K in keyof typeof builderObjects]: JsonFile<string>[];
};

export type World = {
	worldId: string;
	name: string;
	theme: keyof typeof worldThemes;
	author: string;
	dateCreated: string;
	lastEdited: string;
};

export type WorldObject = {
	id: string;
	dateCreated: string;
	lastEdited: string;
	type: string;
	name: string;
	description: [string, boolean];
	link: boolean;
	gmNotes: [string, boolean];
	parent?: [string, boolean];
	[key: string]: [string, boolean] | string | boolean | undefined;
};
