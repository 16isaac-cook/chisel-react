import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router";

import Page from "src/shared/components/Page/Page";
import Container from "src/shared/components/Container/Container";
import SmallTitle from "src/shared/components/SmallTitle/SmallTitle";
import Panel from "src/shared/components/Panel/Panel";
import Button from "src/shared/components/Button/Button";
import Icon from "src/shared/components/Icon/Icon";
import CreateWorldPopup from "./components/worlds/CreateWorldPopup/CreateWorldPopup";
import Label from "src/shared/components/Label/Label";

import { useTauriContext } from "src/shared/context/tauri-context";
import { worldThemes } from "./constants/worldThemes";
import { builderObjects } from "./constants/builderObjects";
import { World, WorldData, JsonFile } from "./types/quill.types";
import WorldList from "./components/worlds/WorldList/WorldList";
import Folder from "./components/builder/Folder/Folder";
import ObjectPicker from "./components/builder/ObjectPicker/ObjectPicker";

const Quill: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<Page title="Quill" back="/gm-tools">
			<Container column={false} style={{ width: "100%", height: "100%" }}>
				{/* left panel, navigation */}
				<Container
					style={{
						width: "20%",
						height: "100%",
						marginRight: "0.3em",
					}}
					padding={false}
				>
					<SmallTitle>Explorer</SmallTitle>
					<Panel style={{ flex: "0 1 0", padding: "0.6em" }}>
						<Button
							variant="big"
							icon="home"
							style={{ width: "100%" }}
							bottom={true}
							active={location.pathname === "/quill"}
							onClick={() => {
								navigate("/quill");
							}}
						>
							Home
						</Button>
						<Button
							variant="big"
							icon="globe"
							style={{ width: "100%" }}
							active={location.pathname.includes("worlds")}
							onClick={() => {
								navigate("/quill/worlds");
							}}
						>
							Worlds
						</Button>
					</Panel>
					<Panel
						top={true}
						bottom={true}
						style={{
							flex: "1 1 0",
						}}
					>
						Select a World to get started!
						<Container
							style={{
								overflowY: "auto",
								overflowX: "hidden",
								flex: "1 1 0",
								width: "100%",
							}}
							padding={false}
							justify="flex-start"
						>
							<Button
								onClick={() =>
									navigate("/quill/builder/testWorld")
								}
							>
								Test
							</Button>
						</Container>
					</Panel>
					<Panel style={{ flex: "0 1 0", padding: "0.6em" }}>
						<Button
							variant="big"
							icon="settings"
							style={{ width: "100%" }}
							bottom={true}
							active={location.pathname.includes("settings")}
							onClick={() => {
								navigate("/quill/settings");
							}}
						>
							Settings
						</Button>
						<Button
							variant="big"
							icon="help"
							style={{ width: "100%" }}
							active={location.pathname.includes("help")}
							onClick={() => {
								navigate("/quill/help");
							}}
						>
							Help & Info
						</Button>
					</Panel>
				</Container>

				{/* right panel, content */}
				<Container
					style={{
						width: "80%",
						height: "100%",
					}}
					padding={false}
				>
					<Outlet />
				</Container>
			</Container>
		</Page>
	);
};

export default Quill;

export const QuillHome: React.FC = () => {
	return (
		<Container style={{ width: "100%" }} padding={false}>
			<SmallTitle>Home</SmallTitle>
			<Panel></Panel>
		</Container>
	);
};

export const QuillWorlds: React.FC = () => {
	const tauri = useTauriContext();

	const [popupOpen, setPopupOpen] = useState(false);

	const [worlds, setWorlds] = useState<World[]>([]);
	const [loading, setLoading] = useState(true);

	const togglePopup = () => {
		setPopupOpen(!popupOpen);
	};

	const switchToWorld = (worldName: string) => {
		console.log(worldName);
	};

	const loadWorlds = useCallback(async () => {
		setLoading(true);
		const worldList = await tauri.readDirectory("quill/worlds");
		if (worldList) {
			for (const world of worldList) {
				const worldInfo = await tauri.loadFile(
					"quill/worlds/" + world.name,
					"worldinfo.json",
					false
				);
				if (typeof worldInfo === "string") {
					const parsed: World = JSON.parse(worldInfo);

					setWorlds((oldSet) => {
						if (
							oldSet.some(
								(existingItem) =>
									existingItem.worldId === parsed.worldId
							)
						) {
							return oldSet;
						}
						return [...oldSet, parsed];
					});
				}
			}
		}
		console.log(worlds);
		setLoading(false);
	}, [tauri, worlds]);

	const stringified = JSON.stringify([...worlds]);
	useEffect(() => {
		loadWorlds();
	}, [stringified, loadWorlds]);

	if (loading) {
		return (
			<Container style={{ width: "100%" }} padding={false}>
				<SmallTitle>Worlds</SmallTitle>
				<Panel
					style={{ justifyContent: "center", alignItems: "center" }}
				>
					<Label>Loading worlds...</Label>
				</Panel>
			</Container>
		);
	}

	return (
		<Container style={{ width: "100%" }} padding={false}>
			<SmallTitle>Worlds</SmallTitle>
			<Panel>
				<Container style={{ width: "100%" }}>
					<WorldList
						worlds={worlds.map((world) => {
							return {
								worldId: world.worldId,
								label: world.name,
								theme: world.theme,
							};
						})}
						switchToWorld={switchToWorld}
					/>
				</Container>
				<Button style={{ width: "100%" }} onClick={togglePopup}>
					Create New World
					<Icon icon="add" style={{ marginLeft: "0.3em" }} />
				</Button>
			</Panel>
			{popupOpen ? (
				<CreateWorldPopup close={togglePopup} reload={loadWorlds} />
			) : null}
		</Container>
	);
};

export const QuillBuilder: React.FC = () => {
	const { worldId } = useParams<{ worldId: string }>();

	const tauri = useTauriContext();
	const path = "quill/worlds/" + worldId;

	const [loading, setLoading] = useState(true);

	const initialValues = () => {
		const dataObj = Object.keys(builderObjects).reduce((acc, key) => {
			(acc as any)[key] = [];
			return acc;
		}, {} as WorldData);
		return dataObj;
	};

	const getWorldInfo = useCallback(async () => {
		const info = await tauri.loadFile(
			"quill/worlds/" + worldId,
			"worldinfo.json",
			false
		);
		if (typeof info === "string") {
			const parsed: World = JSON.parse(info);
			return parsed;
		}
		throw new Error("Expected a world, but got something else");
	}, [tauri, worldId]);

	const [data, setData] = useState<WorldData>(initialValues());
	const [worldInfo, setWorldInfo] = useState<World>();

	const loadData = useCallback(async () => {
		setLoading(true);
		try {
			//set the world info real quick
			const info = await getWorldInfo();
			setWorldInfo(info);

			//pull folders for each object (building, celestialBody, etc...)
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
									setData((prevData) => ({
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
			console.log(error);
		}

		setLoading(false);
	}, [path, getWorldInfo, tauri]);

	useEffect(() => {
		loadData();
	}, [loadData]);

	useEffect(() => {
		console.log(data);
	}, [data]);

	if (loading) {
		return (
			<Container style={{ width: "100%" }} padding={false}>
				<SmallTitle>
					Builder - {worldInfo ? worldInfo.name : "ERROR"}
				</SmallTitle>
				<Container
					style={{ width: "100%" }}
					column={false}
					padding={false}
				>
					<Panel
						title="World Objects"
						right={true}
						style={{ height: "100%", width: "25%" }}
					></Panel>
					<Panel
						title="Builder"
						style={{
							height: "100%",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Label>Loading world data...</Label>
					</Panel>
				</Container>
			</Container>
		);
	}

	return (
		<Container style={{ width: "100%" }} padding={false}>
			<SmallTitle>
				Builder - {worldInfo ? worldInfo.name : "ERROR"}
			</SmallTitle>
			<Container style={{ width: "100%" }} column={false} padding={false}>
				<Panel
					title="World Objects"
					right={true}
					style={{
						height: "100%",
						width: "25%",
						maxWidth: "25%",
					}}
				>
					<Container
						style={{
							width: "100%",
							flex: "1 0 0",
							overflowY: "auto",
							justifyContent: "flex-start",
						}}
					>
						{data && worldInfo
							? Object.entries(builderObjects).map(
									([obj, value]) => {
										const items = data[obj];
										if (items.length > 0) {
											return (
												<Folder
													folderId={obj}
													worldId={worldInfo.worldId}
													icon={value.icon}
													itemList={items}
													key={obj}
												>
													{value.plural
														? value.plural
														: value.name + "s"}
												</Folder>
											);
										} else {
											return null;
										}
									}
							  )
							: null}
					</Container>
				</Panel>
				<Panel title="Builder" style={{ height: "100%" }}>
					<ObjectPicker />
				</Panel>
			</Container>
		</Container>
	);
};

export const QuillSettings: React.FC = () => {
	return (
		<Container style={{ width: "100%" }} padding={false}>
			<SmallTitle>Settings</SmallTitle>
			<Panel></Panel>
		</Container>
	);
};

export const QuillHelp: React.FC = () => {
	return (
		<Container style={{ width: "100%" }} padding={false}>
			<SmallTitle>Help & Info</SmallTitle>
			<Panel></Panel>
		</Container>
	);
};
