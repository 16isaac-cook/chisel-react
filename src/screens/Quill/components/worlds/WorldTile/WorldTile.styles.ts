import styled from "styled-components";

import { modify, font } from "src/shared/util/styles";

export const StyledWorldTile = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	background-color: ${(props) => props.theme.dark300};
	width: fit-content;
	min-width: 18%;
	min-height: 28%;
	max-width: 18%;
	max-height: 28%;
	border-radius: 0.3em;
	margin-bottom: 0.6em;
	${modify.clickable};
	&:hover {
		background-color: ${(props) => props.theme.dark400};
	}
	&:active {
		background-color: ${(props) => props.theme.primary300};
	}

	&:hover img {
		transform: scale(1.2, 1.2) translateY(-40%);
	}
	&:active img {
		transform: scale(1, 1) translateY(-50%);
	}
`;

export const TileImageBox = styled.div`
	width: 100%;
	border-radius: 0.3em 0.3em 0 0;
	overflow: hidden;
	position: relative;
	pointer-events: none;
	flex: 1 1 0;
	background-color: ${(props) => modify.lighten(props.theme.dark300, 0.2)};
`;

export const TileImage = styled.img`
	width: 100%;
	height: auto;
	display: block;
	position: relative;
	top: 50%;
	transform: scale(1, 1) translateY(-50%);
	transition: transform 0.5s;
`;

export const TileFooter = styled.div`
	width: 100%;
	padding: 0.3em;
	pointer-events: none;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	${font.size("big")}
`;
