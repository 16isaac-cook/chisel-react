import { createContext, ReactNode, useContext, useState } from "react";

import { FontName } from "../util/styles";

interface FontContextType {
	font: FontName;
	setFont: (font: FontName) => void;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

interface FontContextProviderProps {
	children: ReactNode;
}

export const FontContextProvider: React.FC<FontContextProviderProps> = ({
	children,
}) => {
	const [font, setFont] = useState<FontName>("yantramanav");
	return (
		<FontContext.Provider value={{ font, setFont }}>
			{children}
		</FontContext.Provider>
	);
};

export const useFontContext = (): FontContextType => {
	const context = useContext(FontContext);
	if (!context) {
		throw new Error(
			"useFontContext must be used within a FontContextProvider"
		);
	}
	return context;
};
