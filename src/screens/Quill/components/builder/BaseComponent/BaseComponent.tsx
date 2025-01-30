import React, { useState } from "react";

import { WorldObject } from "src/screens/Quill/types/quill.types";

interface ComponentProps {}

const BuilderBaseComponent: React.FC<ComponentProps> = () => {
    const [objectData, setObjectData] = useState({});
    return <div></div>;
};

export default BuilderBaseComponent;
