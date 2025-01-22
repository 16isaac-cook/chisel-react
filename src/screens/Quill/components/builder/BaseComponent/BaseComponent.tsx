import React, { useState } from "react";

import { builderObjects } from "src/screens/Quill/constants/builderObjects";

interface ComponentProps {}

interface ObjectDataProps {
	type: keyof typeof builderObjects;
	title: string;
	desc: string;
	autoLink: boolean;
	gmNotes: string;
}

const BuilderBaseComponent: React.FC<ComponentProps> = () => {
	const [objectData, setObjectData] = useState({});
	return <div></div>;
};

export default BuilderBaseComponent;
