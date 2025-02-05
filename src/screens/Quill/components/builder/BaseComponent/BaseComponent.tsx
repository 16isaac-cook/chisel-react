import React, { useState } from "react";
import { useParams } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { message } from "@tauri-apps/plugin-dialog";

import { useTauriContext } from "src/shared/context/tauri-context";
import { formatString, getDate } from "src/shared/util/functions";
import { builderObjects } from "src/screens/Quill/constants/builderObjects";
import { WorldObject } from "src/screens/Quill/types/quill.types";

import Container from "src/shared/components/Container/Container";

const BuilderBaseComponent: React.FC = () => {
    const { worldId, type } = useParams<{ worldId: string; type: string }>();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<WorldObject>({
        defaultValues: {
            id: "",
            type: "",
            name: ["", true],
            description: ["", true],
            link: true,
            gmNotes: ["", false],
        },
    });

    const tauri = useTauriContext();

    const [creating, setCreating] = useState(false);

    const createObject = async (data: WorldObject) => {
        try {
            setCreating(true);
            const fullPath = `quill/worlds/${worldId}/${type}`;

            await tauri.saveFile(fullPath, `${data.id}.json`, data);
        } catch (error) {
            console.error("Error creating world object:", error);
        } finally {
            setCreating(false);
        }
    };

    const onSubmit = async (data: WorldObject) => {
        const alreadyExists = await tauri.checkExists(
            `quill/worlds/${worldId}/${type}/${formatString(data.id)}`
        );
        if (alreadyExists) {
            await message(
                `An object with the name '${data.name} already exists.`,
                { title: "Object Already Exists", kind: "error" }
            );
        } else {
            await createObject(data);
        }
    };

    return (
        <Container
            column={true}
            justify="center"
            style={{ flex: "1 1 auto" }}
            padding={false}
            onSubmit={handleSubmit(onSubmit)}
        >
            {worldId} {type}
        </Container>
    );
};

export default BuilderBaseComponent;
