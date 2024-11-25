import { css } from "styled-components";
import Color from "color";

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
	mixed100: string;
	mixed200: string;
	mixed300: string;
	mixed400: string;
	mixed500: string;
	mixed600: string;
};

type Theme = {
	[key: string]: ColorScheme;
};

export type ThemeName = "dark" | "light";

export const themes: Theme = {
	dark: {
		primary100: "#6720bd",
		primary200: "#7b3cc5",
		primary300: "#8e55cd",
		primary400: "#9f6dd5",
		primary500: "#b085dc",
		primary600: "#c19ce3",
		dark100: "#121212",
		dark200: "#282828",
		dark300: "#3f3f3f",
		dark400: "#575757",
		dark500: "#717171",
		dark600: "#8b8b8b",
		mixed100: "#1c1621",
		mixed200: "#312b36",
		mixed300: "#47424c",
		mixed400: "#5f5a63",
		mixed500: "#78737b",
		mixed600: "#918d94",
	},
	light: {
		primary100: "#6720bd",
		primary200: "#7b3cc5",
		primary300: "#8e55cd",
		primary400: "#9f6dd5",
		primary500: "#b085dc",
		primary600: "#c19ce3",
		dark100: "#121212",
		dark200: "#282828",
		dark300: "#3f3f3f",
		dark400: "#575757",
		dark500: "#717171",
		dark600: "#8b8b8b",
		mixed100: "#1c1621",
		mixed200: "#312b36",
		mixed300: "#47424c",
		mixed400: "#5f5a63",
		mixed500: "#78737b",
		mixed600: "#918d94",
	},
};

export type FontName =
	| "roboto"
	| "saira"
	| "titillium"
	| "urbanist"
	| "yantramanav";

type Font = {
	[key in FontName]: string;
};

export const fontFamilies: Font = {
	roboto: "font-family: Roboto Condensed;",
	saira: "font-family: Saira;",
	titillium: "font-family: Titillium Web;",
	urbanist: "font-family: Urbanist;",
	yantramanav: "font-family: Yantramanav;",
};

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
		css`background-image: url("${imageURL}); background-position: 50% 50%; background-repeat: no-repeat; background-size: cover;`,
};
