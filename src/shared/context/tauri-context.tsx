import React, { createContext, useContext, ReactNode } from "react";
import {
	writeTextFile,
	readTextFile,
	exists,
	mkdir,
	// remove,
	readDir,
	DirEntry,
	BaseDirectory,
} from "@tauri-apps/plugin-fs";
import { join, dataDir } from "@tauri-apps/api/path";

interface TauriContextType {
	checkExists: (path: string) => Promise<boolean | void>;
	readDirectory: (path: string) => Promise<DirEntry[] | undefined>;
	mkDir: (path: string) => Promise<void>;
	//removeDir: (path: string) => Promise<void>;
	saveFile: (path: string, fileName: string, data: object) => Promise<void>;
	loadFile: (
		path: string,
		fileName: string,
		parse?: boolean
	) => Promise<object | string | null>;
}

const TauriContext = createContext<TauriContextType | undefined>(undefined);

interface TauriContextProviderProps {
	children: ReactNode;
}

export const TauriContextProvider: React.FC<TauriContextProviderProps> = ({
	children,
}) => {
	const checkExists = async (path: string) => {
		try {
			const fullPath = await join("userData", path);
			const check = await exists(fullPath, {
				baseDir: BaseDirectory.AppLocalData,
			});
			return check;
		} catch (error) {
			console.error(error);
		}
	};

	const readDirectory = async (path: string) => {
		try {
			const fullPath = await join("userData", path);
			return await readDir(fullPath, {
				baseDir: BaseDirectory.AppLocalData,
			});
		} catch (error) {
			console.error(error);
		}
	};

	const mkDir = async (path: string) => {
		try {
			const exists = await checkExists(path);
			if (!exists) {
				const fullPath = await join("userData", path);
				await mkdir(fullPath, {
					baseDir: BaseDirectory.AppLocalData,
					recursive: true,
				});
			}
		} catch (error) {
			console.error(error);
		}
	};

	const saveFile = async (path: string, fileName: string, data: object) => {
		try {
			const fullPath = await join("userData", path);

			const filePath = await join(fullPath, fileName);

			const jsonData = JSON.stringify(data, null, 2);

			await writeTextFile(filePath, jsonData, {
				baseDir: BaseDirectory.AppLocalData,
			});

			console.log("JSON file '" + fileName + "' saved successfully.");
		} catch (error) {
			console.error("Error saving JSON file '" + fileName + "':", error);
		}
	};

	const loadFile = async (
		path: string,
		fileName: string,
		parse: boolean = true
	) => {
		try {
			const fullPath = await join("userData", path);

			const filePath = await join(fullPath, fileName);

			const fileContent = await readTextFile(filePath, {
				baseDir: BaseDirectory.AppLocalData,
			});

			if (parse) {
				const data = JSON.parse(fileContent);

				return data;
			} else {
				return fileContent;
			}
		} catch (error) {
			console.error("Error loading JSON file '" + fileName + "':", error);
			return null;
		}
	};

	return (
		<TauriContext.Provider
			value={{ saveFile, loadFile, checkExists, mkDir, readDirectory }}
		>
			{children}
		</TauriContext.Provider>
	);
};

export const useTauriContext = (): TauriContextType => {
	const context = useContext(TauriContext);
	if (!context) {
		throw new Error(
			"useTauriContext must be used within a TauriContextProvider"
		);
	}
	return context;
};
