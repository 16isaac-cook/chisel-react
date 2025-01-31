import {
	createContext,
	ReactNode,
	useContext,
	useState,
	useCallback,
	useEffect,
} from "react";

import { useTauriContext } from "src/shared/context/tauri-context";

import { World, WorldObjects, JsonFile } from "../types/quill.types";
import { builderObjects } from "../constants/builderObjects";

interface QuillContextType {
	worldList: World[];
	loadWorlds: () => Promise<void>;
	worldId: string;
	setWorldId: (worldId: string) => void;
	loadWorld: (newId?: string) => Promise<void>;
	worldInfo: World;
	worldObjects: WorldObjects;
}

const QuillContext = createContext<QuillContextType | undefined>(undefined);

interface QuillContextProviderProps {
	children: ReactNode;
}

export const QuillContextProvider: React.FC<QuillContextProviderProps> = ({
	children,
}) => {
	const tauri = useTauriContext();

	const [worldList, setWorldList] = useState<World[]>([]);
	const [worldId, setWorldId] = useState<string>("");
	const [worldInfo, setWorldInfo] = useState<World>({
		worldId: "",
		name: "",
		theme: "fantasy",
		author: "",
		dateCreated: "",
		lastEdited: "",
	});
	const [worldObjects, setWorldObjects] = useState<WorldObjects>(() => {
		const dataObj = Object.keys(builderObjects).reduce((acc, key) => {
			(acc as any)[key] = [];
			return acc;
		}, {} as WorldObjects);
		return dataObj;
	});

	const loadWorlds = useCallback(async () => {
		try {
			//read directory to make sure it's there. it should be, but just in case
			const worldList = await tauri.readDirectory("quill/worlds");
			if (worldList) {
				//create a set that we'll use to set the worlds state
				const placeholder = new Set<string>();
				//go through each world folder and pull its worldinfo.json
				for (const world of worldList) {
					try {
						const worldInfo = await tauri.loadFile(
							"quill/worlds/" + world.name,
							"worldinfo.json",
							false //don't parse it, we'll do that later
						);
						//add each unparsed json file to the placeholder set
						if (typeof worldInfo === "string") {
							placeholder.add(worldInfo);
						}
					} catch (error) {
						console.error(`Error reading file ${world}:`, error);
					}
				}
				//set the worlds state to an array mapped from the parsed placeholder
				setWorldList(
					Array.from(placeholder)
						.map((item) => JSON.parse(item))
						.sort()
				);
			}
		} catch (error) {
			console.error("Error getting world list:", error);
		}
	}, [tauri]);

	//immediately get all the worlds once quill loads
	// useEffect(() => {
	// 	loadWorlds();
	// }, [loadWorlds]);

	//function to get the current world's worldinfo.json
	const loadWorldInfo = useCallback(async () => {
		if (!worldId) {
			return Promise.resolve();
		}
		if (worldId) {
			try {
				//load the worldinfo.json
				const info = await tauri.loadFile(
					`quill/worlds/${worldId}`,
					"worldinfo.json",
					false //don't parse it
				);
				if (typeof info === "string") {
					//parse and set the worldInfo state
					const parsed: World = JSON.parse(info);
					setWorldInfo(parsed);
				}
			} catch (error) {
				console.error("Error while loading world info:", error);
			}
		}
	}, [tauri, worldId]);

	//function to pull the object folders for the current world
	const loadWorldObjects = useCallback(async () => {
		try {
			//pull folders for each object (building, celestialBody, etc...)
			const path = "quill/worlds/" + worldId;
			const objList = await tauri.readDirectory(path);
			if (objList) {
				//go through each item
				for (const obj of objList) {
					//make sure we're only checking the object folders
					if (Object.keys(builderObjects).includes(obj.name)) {
						//read this folder
						const folder = await tauri.readDirectory(
							`${path}/${obj.name}`
						);
						//check if the folder is there and it has items inside
						if (folder && folder.length > 0) {
							for (const folderObj of folder) {
								//make sure we've got a json file
								const isJsonFile = (
									fileName: string
								): fileName is JsonFile<string> => {
									return /\.json$/.test(fileName);
								};
								if (isJsonFile(folderObj.name)) {
									//set the world data
									setWorldObjects((prevObjects) => ({
										...prevObjects,
										[obj.name]: Array.from(
											new Set([
												...(prevObjects[obj.name] ||
													[]),
												folderObj.name,
											])
										).sort() as JsonFile<string>,
									}));
								}
							}
						}
					}
				}
			}
		} catch (error) {
			console.error("Error while loading world data:", error);
		}
	}, [tauri, worldId]);

	const loadWorld = useCallback(async () => {
		try {
			await loadWorldInfo();
			await loadWorldObjects();
		} catch (error) {
			console.error("Error while loading current world:", error);
		}
	}, [loadWorldInfo, loadWorldObjects]);

	//when the worldId changes, get its worldInfo and worldObjects
	useEffect(() => {
		(async () => {
			await loadWorld();
		})();
	}, [worldId, loadWorld]);

	return (
		<QuillContext.Provider
			value={{
				worldList,
				loadWorlds,
				worldId,
				setWorldId,
				loadWorld,
				worldInfo,
				worldObjects,
			}}
		>
			{children}
		</QuillContext.Provider>
	);
};

export const useQuillContext = (): QuillContextType => {
	const context = useContext(QuillContext);
	if (!context) {
		throw new Error(
			"useQuillContext must be used within a QuillContextProvider"
		);
	}
	return context;
};
