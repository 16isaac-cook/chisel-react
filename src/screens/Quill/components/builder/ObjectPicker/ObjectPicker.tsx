import React from "react";

import { font } from "src/shared/util/styles";

import {
	PickerContainer,
	PickerButtonContainer,
	PickerButton,
	PickerIconContainer,
} from "./ObjectPicker.styles";
import { builderObjects } from "src/screens/Quill/constants/builderObjects";
import Label from "src/shared/components/Label/Label";
import Button from "src/shared/components/Button/Button";

const ObjectPicker: React.FC = () => {
	return (
		<PickerContainer>
			<PickerButtonContainer>
				<Button
					variant="vertical"
					icon="conflict"
					fontSize={font.size("huge")}
					iconSize={font.size("giant")}
				>
					Test
				</Button>
			</PickerButtonContainer>
		</PickerContainer>
	);
};

export default ObjectPicker;
