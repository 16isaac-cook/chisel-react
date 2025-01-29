import { useNavigate } from "react-router";

import Page from "src/shared/components/Page/Page";
import Button from "src/shared/components/Button/Button";
import { font } from "src/shared/util/styles";

const GMTools: React.FC = () => {
	const navigate = useNavigate();

	return (
		<Page title="GM Tools" home={true} back="/">
			<Button
				fontSize={font.size("big")}
				iconSize={font.size("giant")}
				variant="vertical"
				icon="quill"
				onClick={() => {
					navigate("/quill");
				}}
			>
				Quill
			</Button>
			<Button
				fontSize={font.size("big")}
				iconSize={font.size("giant")}
				variant="vertical"
				icon="hammer"
				onClick={() => {
					navigate("/hammer");
				}}
			>
				Hammer
			</Button>
		</Page>
	);
};

export default GMTools;
