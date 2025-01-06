import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { StyledPopup } from "./CreateWorldPopup.styles";
import Scrim from "src/shared/components/Scrim/Scrim";
import Label from "src/shared/components/Label/Label";
import Input from "src/shared/components/Input/Input";
import Select from "src/shared/components/Select/Select";
import Button from "src/shared/components/Button/Button";

interface Props {
	close: () => void;
}

type FormValues = {
	name: string;
	theme: string;
	author: string;
};

const CreateWorldPopup: React.FC<Props> = ({ close }) => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: { name: "", theme: "", author: "" },
	});

	const [worldName, setWorldName] = useState("");
	const [worldTheme, setWorldTheme] = useState("");
	const [authorName, setAuthorName] = useState("");

	const onSubmit = (data: {
		name: string;
		theme: string;
		author: string;
	}) => {
		console.log("Form submitted: ", data);
		close();
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
				onSubmit={handleSubmit(onSubmit)}
				onMouseDown={(e) => e.stopPropagation()}
			>
				<Label fontSize={32} style={{ marginBottom: "0.3em" }}>
					Create New World
				</Label>

				<Label>World Name:</Label>
				<Input
					{...register("name", {
						required: "A World name is required.",
					})}
				/>
				{errors.name && (
					<Label fontSize={24} style={{ color: "red" }}>
						{errors.name.message}
					</Label>
				)}

				<Label>World Theme</Label>
				<Controller
					name="theme"
					control={control}
					rules={{ required: "A theme choice is required." }}
					render={({ field }) => (
						<Select
							{...field}
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
						/>
					)}
				/>
				{errors.theme && (
					<Label fontSize={24} style={{ color: "red" }}>
						{errors.theme.message}
					</Label>
				)}

				<Label>Author Name (Optional):</Label>
				<Input {...register("author")}></Input>

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
