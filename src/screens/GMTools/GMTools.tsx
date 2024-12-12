import { useNavigate } from "react-router";

import Page from "src/shared/components/Page/Page";
import Button from "src/shared/components/Button/Button";

const GMTools: React.FC = () => {
	const navigate = useNavigate();

	return (
		<Page title="GM Tools" home={true} back="/">
			<Button
				fontSize={20}
				iconSize={48}
				variant="vertical"
				icon="quill"
				onClick={() => {
					navigate("/quill");
				}}
			>
				Quill
			</Button>
			<Button
				fontSize={20}
				iconSize={48}
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
