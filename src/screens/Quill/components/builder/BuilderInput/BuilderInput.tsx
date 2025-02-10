import { forwardRef } from "react";
import { Controller } from "react-hook-form";

import Container from "src/shared/components/Container/Container";
import Input from "src/shared/components/Input/Input";
import Button from "src/shared/components/Button/Button";
import Label from "src/shared/components/Label/Label";
import EyeToggle from "../EyeToggle/EyeToggle";

import { builderObjects } from "src/screens/Quill/constants/builderObjects";

interface Props {
	type: keyof typeof builderObjects;
	id: string;
	label: string;
	description?: string;
	value?: string | [string, boolean];
	register: () => void;
	control?: () => void;
	[key: string]: any;
}

const BuilderInput = forwardRef<HTMLInputElement, Props>(
	({ type, id, label, description, value, register, control }, ref) => {
		if (id === "name") {
			return (
				<Container
					wide
					column
					justify="flex-start"
					fontSize="huge"
					flex="0 1 0"
				>
					<Container flex="0 1 0" wide>
						<Input
							flex="1 1 auto"
							right="0.15em"
							margin={false}
							value={value ? value : ""}
							ref={ref}
							{...register("name", {
								required: "A name is required.",
							})}
						/>
						<Button flex="0 0 auto" submit>
							Save Object
						</Button>
					</Container>
					<Label
						italic
						flex="0 1 auto"
						justify="flex-start"
						padding={[0, "0.3em"]}
						wide
					>
						{builderObjects[type].name} Name (Required)
					</Label>
				</Container>
			);
		}
		return (
			<Container
				wide
				column
				justify="flex-start"
				fontSize="big"
				flex="0 1 0"
				bottom
			>
				<Label
					italic
					flex="0 1 auto"
					justify="flex-start"
					padding={[0, "0.3em"]}
					wide
				>
					{builderObjects[type].name} {label}
					<Controller
						name={`${id}.1`}
						control={control}
						render={({ field }) => (
							<EyeToggle
								value={
									value && Array.isArray(value)
										? value[1]
										: field.value
								}
								onChange={field.onChange}
							/>
						)}
					/>
				</Label>
				<Input
					flex="1 1 auto"
					margin={false}
					wide
					{...register(`${id}.0`)}
				/>
				{description ? (
					<Label
						italic
						fontSize="normal"
						flex="0 1 auto"
						justify="flex-start"
						padding={[0, "0.3em"]}
						value={value && Array.isArray(value) ? value[0] : ""}
						wide
						color="dim"
					>
						{description}
					</Label>
				) : null}
			</Container>
		);
	}
);

export default BuilderInput;
