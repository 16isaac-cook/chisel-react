import styled from "styled-components";

import { font } from "src/shared/util/styles";

export const StyledPopup = styled.form`
    padding: 0.6em;
    font-size: ${font.size("big")};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background-color: ${(props) => props.theme.dark200};
`;
