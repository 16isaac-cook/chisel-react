import { useNavigate } from "react-router";

import Page from "src/shared/components/Page/Page";
import Button from "src/shared/components/Button/Button";

const PlayerTools: React.FC = () => {
	const navigate = useNavigate();

	return (
		<Page title="Player Tools" home={true} back="/">
			<Button
				fontSize={20}
				iconSize={48}
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
