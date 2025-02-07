import React, { useState } from "react";
import { useParams } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { message } from "@tauri-apps/plugin-dialog";

import { useTauriContext } from "src/shared/context/tauri-context";
import { formatString, getDate } from "src/shared/util/functions";
import { builderObjects } from "src/screens/Quill/constants/builderObjects";
import { WorldObject } from "src/screens/Quill/types/quill.types";

import Container from "src/shared/components/Container/Container";
import Label from "src/shared/components/Label/Label";
import Input from "src/shared/components/Input/Input";
import Button from "src/shared/components/Button/Button";

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
            name: "",
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
            column
            justify="flex-start"
            wide
            flex="1 1 auto"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Container wide column>
                <Container fontSize="huge" wide>
                    <Input
                        flex="1 1 auto"
                        {...register("name", {
                            required: "A name is required.",
                        })}
                    />
                    <Button flex="0 0 auto">Save Object</Button>
                </Container>
                <Label style={{ backgroundColor: "red" }}>test</Label>
            </Container>
        </Container>
    );
};

export default BuilderBaseComponent;

/*
<Controller
                        name="name"
                        control={control}
                        rules={{ required: "A name is required." }}
                        render={({ field }) => (
                            <Input
                                {...field}
                                value={field.value[0]}
                                onChange={
                                    (e: React.ChangeEvent<HTMLInputElement>) =>
                                        field.onChange([
                                            e.target.value,
                                            field.value[1],
                                        ]) // set value to [string, boolean]
                                }
                            />
                        )}
                    />
                    */
