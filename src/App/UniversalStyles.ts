import { createGlobalStyle } from "styled-components";

import { font } from "../shared/util/styles";
import { FontName } from "../shared/util/styles";

export default createGlobalStyle<{ font: FontName }>`
    * {
        box-sizing: border-box;
        color: ${(props) => props.theme.text};
        margin: 0;
        padding: 0;
        font-size: inherit;
    }

    body {
        background-color: ${(props) => props.theme.dark100};
        font-size: ${font.size("normal")};
        ${(props) => (props.font ? font.family(props.font) : null)}
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }

    #root {
        display: flex;
        height: 100%;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    ul {
        list-style: none;
    }

    h1, h2, h3, h4, h5, h6, strong {
        font-weight: bold;
    }

    ::-webkit-scrollbar {
        width: 10px;
        z-index: 20;
    }
    ::-webkit-scrollbar-track {
        background: transparent;
    }
    ::-webkit-scrollbar-thumb {
        background: ${(props) => props.theme.dark400};
        border-radius: 4px;
        border-left: 2px solid transparent;
        border-right: 2px solid transparent;
        background-clip: padding-box;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: ${(props) => props.theme.dark500};
        border-radius: 4px;
        border-left: 2px solid transparent;
        border-right: 2px solid transparent;
        background-clip: padding-box;
    } 
    ::-webkit-scrollbar-thumb:active {
        background: ${(props) => props.theme.dark400};
        border-radius: 4px;
        border-left: 2px solid transparent;
        border-right: 2px solid transparent;
        background-clip: padding-box;
    }
`;
