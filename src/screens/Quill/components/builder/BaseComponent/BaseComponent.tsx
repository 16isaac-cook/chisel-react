import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { message } from "@tauri-apps/plugin-dialog";

import { formatString, getDate } from "src/shared/util/functions";
import { useTauriContext } from "src/shared/context/tauri-context";
import { useQuillContext } from "src/screens/Quill/context/quill-context";
import { builderObjects } from "src/screens/Quill/constants/builderObjects";
import { WorldObject } from "src/screens/Quill/types/quill.types";

import { StyledBuilderComponent } from "./BaseComponent.styles";
import Container from "src/shared/components/Container/Container";
import Label from "src/shared/components/Label/Label";
import Switch from "src/shared/components/Switch/Switch";
import Icon from "src/shared/components/Icon/Icon";
import BuilderInput from "../BuilderInput/BuilderInput";
import BuilderTextBox from "../BuilderTextBox/BuilderTextBox";

const BuilderBaseComponent: React.FC = () => {
	const { worldId, type, objectId } = useParams<{
		worldId: string;
		type: string;
		objectId: string;
	}>();
	const location = useLocation();

	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<WorldObject>({
		defaultValues: {
			id: "",
			dateCreated: "",
			lastEdited: "",
			type: "",
			name: "",
			description: ["", true],
			link: true,
			gmNotes: ["", false],
		},
	});

	const tauri = useTauriContext();
	const quill = useQuillContext();
	const navigate = useNavigate();

	const [editing, setEditing] = useState(false);
	const [objDateCreated, setObjDateCreated] = useState("");

	const loadObj = useCallback(async () => {
		if (objectId && type) {
			try {
				const obj = (await tauri.loadFile(
					`quill/worlds/${worldId}/${type}`,
					`${objectId}.json`
				)) as WorldObject;
				setObjDateCreated(obj.dateCreated);
				reset(obj);
			} catch (error) {
				console.error(error);
			} finally {
				setEditing(true);
			}
		}
	}, [objectId, reset, tauri, type, worldId]);

	useEffect(() => {
		loadObj();
	}, [location.key, loadObj]);

	const createObject = async (data: WorldObject) => {
		console.log("data:", data);
		try {
			const fullPath = `quill/worlds/${worldId}/${type}`;

			await tauri.saveFile(fullPath, `${data.id}.json`, data);
		} catch (error) {
			console.error("Error creating world object:", error);
		} finally {
			await quill.loadWorld();
			navigate("..");
		}
	};

	const onSubmit = async (data: WorldObject) => {
		const alreadyExists = await tauri.checkExists(
			`quill/worlds/${worldId}/${type}/${formatString(data.name)}.json`
		);
		if (alreadyExists && !editing) {
			await message(
				`An object (${type}) with the name '${data.name}' already exists.`,
				{ title: "Object Already Exists", kind: "error" }
			);
		} else {
			const newData = {
				...data,
				id: formatString(data.name),
				lastEdited: getDate(),
				dateCreated: objDateCreated ? objDateCreated : getDate(),
				type: type,
			} as WorldObject;
			await createObject(newData);
		}
	};

	if (!type || !(type in builderObjects)) {
		return <Container>error</Container>;
	}

	return (
		<StyledBuilderComponent
			onSubmit={handleSubmit(onSubmit)}
			autoComplete="off"
		>
			{/* object name input */}
			<BuilderInput
				type={type}
				id="name"
				label="Name"
				register={register}
			/>
			{errors.name && (
				<Label
					justify="flex-start"
					fontSize="big"
					padding={[0, "0.3em"]}
					color="error"
				>
					{errors.name.message}
				</Label>
			)}
			{/* toggle linking */}
			<Controller
				name="link"
				control={control}
				render={({ field }) => {
					return (
						<Switch
							label="Link to other objects"
							fontSize="big"
							bottom
							key={field.value ? "checked" : "unchecked"}
							defaultChecked={field.value}
							onChecked={field.onChange}
							border={{ bottom: true }}
						/>
					);
				}}
			/>
			<Label>
				<Icon icon="eyeOpen" right /> = can be seen by players,&nbsp;
				<Icon icon="eyeClosed" right />= cannot be seen by players.
				Click to toggle.
			</Label>
			{/* description */}
			<BuilderTextBox
				type={type}
				id="description"
				label="Description"
				register={register}
				control={control}
			/>
			{/* gm notes */}
			<BuilderTextBox
				type={type}
				id="gmNotes"
				label="GM Notes"
				register={register}
				control={control}
			/>
			{/* inputs unique to each type */}
		</StyledBuilderComponent>
	);
};

export default BuilderBaseComponent;
