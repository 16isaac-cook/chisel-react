import styled from "styled-components";

import { commonStyles, CommonStyleProps } from "src/shared/util/styles";

export const StyledContainer = styled.div<CommonStyleProps>`
    display: flex;
    flex: 1 1 auto;
    ${commonStyles}
`;
