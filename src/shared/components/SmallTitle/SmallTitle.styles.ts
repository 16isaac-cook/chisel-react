import styled from "styled-components";

export const StyledTitle = styled.div`
    display: flex;
    flex: 0 1 0;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.dark200};
    padding: 0.3em;
    border: 0;
    border-radius: 5px;
    text-align: center;
    width: 100%;
    margin-bottom: 0.3em;
`;
