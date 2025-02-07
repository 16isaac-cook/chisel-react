import styled from "styled-components";

import { font, commonStyles, CommonStyleProps } from "src/shared/util/styles";

export const StyledPanel = styled.div<CommonStyleProps>`
    display: flex;
    flex: 1 1 auto;
    align-items: center;
    padding: 0.3em;
    border: 0;
    border-radius: 5px;
    ${commonStyles}
    background-color: ${(props) => props.theme.dark200};
    width: ${(props) => (props.column ? `100%` : null)};
`;

export const StyledPanelTitle = styled.div`
    text-align: center;
    font-size: ${font.size("small")};
    color: ${(props) => props.theme.dark600};
    margin-bottom: 0.3em;
`;
