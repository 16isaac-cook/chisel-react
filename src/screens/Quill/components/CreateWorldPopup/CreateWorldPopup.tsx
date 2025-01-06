import React, { useRef, useState } from "react";

import { StyledPopup } from "./CreateWorldPopup.styles";
import Scrim from "src/shared/components/Scrim/Scrim";
import Label from "src/shared/components/Label/Label";
import Input from "src/shared/components/Input/Input";
import Select from "src/shared/components/Select/Select";
import Button from "src/shared/components/Button/Button";

interface Props {
	close: () => void;
}

const CreateWorldPopup: React.FC<Props> = ({ close }) => {
	const [worldName, setWorldName] = useState("");
	const [worldTheme, setWorldTheme] = useState("");
	const [authorName, setAuthorName] = useState("");

	const updateName = (input: string) => {
		setWorldName(input);
	};
	const updateTheme = (value: string | number) => {
		setWorldTheme(value.toString());
	};
	const updateAuthor = (input: string) => {
		setAuthorName(input);
	};

	const createWorld = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(worldName, worldTheme, authorName);
		close();
	};

	return (
		<Scrim
			zIndex={999}
			close={close}
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<StyledPopup
				onSubmit={createWorld}
				onClick={(e) => e.stopPropagation()}
			>
				<Label fontSize={32} style={{ marginBottom: "0.3em" }}>
					Create New World
				</Label>
				<Label>World Name:</Label>
				<Input onChange={updateName} required={true}></Input>
				<Label>World Theme</Label>
				<Select
					options={[
						{ value: "fantasy", label: "Fantasy" },
						{ value: "scifi", label: "Sci-Fi" },
						{ value: "cosmic", label: "Cosmic Horror" },
						{ value: "steampunk", label: "Steampunk" },
						{ value: "superhero", label: "Superhero" },
						{ value: "western", label: "Western" },
						{ value: "historic", label: "Historic" },
						{ value: "modern", label: "Modern" },
						{ value: "apocalyptic", label: "Apocalyptic" },
						{ value: "dystopian", label: "Dystopian" },
						{ value: "other", label: "Other" },
					]}
					placeholder="Choose a theme..."
					onChange={updateTheme}
				/>
				<Label>Author Name (Optional):</Label>
				<Input onChange={updateAuthor}></Input>
				<Button
					style={{ marginTop: "0.3em" }}
					variant="primary"
					submit={true}
				>
					Create World
				</Button>
			</StyledPopup>
		</Scrim>
	);
};

export default CreateWorldPopup;
