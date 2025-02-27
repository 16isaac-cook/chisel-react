import { forwardRef, useState } from "react";

import { CommonStyleProps } from "src/shared/util/styles";

import {
	StyledSwitch,
	SwitchInput,
	SwitchSlider,
	SwitchLabel,
	SwitchContainer,
} from "./Switch.styles";

interface Props extends CommonStyleProps {
	defaultChecked?: boolean;
	label?: string;
	onChecked?: (checked: boolean) => void;
	[key: string]: any;
}

const Switch = forwardRef<HTMLInputElement, Props>(
	(
		{
			defaultChecked = false,
			margin = true,
			label,
			fontSize,
			onChecked,
			...otherProps
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
			<SwitchContainer margin={margin} {...otherProps}>
				{label && (
					<SwitchLabel fontSize={fontSize}>{label}</SwitchLabel>
				)}
				<StyledSwitch>
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
