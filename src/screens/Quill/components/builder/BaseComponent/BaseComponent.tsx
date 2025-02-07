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
import { StyledBuilderComponent } from "./BaseComponent.styles";
import TextBox from "src/shared/components/Textbox/TextBox";

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

    const handleErrors = async () => {
        let errorMessages = "";
        Object.values(errors)
            .filter((error) => error?.message)
            .forEach((error) => (errorMessages += `- ${error?.message}\n`));
        if (errorMessages) {
            await message(errorMessages, {
                title: "There were errors when creating your object",
                kind: "error",
            });
        }
    };

    if (!type || !(type in builderObjects)) {
        return <Container>error</Container>;
    }

    return (
        <StyledBuilderComponent onSubmit={handleSubmit(onSubmit)}>
            <Container
                wide
                column
                justify="flex-start"
                fontSize="huge"
                flex="1 1 0"
                padding={["0.3em", 0]}
                bottom
            >
                <Container flex="0 1 0" wide>
                    <Input
                        flex="1 1 auto"
                        margin={[0, "0.15em", 0, 0]}
                        {...register("name", {
                            required: "A name is required.",
                        })}
                    />
                    <Button flex="0 0 auto" submit onClick={handleErrors}>
                        Save Object
                    </Button>
                </Container>
                <Label
                    italic
                    flex="0 1 auto"
                    column={false}
                    justify="flex-start"
                    padding={[0, "0.3em"]}
                    style={{ width: "100%" }}
                >
                    {builderObjects[type].name} Name
                </Label>
            </Container>
            <Container wide column justify="flex-start" fontSize="big">
                <Label
                    italic
                    flex="0 1 auto"
                    column={false}
                    justify="flex-start"
                    padding={[0, "0.3em"]}
                    style={{ width: "100%" }}
                >
                    {builderObjects[type].name} Name
                </Label>
                <TextBox wide margin={false} />
            </Container>
        </StyledBuilderComponent>
    );
};

// ADD react-custom-scrollbars

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
