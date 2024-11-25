import React from "react";
import Panel from "src/shared/components/Panel/Panel";
import Button from "src/shared/components/Button/Button";
import Input from "src/shared/components/Input/Input";
import Link from "src/shared/components/Link/Link";
import Switch from "src/shared/components/Switch/Switch";
import Select from "src/shared/components/Select/Select";

const Home: React.FC = () => {
	return (
		<Panel title="testing">
			<Button>Test</Button>
			<Input />
			<Link>Test</Link>
			<Switch />
			<Select
				options={[
					{
						value: 1,
						label: "option 1",
					},
					{
						value: 2,
						label: "option 2",
					},
					{
						value: 3,
						label: "option 3",
					},
				]}
			/>
		</Panel>
	);
};

export default Home;
