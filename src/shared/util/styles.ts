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
    font: string;
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
        font: "#fff",
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
        font: "#000",
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
        background-color: ${(props) => props.theme.dark300};
        &:not(:disabled) {
            &:hover {
                background-color: ${(props) => props.theme.dark400};
            }
            &:active {
                background-color: ${(props) => props.theme.primary200};
            }
        }
    `,
    transparent: css`
        cursor: pointer;
        user-select: none;
        background-color: transparent;
        &:not(:disabled) {
            &:hover {
                background-color: ${(props) => props.theme.dark400};
            }
            &:active {
                background-color: ${(props) => props.theme.primary200};
            }
        }
    `,
    primary: css`
        cursor: pointer;
        user-select: none;
        background-color: ${(props) => props.theme.primary300};
        &:not(:disabled) {
            &:hover {
                background-color: ${(props) => props.theme.primary400};
            }
            &:active {
                background-color: ${(props) => props.theme.primary200};
            }
        }
    `,
    link: css`
        cursor: pointer;
        user-select: none;
        color: ${(props) => props.theme.primary300};
        background-color: transparent;
        &:not(:disabled) {
            &:hover {
                color: ${(props) => props.theme.primary400};
            }
            &:active {
                color: ${(props) => props.theme.primary200};
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

type PaddingMargin =
    | boolean
    | number
    | string
    | [horizontal: number | string, vertical: number | string]
    | [
          top: number | string,
          right: number | string,
          bottom: number | string,
          left: number | string
      ];

const getPaddingMargin = (value: PaddingMargin) => {
    if (typeof value === "boolean") {
        return value ? "0.3em" : 0;
    } else if (typeof value === "number") {
        return `${value}px`;
    } else if (typeof value === "string") {
        return value;
    } else if (Array.isArray(value)) {
        if (value.length === 2) {
            return `${
                typeof value[0] === "number" ? `${value[0]}px` : value[0]
            } ${typeof value[1] === "number" ? `${value[1]}px` : value[1]}`;
        } else if (value.length === 4) {
            return `${
                typeof value[0] === "number" ? `${value[0]}px` : value[0]
            } ${typeof value[1] === "number" ? `${value[1]}px` : value[1]} ${
                typeof value[2] === "number" ? `${value[2]}px` : value[2]
            } ${typeof value[3] === "number" ? `${value[3]}px` : value[3]}`;
        } else {
            return 0;
        }
    } else {
        return 0;
    }
};

const getSideMargin = (value: boolean | string | number) => {
    if (typeof value === "boolean") {
        return "0.3em";
    } else if (typeof value === "string") {
        return value;
    } else if (typeof value === "number") {
        return `${value}px`;
    } else {
        return null;
    }
};

const getWideTall = (value: boolean | string | number) => {
    if (typeof value === "boolean") {
        return value ? "100%" : null;
    } else if (typeof value === "string") {
        return value;
    } else if (typeof value === "number") {
        return `${value}px`;
    } else {
        return null;
    }
};

export interface CommonStyleProps {
    fontSize?: number | keyof typeof fontSizes;
    color?: keyof typeof colors;
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
    background?: boolean | keyof typeof colors;
    wide?: boolean | string | number;
    tall?: boolean | string | number;
    overflowy?: "visible" | "hidden" | "clip" | "scroll" | "auto";
    overflowx?: "visible" | "hidden" | "clip" | "scroll" | "auto";
}

export interface CommonStylePropsIcon extends CommonStyleProps {
    icon?: IconName;
    iconSize?: number | keyof typeof fontSizes;
}

export const commonStyles = css<CommonStyleProps>`
    font-size: ${(props) =>
        props.fontSize ? font.size(props.fontSize) : "inherit"};
    color: ${(props) => (props.color ? props.theme[props.color] : "inherit")};
    flex: ${(props) => (props.flex ? props.flex : null)};
    flex-direction: ${(props) => (props.column ? "column" : "row")};
    justify-content: ${(props) => (props.justify ? props.justify : "center")};
    align-items: ${(props) => (props.align ? props.align : "center")};
    padding: ${(props) =>
        props.padding ? getPaddingMargin(props.padding) : null};
    margin: ${(props) =>
        props.margin ? getPaddingMargin(props.margin) : null};
    margin-top: ${(props) => (props.top ? getSideMargin(props.top) : null)};
    margin-right: ${(props) =>
        props.right ? getSideMargin(props.right) : null};
    margin-bottom: ${(props) =>
        props.bottom ? getSideMargin(props.bottom) : null};
    margin-left: ${(props) => (props.left ? getSideMargin(props.left) : null)};
    background-color: ${(props) => {
        if (typeof props.background === "boolean") {
            return props.background ? props.theme.dark100 : "transparent";
        } else if (typeof props.background === "string") {
            return props.background;
        } else {
            return "transparent";
        }
    }};
    width: ${(props) => (props.wide ? getWideTall(props.wide) : null)};
    height: ${(props) => (props.tall ? getWideTall(props.tall) : null)};
    overflow-y: ${(props) => (props.overflowy ? props.overflowy : null)};
    overflow-x: ${(props) => (props.overflowx ? props.overflowx : null)};
    &:disabled {
        opacity: 0.6;
        cursor: default;
    }
`;
