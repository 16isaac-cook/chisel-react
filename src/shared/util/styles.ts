import { css } from "styled-components";
import Color from "color";

import { IconName } from "../components/Icon/Icon";

//functions to modify the css of components quickly
export const modify = {
	darken: (colorVal: string, amount: number) =>
		Color(colorVal).darken(amount).string(),
	lighten: (colorVal: string, amount: number) =>
		Color(colorVal).lighten(amount).string(),
	rgba: (colorVal: string, opacity: number) =>
		Color(colorVal).alpha(opacity).string(),
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
	text: string;
	dim: string;
	error: string;
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
	dim: "#cacaca",
	error: "red",
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
		text: "#fff",
		dim: colors.dim,
		error: colors.error,
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
		text: "#000",
		dim: colors.dim,
		error: colors.error,
	},
};

export const clickable = {
	basic: css`
		cursor: pointer;
		user-select: none;
	`,
	normal: css`
		cursor: pointer;
		user-select: none;
		background-color: ${({ theme }) => theme.dark300};
		&:not(:disabled) {
			&:hover {
				background-color: ${({ theme }) => theme.dark400};
			}
			&:active {
				background-color: ${({ theme }) => theme.primary200};
			}
		}
	`,
	transparent: css`
		cursor: pointer;
		user-select: none;
		background-color: transparent;
		&:not(:disabled) {
			&:hover {
				background-color: ${({ theme }) => theme.dark400};
			}
			&:active {
				background-color: ${({ theme }) => theme.primary200};
			}
		}
	`,
	primary: css`
		cursor: pointer;
		user-select: none;
		background-color: ${({ theme }) => theme.primary300};
		&:not(:disabled) {
			&:hover {
				background-color: ${({ theme }) => theme.primary400};
			}
			&:active {
				background-color: ${({ theme }) => theme.primary200};
			}
		}
	`,
	link: css`
		cursor: pointer;
		user-select: none;
		color: ${({ theme }) => theme.primary300};
		background-color: transparent;
		&:not(:disabled) {
			&:hover {
				color: ${({ theme }) => theme.primary400};
			}
			&:active {
				color: ${({ theme }) => theme.primary200};
			}
		}
	`,
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

export const fontSizes: FontSizes = {
	tiny: "clamp(8px, 0.625vw, 12px);",
	small: "clamp(10px, 0.729vw, 14px);",
	normal: "clamp(12px, 0.833vw, 16px);",
	big: "clamp(14px, 1.25vw, 24px);",
	huge: "clamp(20px, 1.667vw, 32px);",
	giant: "clamp(28px, 2.5vw, 48px);",
};

export const font = {
	family: (font: FontName) => fontFamilies[font],
	size: (size: number | keyof FontSizes): string => {
		if (typeof size === "number") {
			return `${size}px;`;
		} else {
			return fontSizes[size];
		}
	},
};

type JustifyContent =
	| "center"
	| "flex-start"
	| "flex-end"
	| "space-between"
	| "space-around"
	| "space-evenly"
	| string;

type AlignItems =
	| "stretch"
	| "center"
	| "flex-start"
	| "flex-end"
	| "baseline"
	| string;

type PaddingMargin = boolean | number | string | (number | string)[];

const pxFormat = (value: number | string) =>
	typeof value === "number" ? `${value}px` : value;

const getPaddingMargin = (value: PaddingMargin) => {
	if (typeof value === "boolean") return value ? "0.3em" : 0;
	if (typeof value === "number" || typeof value === "string")
		return pxFormat(value);
	if (Array.isArray(value)) return value.map(pxFormat).join(" ");
	return null;
};

const getSideMargin = (value: boolean | string | number) => {
	if (typeof value === "boolean") return "0.3em";
	if (typeof value === "number" || typeof value === "string")
		return pxFormat(value);
	return null;
};

const getWideTall = (value: boolean | string | number) => {
	if (typeof value === "boolean" && value) return "100%";
	if (typeof value === "number" || typeof value === "string")
		return pxFormat(value);
	return null;
};

type BorderSides = Partial<
	Record<
		"top" | "right" | "bottom" | "left",
		string | keyof typeof colors | boolean
	>
>;

type Border = boolean | string | keyof typeof colors | BorderSides;

export interface CommonStyleProps {
	fontSize?: number | keyof typeof fontSizes;
	color?: keyof typeof colors | string;
	flex?: string;
	column?: boolean;
	justify?: JustifyContent;
	align?: AlignItems;
	padding?: PaddingMargin;
	margin?: PaddingMargin;
	top?: boolean | number | string;
	right?: boolean | number | string;
	bottom?: boolean | number | string;
	left?: boolean | number | string;
	background?: boolean | keyof typeof colors | string;
	wide?: boolean | string | number;
	tall?: boolean | string | number;
	overflowy?: "visible" | "hidden" | "clip" | "scroll" | "auto";
	overflowx?: "visible" | "hidden" | "clip" | "scroll" | "auto";
	italic?: boolean;
	bold?: boolean | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
	border?: Border;
}

export interface CommonStylePropsIcon extends CommonStyleProps {
	icon?: IconName;
	iconSize?: number | keyof typeof fontSizes;
}

export const commonStyles = css<CommonStyleProps>`
	${({ fontSize }) =>
		fontSize ? `font-size: ${font.size(fontSize)}` : "font-size: inherit"};
	${({ color, theme }) =>
		color
			? `color: ${color in colors ? theme[color] : color}`
			: "color: inherit"};
	${({ flex }) => (flex ? `flex: ${flex}` : null)};
	${({ column }) =>
		column ? "flex-direction: column" : "flex-direction: row"};
	${({ justify }) =>
		justify ? `justify-content: ${justify}` : "justify-content: center"};
	${({ align }) => (align ? `align-items: ${align}` : "align-items: center")};
	${({ padding }) =>
		padding ? `padding: ${getPaddingMargin(padding)}` : null};
	${({ margin }) => (margin ? `margin: ${getPaddingMargin(margin)}` : null)};
	${({ top }) => (top ? `margin-top: ${getSideMargin(top)}` : null)};
	${({ right }) => (right ? `margin-right: ${getSideMargin(right)}` : null)};
	${({ bottom }) =>
		bottom ? `margin-bottom: ${getSideMargin(bottom)}` : null};
	${({ left }) => (left ? `margin-left: ${getSideMargin(left)}` : null)};
	${({ background, theme }) => {
		if (typeof background === "boolean" && background)
			return `background-color: ${theme.dark100}`;
		if (typeof background === "string")
			return background in colors
				? `background-color: ${theme[background]}`
				: `background-color: ${background}`;
		return "background-color: transparent";
	}};
	${({ wide }) => (wide ? `width: ${getWideTall(wide)}` : null)};
	${({ tall }) => (tall ? `height: ${getWideTall(tall)}` : null)};
	${({ overflowy }) => (overflowy ? `overflow-y: ${overflowy}` : null)};
	${({ overflowx }) => (overflowx ? `overflow-x: ${overflowx}` : null)};
	${({ italic }) => (italic ? "font-style: italic" : null)};
	${({ bold }) => {
		if (typeof bold === "boolean" && bold) return "font-weight: bold";
		if (typeof bold === "number") return `font-weight: ${bold}`;
		return null;
	}};
	${({ border, theme }) => {
		if (typeof border === "boolean" && border) {
			return `border: 1px solid ${theme.text}`;
		}
		if (typeof border === "string")
			return border in colors
				? `border: 1px solid ${theme[border]}`
				: `border: ${border}`;
		if (typeof border === "object")
			return `
                ${
					typeof border.top === "boolean" && border.top
						? `border-top: 1px solid ${theme.text};`
						: typeof border.top === "string"
						? `border-top: ${
								border.top in colors
									? `1px solid ${theme[border.top]}`
									: border.top
						  };`
						: ""
				}
                ${
					typeof border.right === "boolean" && border.right
						? `border-right: 1px solid ${theme.text};`
						: typeof border.right === "string"
						? `border-right: ${
								border.right in colors
									? `1px solid ${theme[border.right]}`
									: border.right
						  };`
						: ""
				}
                ${
					typeof border.bottom === "boolean" && border.bottom
						? `border-bottom: 1px solid ${theme.text};`
						: typeof border.bottom === "string"
						? `border-bottom: ${
								border.bottom in colors
									? `1px solid ${theme[border.bottom]}`
									: border.bottom
						  };`
						: ""
				}
                ${
					typeof border.left === "boolean" && border.left
						? `border-left: 1px solid ${theme.text};`
						: typeof border.left === "string"
						? `border-left: ${
								border.left in colors
									? `1px solid ${theme[border.left]}`
									: border.left
						  };`
						: ""
				}
            `;
		return null;
	}};
	&:disabled {
		opacity: 0.6;
		cursor: default;
	}
`;
