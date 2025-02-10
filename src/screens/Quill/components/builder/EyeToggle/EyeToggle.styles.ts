import styled from "styled-components";

import {
	modify,
	clickable,
	commonStyles,
	CommonStyleProps,
} from "src/shared/util/styles";

export const StyledEye = styled.div<CommonStyleProps>`
	${clickable.basic}
	${commonStyles}
    color: ${({ theme }) => theme.text};
`;
