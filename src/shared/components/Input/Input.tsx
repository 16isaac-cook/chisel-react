import { forwardRef } from "react";

import { fontSizes, CommonStyleProps } from "src/shared/util/styles";

import { StyledInput } from "./Input.styles";

interface Props extends CommonStyleProps {
    value?: string | number;
    disabled?: boolean;
    filter?: RegExp;
    onChange?: () => {};
    [key: string]: any;
}

const Input = forwardRef<HTMLInputElement, Props>(
    (
        {
            value,
            fontSize,
            disabled,
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
                margin={margin}
                ref={ref}
            />
        );
    }
);

export default Input;
