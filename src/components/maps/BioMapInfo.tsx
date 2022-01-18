import React from "react";
import "@esri/calcite-components/dist/components/calcite-panel";
import { CalcitePanel } from "@esri/calcite-components-react";
import "./BioMap.css";
import styled from "styled-components";

const Panel = styled.div`
  width: 50%;
`;

export default (): JSX.Element => (
  <Panel as={CalcitePanel} heading="Shannon-Wiener Index">
    <div id="info-panel-content">
      <p className="p-math">
        `H = &#8212;<span className="span-math">&Sigma;</span>P<sub>i</sub> ln(P<sub>i</sub>)`
      </p>
      <p>
        <b>
          P<sub>i</sub>
        </b>{" "}
        - the proportion of individuals in a species
        <br />
        <b>H</b> - the index
      </p>
      <p>
        The <b>Shannon-Wiener Index</b> is a diversity index widely used to compare species
        diversity. This index is not meant to be a measurement of diversity, but a tool to compare
        diversity between one or more communities of species.
      </p>
    </div>
  </Panel>
);
