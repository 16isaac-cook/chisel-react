import { forwardRef, useState } from "react";

import { CommonStyleProps } from "src/shared/util/styles";

import { StyledInput } from "./Input.styles";

interface Props extends CommonStyleProps {
	value?: string | number;
	disabled?: boolean;
	filter?: RegExp;
	[key: string]: any;
}

const Input = forwardRef<HTMLInputElement, Props>(
	(
		{ value, fontSize, disabled, filter, margin = true, ...inputProps },
		ref
	) => {
		const [text, setText] = useState(value);
		return (
			<StyledInput
				{...inputProps}
				value={text}
				fontSize={fontSize}
				disabled={disabled}
				onChange={(e) => setText(e.target.value)}
				margin={margin}
				autoComplete="off"
				ref={ref}
			/>
		);
	}
);

export default Input;
