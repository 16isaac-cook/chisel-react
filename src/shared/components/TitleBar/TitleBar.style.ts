import styled from "styled-components";

import { font } from "src/shared/util/styles";

interface Props {

}

export const StyledTitleBar = styled.div<Props>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0.3em;
    margin: 0.3em 0.3em 0em 0.3em;
    background-color: ${(props) => props.theme.mixed200};
    border-radius: 5px;
    flex: 1 0 auto;
    height: auto;
`;

export const TitleBarBackButton = styled.div`
    position: absolute;
    left: 0.6em;
    font-size: 20px;
`;

export const TitleBarTitle = styled.div`
    text-align: center;
    font-size: 20px;
`;