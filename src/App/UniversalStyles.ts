import { createGlobalStyle } from "styled-components";

import { font } from "../shared/util/styles";
import { FontName } from "../shared/util/styles";

export default createGlobalStyle<{ font: FontName }>`
    * {
        box-sizing: border-box;
        color: #fff;
        margin: 0;
        padding: 0;
    }

    body {
        background-color: ${(props) => props.theme.mixed100};
        ${font.size("normal")};
        ${(props) => (props.font ? font.family(props.font) : null)}
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
        width: 5px;
        z-index: 20;
    }
    ::-webkit-scrollbar-track {
        border-radius: 2.5px;
    }
    ::-webkit-scrollbar-thumb {
        background: ${(props) => props.theme.mixed400};
        border-radius: 2.5px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: ${(props) => props.theme.mixed300};
    } 
`;
