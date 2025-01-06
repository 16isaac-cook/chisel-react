import { useState } from "react";
import { Outlet, useNavigate } from "react-router";

import Page from "src/shared/components/Page/Page";
import Container from "src/shared/components/Container/Container";
import SmallTitle from "src/shared/components/SmallTitle/SmallTitle";
import Panel from "src/shared/components/Panel/Panel";
import Button from "src/shared/components/Button/Button";
import Icon from "src/shared/components/Icon/Icon";
import CreateWorldPopup from "./components/CreateWorldPopup/CreateWorldPopup";

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
	const [popupOpen, setPopupOpen] = useState(false);

	const togglePopup = () => {
		setPopupOpen(!popupOpen);
	};

	return (
		<Container style={{ width: "100%" }} padding={false}>
			<SmallTitle>Worlds</SmallTitle>
			<Panel>
				<Container></Container>
				<Button style={{ width: "100%" }} onClick={togglePopup}>
					Create New World
					<Icon icon="add" style={{ marginLeft: "0.3em" }} />
				</Button>
			</Panel>
			{popupOpen ? <CreateWorldPopup close={togglePopup} /> : null}
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
