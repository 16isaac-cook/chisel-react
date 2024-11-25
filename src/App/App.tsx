import React, { useState } from "react";
import { ThemeProvider } from "styled-components";

import Normalize from "./Normalize";
import UniversalStyles from "./UniversalStyles";
import Routes from "./Routes";
import "./Fonts.css";
import "remixicon/fonts/remixicon.css";
import { themes, ThemeName } from "src/shared/util/styles";
import {
	FontContextProvider,
	useFontContext,
} from "src/shared/context/font-context";

const App: React.FC = () => {
	const [theme, setTheme] = useState<ThemeName>("dark");
	const { font } = useFontContext();

	const changeTheme = (theme: ThemeName) => {
		setTheme(theme);
	};

	return (
		<ThemeProvider theme={themes[theme]}>
			<Normalize />
			<UniversalStyles font={font} />
			<Routes />
		</ThemeProvider>
	);
};

const AppWrapper: React.FC = () => {
	return (
		<FontContextProvider>
			<App />
		</FontContextProvider>
	);
};

export default AppWrapper;
