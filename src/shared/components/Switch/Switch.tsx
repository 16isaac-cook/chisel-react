import { forwardRef, useState } from "react";
import { StyledSwitch, SwitchInput, SwitchSlider } from "./Switch.styles";

interface Props {
	defaultChecked?: boolean;
	onChecked?: (checked: boolean) => void;
}

const Switch = forwardRef<HTMLInputElement, Props>(
	({ defaultChecked = false, onChecked }, ref) => {
		const [checked, setChecked] = useState(defaultChecked);

		const handleChange = () => {
			const newChecked = !checked;
			setChecked(newChecked);
			if (onChecked) {
				onChecked(newChecked);
			}
		};

		return (
			<StyledSwitch>
				<SwitchInput
					type="checkbox"
					ref={ref}
					checked={checked}
					onChange={handleChange}
				/>
				<SwitchSlider />
			</StyledSwitch>
		);
	}
);

export default Switch;
