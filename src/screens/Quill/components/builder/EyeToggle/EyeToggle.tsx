import { useState } from "react";

import { CommonStylePropsIcon } from "src/shared/util/styles";

import { StyledEye } from "./EyeToggle.styles";
import Icon from "src/shared/components/Icon/Icon";

interface Props extends CommonStylePropsIcon {
	value: boolean;
	onChange: (value: boolean) => void;
}

const EyeToggle: React.FC<Props> = ({ value, onChange }) => {
	return (
		<StyledEye onClick={() => onChange(!value)}>
			{value ? (
				<Icon left icon="eyeOpen" />
			) : (
				<Icon left icon="eyeClosed" />
			)}
		</StyledEye>
	);
};

export default EyeToggle;
