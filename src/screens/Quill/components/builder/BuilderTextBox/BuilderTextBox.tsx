import React, { forwardRef } from "react";
import { Controller } from "react-hook-form";

import Container from "src/shared/components/Container/Container";
import TextBox from "src/shared/components/Textbox/TextBox";
import Label from "src/shared/components/Label/Label";
import EyeToggle from "../EyeToggle/EyeToggle";

import { builderObjects } from "src/screens/Quill/constants/builderObjects";

interface Props {
	type: keyof typeof builderObjects;
	id: string;
	label: string;
	description?: string;
	value?: [string, boolean];
	register: () => void;
	control?: () => void;
	[key: string]: any;
}

const BuilderTextBox = forwardRef<HTMLTextAreaElement, Props>(
	({ type, id, label, description, value, register, control }, ref) => {
		return (
			<Container
				wide
				column
				justify="flex-start"
				flex="0 1 0"
				fontSize="big"
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
				<TextBox
					wide
					value={value && Array.isArray(value) ? value[0] : ""}
					ref={ref}
					margin={false}
					bottom
					{...register(`${id}.0`)}
				/>
				{description ? (
					<Label
						italic
						fontSize="normal"
						flex="0 1 auto"
						justify="flex-start"
						padding={[0, "0.3em"]}
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

export default BuilderTextBox;
