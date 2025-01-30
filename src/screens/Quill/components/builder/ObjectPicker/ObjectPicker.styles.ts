import styled from "styled-components";

import { font } from "src/shared/util/styles";

export const PickerContainer = styled.div`
    flex: 1 1 0;
    padding: 0.3em;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    font-size: ${font.size("huge")};
    width: 100%;
`;

export const PickerButtonContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: auto;
    gap: 0.3em;
    justify-content: center;
    padding: 0.6em;
`;
