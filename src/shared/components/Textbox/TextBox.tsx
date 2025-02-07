import { forwardRef } from "react";

import { CommonStyleProps } from "src/shared/util/styles";

import { StyledTextBox } from "./TextBox.styles";

interface Props extends CommonStyleProps {
    value?: string | number;
    disabled?: boolean;
    filter?: RegExp;
    onChange?: () => {};
    [key: string]: any;
}

const TextBox = forwardRef<HTMLTextAreaElement, Props>(
    (
        {
            value,
            fontSize,
            disabled,
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
                margin={margin}
                ref={ref}
            />
        );
    }
);

export default TextBox;
