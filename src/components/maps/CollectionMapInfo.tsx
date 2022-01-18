import React from "react";
import "@esri/calcite-components/dist/components/calcite-link";
import { CalciteLink } from "@esri/calcite-components-react";
import styled from "styled-components";

const InfoContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin: -1rem;
  overflow: hidden;
`;

const InfoItem = styled.div`
  flex: 1 1 40vw;
  margin: 1rem;
`;

const SourceLink = styled.a`
  font-size: 0.7em;
  vertical-align: super;
`;

export default (): JSX.Element => (
  <>
    <h2 style={{ textAlign: "center", marginLeft: "-1rem", marginRight: "-1rem" }}>
      Marine Debris: If you see something, pick it up and/or let others know!
    </h2>
    <InfoContainer>
      <InfoItem>
        <p>
          According to National Ocean Service, marine debris is defined as any persistent solid
          material that is manufactured or processed and directly or indirectly, intentionally or
          unintentionally, disposed of or abandoned into the marine environment or the Great Lakes.
          There is no part of the world left untouched by debris and its impacts. It is one of the
          most widespread pollution problems facing the world's ocean and waterways.{"   "}
          <SourceLink
            as={CalciteLink}
            href="https://oceanservice.noaa.gov/hazards/marinedebris/"
            rel="noopener noreferrer"
            target="_blank"
          >
            source
          </SourceLink>
        </p>
        <p>
          This mapping application shows marine debris data points that we collected via ArcGIS
          Survey123. Click on the points to see further details (debris type, photo, etc.) in a
          pop-up. Click on other places on the map to see demographic data of the area (if they are
          available).
        </p>
      </InfoItem>
      <InfoItem>
        <div style={{ textAlign: "center" }}>
          <a href="https://arcg.is/1T8nfr0" rel="noopener noreferrer" target="_blank">
            <img
              alt="QR Code"
              height="150"
              src="/img/survey_QR_code.png"
              style={{ right: "0.5rem", top: "0.5rem" }}
              width="150"
            />
          </a>
          <p>
            <CalciteLink href="https://arcg.is/1T8nfr0" rel="noopener noreferrer" target="_blank">
              Make a Collection
            </CalciteLink>
          </p>
        </div>
      </InfoItem>
    </InfoContainer>
  </>
);
