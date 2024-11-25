import { ChangeEventHandler, forwardRef } from "react";

import { StyledInput } from "./Input.styles";

type Props = {
	value?: string | number;
	fontSize?: number;
	disabled?: boolean;
	filter?: RegExp;
	onChange?: () => {};
	[key: string]: any;
};

const Input = forwardRef<HTMLInputElement, Props>(
	(
		{
			value,
			fontSize = 0,
			disabled = false,
			filter = ``,
			onChange = () => {},
			...inputProps
		},
		ref
	) => {
		const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
			if (!filter || filter.test(event.target.value)) {
				onChange(event.target.value, event);
			}
		};

		return (
			<StyledInput
				{...inputProps}
				value={value}
				fontSize={fontSize}
				disabled={disabled}
				onChange={handleChange}
				ref={ref}
			/>
		);
	}
);

export default Input;
