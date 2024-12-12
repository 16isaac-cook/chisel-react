import styled from "styled-components";

interface Props {
	className?: string;
	size?: number;
	$right?: boolean;
}

export const StyledIcon = styled.i<Props>`
	font-size: ${(props) =>
		props.size === 0 ? `inherit;` : `${props.size}px;`};
	color: ${(props) => `${props.color};`};
	${(props) => (props.$right ? `margin-right: 0.3em;` : "")}
`;
