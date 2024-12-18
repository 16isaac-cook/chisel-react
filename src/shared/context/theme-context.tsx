import { createContext, ReactNode, useContext, useState } from "react";

import { ThemeName } from "../util/styles";

interface ThemeContextType {
	theme: ThemeName;
	setTheme: (theme: ThemeName) => void;
	getThemeName: () => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeContextProviderProps {
	children: ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({
	children,
}) => {
	const [theme, setTheme] = useState<ThemeName>("dark");
	const getThemeName = () => {
		switch (theme) {
			case "dark":
				return "Dark";
			case "light":
				return "Light";
			default:
				return "ERROR";
		}
	};
	return (
		<ThemeContext.Provider value={{ theme, setTheme, getThemeName }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useThemeContext = (): ThemeContextType => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error(
			"useThemeContext must be used within a ThemeContextProvider"
		);
	}
	return context;
};
