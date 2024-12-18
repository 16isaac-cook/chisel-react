import styled from "styled-components";

import { modify } from "../../util/styles";

interface Props {
	$margin?: boolean;
	fontSize?: number;
}

export const StyledSwitch = styled.label<Props>`
	position: relative;
	display: inline-block;
	width: 2em;
	height: 1em;
	margin: ${(props) => (props.$margin ? `3px` : `0`)};
`;

export const SwitchContainer = styled.div`
	display: flex;
	flex-direction: row;
`;

export const SwitchLabel = styled.div<Props>`
	font-size: ${(props) =>
		props.fontSize === 0 ? `inherit` : `${props.fontSize}px`};
	margin-right: 0.3em;
`;

export const SwitchInput = styled.input`
	opacity: 0;
	width: 0;
	height: 0;
`;

export const SwitchSlider = styled.span`
	position: absolute;
	${modify.clickable}
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: ${(props) => props.theme.dark600};
	transition: 0.4s;
	border-radius: 34px;

	&::before {
		position: absolute;
		content: "";
		height: 0.75em;
		width: 0.75em;
		left: 0.125em;
		bottom: 0.125em;
		background-color: white;
		transition: 0.2s;
		border-radius: 50%;
	}

	input:checked + & {
		background-color: ${(props) => props.theme.primary300};
	}

	input:focus + & {
		box-shadow: 0 0 1px ${(props) => props.theme.primary300};
	}

	input:checked + &::before {
		transform: translateX(1em);
	}
`;
