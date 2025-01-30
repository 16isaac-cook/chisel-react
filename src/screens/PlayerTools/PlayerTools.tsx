import { useNavigate } from "react-router";

import Page from "src/shared/components/Page/Page";
import Button from "src/shared/components/Button/Button";
import { font } from "src/shared/util/styles";

const PlayerTools: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Page title="Player Tools" home={true} back="/">
            <Button
                fontSize={font.size("big")}
                iconSize={font.size("giant")}
                variant="vertical"
                icon="scroll"
                onClick={() => {
                    navigate("/scroll");
                }}
            >
                Scroll
            </Button>
        </Page>
    );
};

export default PlayerTools;
