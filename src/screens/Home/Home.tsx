import React from "react";
import { useNavigate } from "react-router";

import Page from "src/shared/components/Page/Page";
import Panel from "src/shared/components/Panel/Panel";
import Label from "src/shared/components/Label/Label";
import Container from "src/shared/components/Container/Container";
import Button from "src/shared/components/Button/Button";

const Home: React.FC = () => {
	const navigate = useNavigate();

	return (
		<Page title="Home">
			<Panel style={{ maxWidth: "80%", backgroundColor: "transparent" }}>
				<div
					style={{
						width: "800px",
						height: "400px",
						backgroundColor: "#fff5",
						margin: "0.3em",
					}}
				>
					placeholder
				</div>
				<Label fontSize={32}>
					Welcome to the Chisel TTRPG tool! A one-stop-shop for all
					things TTRPG.
				</Label>
				<Label center={true} style={{ marginBottom: "0.3em" }}>
					Chisel aims to be one of the best tools for both GMs and
					players alike, containing things like character creation,
					campaign management, homebrew, and more! In addition, Chisel
					will always be open-source and completely free. Chisel is
					planned to support Dungeons & Dragons 5e, Pathfinder 2e, and
					Daggerheart.
				</Label>
				<Container
					column={false}
					style={{
						display: "grid",
						gridTemplateColumns: "1fr 1fr 1fr 1fr",
						gridTemplateRows: "auto",
					}}
				>
					<Button
						fontSize={20}
						iconSize={48}
						variant="vertical"
						icon="quill"
						onClick={() => {
							navigate("/gm-tools");
						}}
					>
						GM Tools
					</Button>
					<Button
						fontSize={20}
						iconSize={48}
						variant="vertical"
						icon="team"
						onClick={() => {
							navigate("/player-tools");
						}}
					>
						Player Tools
					</Button>
					<Button
						fontSize={20}
						iconSize={48}
						variant="vertical"
						icon="book"
						onClick={() => {
							navigate("/manage-content");
						}}
					>
						Manage Content
					</Button>
					<Button
						fontSize={20}
						iconSize={48}
						variant="vertical"
						icon="info"
						onClick={() => {
							navigate("/help-and-info");
						}}
					>
						Help & Info
					</Button>
				</Container>
			</Panel>
		</Page>
	);
};

export default Home;
