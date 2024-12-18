import React, { useState } from "react";
import { ThemeProvider } from "styled-components";

import Normalize from "./Normalize";
import UniversalStyles from "./UniversalStyles";
import Routes from "./Routes";
import "./Fonts.css";
import "remixicon/fonts/remixicon.css";
import { themes } from "src/shared/util/styles";
import {
	ThemeContextProvider,
	useThemeContext,
} from "src/shared/context/theme-context";
import {
	FontContextProvider,
	useFontContext,
} from "src/shared/context/font-context";

const App: React.FC = () => {
	const { theme } = useThemeContext();
	const { font } = useFontContext();

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
		<ThemeContextProvider>
			<FontContextProvider>
				<App />
			</FontContextProvider>
		</ThemeContextProvider>
	);
};

export default AppWrapper;
