import { forwardRef, useState } from "react";

import { fontSizes } from "src/shared/util/styles";

import {
    StyledSwitch,
    SwitchInput,
    SwitchSlider,
    SwitchLabel,
    SwitchContainer,
} from "./Switch.styles";

interface Props {
    defaultChecked?: boolean;
    margin?: boolean;
    label?: string;
    fontSize?: number | keyof typeof fontSizes;
    onChecked?: (checked: boolean) => void;
}

const Switch = forwardRef<HTMLInputElement, Props>(
    (
        {
            defaultChecked = false,
            margin = true,
            label,
            fontSize = 0,
            onChecked,
        },
        ref
    ) => {
        const [checked, setChecked] = useState(defaultChecked);

        const handleChange = () => {
            const newChecked = !checked;
            setChecked(newChecked);
            if (onChecked) {
                onChecked(newChecked);
            }
        };

        return (
            <SwitchContainer>
                {label && (
                    <SwitchLabel fontSize={fontSize}>{label}</SwitchLabel>
                )}
                <StyledSwitch $margin={margin}>
                    <SwitchInput
                        type="checkbox"
                        ref={ref}
                        checked={checked}
                        onChange={handleChange}
                    />
                    <SwitchSlider />
                </StyledSwitch>
            </SwitchContainer>
        );
    }
);

export default Switch;
