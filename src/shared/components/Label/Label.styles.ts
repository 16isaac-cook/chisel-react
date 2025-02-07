import styled from "styled-components";

import { commonStyles, CommonStyleProps } from "src/shared/util/styles";

interface LabelProps extends CommonStyleProps {
    $center?: boolean;
}

export const StyledLabel = styled.div<LabelProps>`
    display: flex;
    flex: 0 1 0;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    ${commonStyles}
    ${(props) => (props.$center ? `text-align: center` : null)};
`;
