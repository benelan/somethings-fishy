import React from "react";
import "@esri/calcite-components/dist/components/calcite-card";
import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/components/calcite-modal";

import { CalciteCard, CalciteModal } from "@esri/calcite-components-react";
import styled from "styled-components";

const CardImage = styled.img`
  max-width: 150px;
  max-height: 100px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
`;

const ScreenshotModal: React.FC<{ id: string }> = ({ id }): JSX.Element => {
  return (
    <CalciteModal aria-labelledby="modal-title" id={id} scale="s">
      <div id="modal-title" slot="header">
        <span id="resultsSpan" />
      </div>
      <CardContainer id="screenshotDiv" slot="content">
        <CalciteCard style={{ width: "200px" }}>
          <CardImage alt="community1" id="img1" slot="thumbnail" />
          <h3 slot="title">
            Diversity Index: <span id="indexDiv1" />
          </h3>
          <span slot="subtitle">Community 1</span>
        </CalciteCard>
        <CalciteCard style={{ width: "200px" }}>
          <CardImage alt="community2" id="img2" slot="thumbnail" />
          <h3 slot="title">
            Diversity Index: <span id="indexDiv2" />
          </h3>
          <span slot="subtitle">Community 2</span>
        </CalciteCard>
      </CardContainer>
    </CalciteModal>
  );
};

export default ScreenshotModal;
