import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";

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
import WorldList from "./components/worlds/WorldList/WorldList";

const json = {
	test1: "test",
	test2: "test",
	test3: "test",
};

const Quill: React.FC = () => {
	const navigate = useNavigate();

	const [currentPage, setCurrentPage] = useState("home");
	const [currentWorld, setCurrentWorld] = useState();

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
							active={currentPage === "home"}
							onClick={() => {
								setCurrentPage("home");
								navigate("/quill");
							}}
						>
							Home
						</Button>
						<Button
							variant="big"
							icon="globe"
							style={{ width: "100%" }}
							active={currentPage === "worlds"}
							onClick={() => {
								setCurrentPage("worlds");
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
						></Container>
					</Panel>
					<Panel style={{ flex: "0 1 0", padding: "0.6em" }}>
						<Button
							variant="big"
							icon="settings"
							style={{ width: "100%" }}
							bottom={true}
							active={currentPage === "settings"}
							onClick={() => {
								setCurrentPage("settings");
								navigate("/quill/settings");
							}}
						>
							Settings
						</Button>
						<Button
							variant="big"
							icon="help"
							style={{ width: "100%" }}
							active={currentPage === "help"}
							onClick={() => {
								setCurrentPage("help");
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
	const ctx = useTauriContext();

	const [popupOpen, setPopupOpen] = useState(false);

	type WorldType = {
		worldId: string;
		name: string;
		theme: keyof typeof worldThemes;
		author: string;
		dateCreated: string;
	};
	const [worlds, setWorlds] = useState<WorldType[]>([]);
	const [loading, setLoading] = useState(true);

	const togglePopup = () => {
		setPopupOpen(!popupOpen);
	};

	const switchToWorld = (worldName: string) => {
		console.log(worldName);
	};

	const loadWorlds = async () => {
		setLoading(true);
		const worldList = await ctx.readDirectory("quill/worlds");
		if (worldList) {
			for (const world of worldList) {
				const worldInfo = await ctx.loadFile(
					"quill/worlds/" + world.name,
					"worldinfo.json",
					false
				);
				if (typeof worldInfo === "string") {
					const parsed: WorldType = JSON.parse(worldInfo);

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
	};

	useEffect(() => {
		loadWorlds();
	}, [JSON.stringify([...worlds])]);

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
