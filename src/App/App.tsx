import React, { useState } from "react";
import { ThemeProvider, StyleSheetManager } from "styled-components";

import Normalize from "./Normalize";
import UniversalStyles from "./UniversalStyles";
import Routes from "./Routes";
import "./Fonts.css";
import "remixicon/fonts/remixicon.css";
import { themes } from "src/shared/util/styles";
import { TauriContextProvider } from "src/shared/context/tauri-context";
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

const shouldForwardProp = (prop: string) =>
	![
		"column",
		"padding",
		"margin",
		"top",
		"right",
		"bottom",
		"left",
		"background",
		"wide",
		"tall",
		"italic",
		"bold",
		"border",
	].includes(prop);

const AppWrapper: React.FC = () => {
	return (
		<TauriContextProvider>
			<ThemeContextProvider>
				<FontContextProvider>
					<StyleSheetManager shouldForwardProp={shouldForwardProp}>
						<App />
					</StyleSheetManager>
				</FontContextProvider>
			</ThemeContextProvider>
		</TauriContextProvider>
	);
};

export default AppWrapper;
