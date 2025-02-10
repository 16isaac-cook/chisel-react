import { forwardRef, useState } from "react";

import { CommonStyleProps } from "src/shared/util/styles";

import { StyledTextBox } from "./TextBox.styles";

interface Props extends CommonStyleProps {
	value?: string | number;
	disabled?: boolean;
	filter?: RegExp;
	[key: string]: any;
}

const TextBox = forwardRef<HTMLTextAreaElement, Props>(
	(
		{ value, fontSize, disabled, filter, margin = true, ...textBoxProps },
		ref
	) => {
		const [text, setText] = useState(value);
		return (
			<StyledTextBox
				{...textBoxProps}
				value={text}
				fontSize={fontSize}
				disabled={disabled}
				onChange={(e) => setText(e.target.value)}
				margin={margin}
				ref={ref}
			/>
		);
	}
);

export default TextBox;
