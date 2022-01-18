import styled from "styled-components";

export const CardDeck = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  overflow-x: hidden;
  margin: -1rem;

  & > * {
    flex: 1 1 30vw;
    margin: 1rem;
    --calcite-font-size--2: 1em;
    --calcite-font-size--1: 1.3em;
  }
`;

export const Card = styled.div`
  height: 100%;
`;

export const SourceLink = styled.a`
  font-size: 0.7em;
  vertical-align: super;
`;

export const StepsImg = styled.img`
  max-height: 100%;
  max-width: 100%;
`;

export const MapDiv = styled.div`
  padding: 0;
  margin: 0;
  height: 95%;
  width: 100%;
`;
