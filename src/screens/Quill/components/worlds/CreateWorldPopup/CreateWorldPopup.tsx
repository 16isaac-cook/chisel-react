import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { message } from "@tauri-apps/plugin-dialog";

import { useTauriContext } from "src/shared/context/tauri-context";
import { formatString, getDate } from "src/shared/util/functions";
import { builderObjects } from "../../../constants/builderObjects";
import { worldThemes } from "src/screens/Quill/constants/worldThemes";

import { StyledPopup } from "./CreateWorldPopup.styles";
import Scrim from "src/shared/components/Scrim/Scrim";
import Label from "src/shared/components/Label/Label";
import Input from "src/shared/components/Input/Input";
import Select from "src/shared/components/Select/Select";
import Button from "src/shared/components/Button/Button";
import Panel from "src/shared/components/Panel/Panel";

interface Props {
    close: () => void;
    reload: () => void;
}

type FormValues = {
    name: string;
    theme: string;
    author: string;
};

const CreateWorldPopup: React.FC<Props> = ({ close, reload }) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: { name: "", theme: "", author: "" },
    });

    const tauri = useTauriContext();

    const [creating, setCreating] = useState(false);

    const createWorld = async (
        worldName: string,
        worldTheme: string,
        authorName: string
    ) => {
        setCreating(true);
        const worldId = formatString(worldName);
        const fullPath = "quill/worlds/" + worldId;

        const json = {
            worldId: worldId,
            name: worldName,
            theme: worldTheme,
            author: authorName,
            dateCreated: getDate(),
            lastEdited: getDate(),
        };

        await tauri.mkDir(fullPath);
        await tauri.saveFile(fullPath, "worldinfo.json", json);

        for (const [key] of Object.entries(builderObjects)) {
            await tauri.mkDir(`${fullPath}/${key}`);
        }
        setCreating(false);
    };

    const onSubmit = async (data: {
        name: string;
        theme: string;
        author: string;
    }) => {
        const alreadyExists = await tauri.checkExists(
            `quill/worlds/${formatString(data.name)}`
        );
        if (alreadyExists) {
            await message(
                `A world with the name '${data.name}' already exists.`,
                { title: "World Already Exists", kind: "error" }
            );
        } else {
            await createWorld(data.name, data.theme, data.author);
            close();
            reload();
        }
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
            {creating ? (
                <Panel column flex="0 1 0" style={{ whiteSpace: "nowrap" }}>
                    <Label fontSize="huge" padding>
                        Creating world...
                    </Label>
                </Panel>
            ) : (
                <StyledPopup
                    onSubmit={handleSubmit(onSubmit)}
                    onMouseDown={(e) => e.stopPropagation()}
                >
                    <Label fontSize="huge" bottom>
                        Create New World
                    </Label>

                    <Label>World Name:</Label>
                    <Input
                        {...register("name", {
                            required: "A World name is required.",
                        })}
                    />
                    {errors.name && (
                        <Label fontSize="big" color="error">
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
                                options={Object.entries(worldThemes).map(
                                    ([key, value]) => ({
                                        value: key,
                                        label: value.name,
                                        icon: value.icon,
                                    })
                                )}
                                placeholder="Choose a theme..."
                            />
                        )}
                    />
                    {errors.theme && (
                        <Label fontSize="big" color="error">
                            {errors.theme.message}
                        </Label>
                    )}

                    <Label>Author Name (Optional):</Label>
                    <Input {...register("author")}></Input>

                    <Button top variant="primary" submit>
                        Create World
                    </Button>
                </StyledPopup>
            )}
        </Scrim>
    );
};

export default CreateWorldPopup;
