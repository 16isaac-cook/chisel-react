import { forwardRef } from "react";

import { StyledTextBox } from "./TextBox.styles";

interface Props {
	value?: string | number;
	fontSize?: number;
	disabled?: boolean;
	filter?: RegExp;
	margin?: boolean;
	onChange?: () => {};
	[key: string]: any;
}

const TextBox = forwardRef<HTMLTextAreaElement, Props>(
	(
		{
			value,
			fontSize = 0,
			disabled = false,
			filter,
			margin = true,
			onChange = () => {},
			...textBoxProps
		},
		ref
	) => {
		return (
			<StyledTextBox
				{...textBoxProps}
				value={value}
				fontSize={fontSize}
				disabled={disabled}
				onChange={onChange}
				$margin={margin}
				ref={ref}
			/>
		);
	}
);

export default TextBox;
