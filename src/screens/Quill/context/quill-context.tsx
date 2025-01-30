import {
    createContext,
    ReactNode,
    useContext,
    useState,
    useCallback,
    useEffect,
} from "react";

import { useTauriContext } from "src/shared/context/tauri-context";

import { World, WorldData, JsonFile } from "../types/quill.types";
import { builderObjects } from "../constants/builderObjects";

interface QuillContextType {
    worlds: World[];
    getWorlds: () => void;
    currentWorld: string;
    setCurrentWorld: (worldId: string) => void;
    worldInfo: World | undefined;
    worldData: WorldData;
    getCurrentWorld: () => void;
}

const QuillContext = createContext<QuillContextType | undefined>(undefined);

interface QuillContextProviderProps {
    children: ReactNode;
}

export const QuillContextProvider: React.FC<QuillContextProviderProps> = ({
    children,
}) => {
    const tauri = useTauriContext();

    const [worlds, setWorlds] = useState<World[]>([]);
    const [currentWorld, setCurrentWorld] = useState<string>("");
    const [worldInfo, setWorldInfo] = useState<World>();
    const [worldData, setWorldData] = useState<WorldData>(() => {
        const dataObj = Object.keys(builderObjects).reduce((acc, key) => {
            (acc as any)[key] = [];
            return acc;
        }, {} as WorldData);
        return dataObj;
    });

    const getWorlds = useCallback(async () => {
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
                setWorlds(
                    Array.from(placeholder).map((item) => JSON.parse(item))
                );
            }
        } catch (error) {
            console.error("Error getting world list:", error);
        }
    }, [tauri]);

    //immediately get all the worlds once quill loads
    useEffect(() => {
        getWorlds();
    }, [getWorlds]);

    //function to get the current world's worldinfo.json
    const getWorldInfo = useCallback(async () => {
        //load the worldinfo.json
        const info = await tauri.loadFile(
            "quill/worlds/" + currentWorld,
            "worldinfo.json",
            false //don't parse it
        );
        if (typeof info === "string") {
            //parse and set the worldInfo state
            const parsed: World = JSON.parse(info);
            setWorldInfo(parsed);
        }
        throw new Error("Expected a world, but got something else");
    }, [tauri, currentWorld]);

    //function to pull the object folders for the current world
    const getWorldData = useCallback(async () => {
        try {
            //pull folders for each object (building, celestialBody, etc...)
            const path = "quill/worlds/" + currentWorld;
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
                                    setWorldData((prevData) => ({
                                        ...prevData,
                                        [obj.name]: Array.from(
                                            new Set([
                                                ...(prevData[obj.name] || []),
                                                folderObj.name,
                                            ])
                                        ) as JsonFile<string>,
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
    }, [tauri, currentWorld]);

    const getCurrentWorld = useCallback(async () => {
        try {
            await getWorldInfo();
            await getWorldData();
        } catch (error) {
            console.error("Error while loading current world:", error);
        }
    }, [getWorldInfo, getWorldData]);

    //when the currentWorld changes, get its worldInfo and worldData
    useEffect(() => {
        getCurrentWorld();
    }, [currentWorld, getCurrentWorld]);

    return (
        <QuillContext.Provider
            value={{
                worlds,
                getWorlds,
                currentWorld,
                setCurrentWorld,
                worldInfo,
                worldData,
                getCurrentWorld,
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
