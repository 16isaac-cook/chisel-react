import { ChangeEventHandler, forwardRef } from "react";

import { StyledInput } from "./Input.styles";

type Props = {
	value?: string | number;
	fontSize?: number;
	disabled?: boolean;
	filter?: RegExp;
	margin?: boolean;
	onChange?: () => {};
	[key: string]: any;
};

const Input = forwardRef<HTMLInputElement, Props>(
	(
		{
			value,
			fontSize = 0,
			disabled = false,
			filter,
			margin = true,
			onChange = () => {},
			...inputProps
		},
		ref
	) => {
		return (
			<StyledInput
				{...inputProps}
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

export default Input;
