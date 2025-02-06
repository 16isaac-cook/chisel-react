import React from "react";
import { useNavigate, useParams } from "react-router";

import { PickerContainer, PickerButtonContainer } from "./ObjectPicker.styles";
import { builderObjects } from "src/screens/Quill/constants/builderObjects";
import Button from "src/shared/components/Button/Button";

const ObjectPicker: React.FC = () => {
    const navigate = useNavigate();
    const { worldId } = useParams<{ worldId: string }>();

    return (
        <PickerContainer>
            <PickerButtonContainer>
                {Object.entries(builderObjects).map(([obj, value]) => {
                    return (
                        <Button
                            variant="vertical"
                            icon={value.icon}
                            fontSize={"huge"}
                            iconSize={"giant"}
                            key={obj}
                            onClick={() => navigate(`${obj}`)}
                        >
                            {value.name}
                        </Button>
                    );
                })}
            </PickerButtonContainer>
        </PickerContainer>
    );
};

export default ObjectPicker;
