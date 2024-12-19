import React from "react";

import { fontDisplayNames, isFont } from "src/shared/util/styles";

import { SettingsCover, StyledSettingsPanel } from "./SettingsPanel.styles";
import { useThemeContext } from "src/shared/context/theme-context";
import { useFontContext } from "src/shared/context/font-context";
import Label from "../Label/Label";
import Select from "../Select/Select";

interface PanelProps {
	panelVisible: boolean;
	onClick: () => void;
}

const SettingsPanel: React.FC<PanelProps> = ({ panelVisible, onClick }) => {
	const themeCtx = useThemeContext();
	const fontCtx = useFontContext();
	return (
		<div>
			<SettingsCover $panelVisible={panelVisible} onClick={onClick} />
			<StyledSettingsPanel $panelVisible={panelVisible}>
				<Label style={{ margin: "0.3em 0" }}>Settings</Label>

				<Label style={{ justifyContent: "left", marginLeft: "0.3em" }}>
					Select a Theme:
				</Label>
				<Select
					options={[
						{ value: "dark", label: "Dark" },
						{ value: "light", label: "Light" },
					]}
					placeholder={themeCtx.getThemeName()}
					onChange={(value) =>
						value === "dark" || value === "light"
							? themeCtx.setTheme(value)
							: null
					}
				/>

				<Label style={{ justifyContent: "left", marginLeft: "0.3em" }}>
					Select a Font:
				</Label>
				<Select
					options={Object.entries(fontDisplayNames).map(
						([key, value]) => ({
							value: key,
							label: value,
						})
					)}
					placeholder={fontCtx.getFontName()}
					onChange={(value) =>
						isFont(value) ? fontCtx.setFont(value) : null
					}
				/>
			</StyledSettingsPanel>
		</div>
	);
};

export default SettingsPanel;
