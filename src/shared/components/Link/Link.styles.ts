import styled from "styled-components";

import { clickable, commonStyles, CommonStyleProps } from "../../util/styles";

export const StyledLink = styled.button<CommonStyleProps>`
    display: flex;
    flex: 0 1 0;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 0;
    padding: 0;
    ${commonStyles}
    ${clickable.link};
`;
