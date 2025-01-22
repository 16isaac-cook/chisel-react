import { css } from "styled-components";
import Color from "color";

//functions to modify the css of components quickly
export const modify = {
	darken: (colorVal: string, amount: number) =>
		Color(colorVal).darken(amount).string(),
	lighten: (colorVal: string, amount: number) =>
		Color(colorVal).lighten(amount).string(),
	rgba: (colorVal: string, opacity: number) =>
		Color(colorVal).alpha(opacity).string(),
	clickable: css`
		cursor: pointer;
		user-select: none;
	`,
	fill: css`
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	`,
	backgroundImage: (imageURL: string) =>
		css`
			background-image: url("${imageURL}); background-position: 50% 50%; background-repeat: no-repeat; background-size: cover;");
		`,
};

type ColorScheme = {
	primary100: string;
	primary200: string;
	primary300: string;
	primary400: string;
	primary500: string;
	primary600: string;
	dark100: string;
	dark200: string;
	dark300: string;
	dark400: string;
	dark500: string;
	dark600: string;
	font: string;
};

type Theme = {
	[key: string]: ColorScheme;
};

export type ThemeName = "dark" | "light";

const colors = {
	primary100: "#6720bd",
	primary200: "#7b3cc5",
	primary300: "#8e55cd",
	primary400: "#9f6dd5",
	primary500: "#b085dc",
	primary600: "#c19ce3",
	dark100: "#1c1621",
	dark200: "#312b36",
	dark300: "#47424c",
	dark400: "#5f5a63",
	dark500: "#78737b",
	dark600: "#918d94",
};

export const themes: Theme = {
	dark: {
		primary100: colors.primary100,
		primary200: colors.primary200,
		primary300: colors.primary300,
		primary400: colors.primary400,
		primary500: colors.primary500,
		primary600: colors.primary600,
		dark100: colors.dark100,
		dark200: colors.dark200,
		dark300: colors.dark300,
		dark400: colors.dark400,
		dark500: colors.dark500,
		dark600: colors.dark600,
		font: "#fff",
	},
	//gonna be honest, these values are just guess and check until I thought it looked nice
	light: {
		primary100: modify.darken(colors.primary100, 0.05),
		primary200: modify.darken(colors.primary200, 0.05),
		primary300: modify.darken(colors.primary300, 0.05),
		primary400: modify.darken(colors.primary400, 0.05),
		primary500: modify.darken(colors.primary500, 0.05),
		primary600: modify.darken(colors.primary600, 0.05),
		dark100: modify.lighten(colors.dark100, 3),
		dark200: modify.lighten(colors.dark200, 2.2),
		dark300: modify.lighten(colors.dark300, 2.2),
		dark400: modify.lighten(colors.dark400, 2.2),
		dark500: modify.lighten(colors.dark500, 2.2),
		dark600: modify.lighten(colors.dark600, 2.2),
		font: "#000",
	},
};

export type FontName =
	| "afacad"
	| "chakra"
	| "josefin"
	| "roboto"
	| "saira"
	| "titillium"
	| "urbanist"
	| "yantramanav";

type FontDisplayNames = {
	[key in FontName]: string;
};

export const fontDisplayNames: FontDisplayNames = {
	afacad: "Afacad Flux",
	chakra: "Chakra Petch",
	josefin: "Josefin Sans",
	roboto: "Roboto Condensed",
	saira: "Saira",
	titillium: "Titillium Web",
	urbanist: "Urbanist",
	yantramanav: "Yantramanav",
};

export const isFont = (value: unknown): value is FontName => {
	return typeof value === "string" && value !== null;
};

export const fontFamilies: { [key in FontName]: string } = Object.fromEntries(
	(Object.keys(fontDisplayNames) as FontName[]).map((key) => [
		key,
		`font-family: ${fontDisplayNames[key]};`,
	])
) as { [key in FontName]: string };

type FontSizes = {
	tiny: string;
	small: string;
	normal: string;
	big: string;
	huge: string;
	giant: string;
};

const fontSizes: FontSizes = {
	tiny: "font-size: 12px;",
	small: "font-size: 14px;",
	normal: "font-size: 16px;",
	big: "font-size: 24px;",
	huge: "font-size: 32px;",
	giant: "font-size: 48px;",
};

export const font = {
	family: (font: FontName) => fontFamilies[font],
	size: (size: number | keyof FontSizes): string => {
		if (typeof size === "number") {
			return `font-size: ${size}px;`;
		} else {
			return fontSizes[size];
		}
	},
};
