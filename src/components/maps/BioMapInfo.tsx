import React from "react";
import "@esri/calcite-components/dist/components/calcite-panel";
import { CalcitePanel } from "@esri/calcite-components-react";
import "./BioMap.css";
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

const StepsImg = styled.img`
  max-height: 100%;
  max-width: 100%;
`;

export default (): JSX.Element => (
  <InfoContainer>
    <div style={{ textAlign: "center" }}>
      <h2>The Importance of Preserving Biodiversity in our Oceans</h2>
      <p>
        <b>
          <i>
            Biodiversity (Biological Diversity) is used to describe the variety of life (species
            diversity) in a specific area.
          </i>
        </b>
      </p>
      <p>
        Species diversity refers to animals, humans, plants, fungi, and microorganisms. These
        organisms are dependent on one another to survive and flourish. Biological diversity can
        also be separated into genetic diversity, which is the measure of the amount of inherited
        variability contained within a population’s species (Cofrin Center for Biodiversity). In
        this section we will focus on species diversity, how to measure it, and the current negative
        impacts of human interactions.
      </p>
    </div>
    <InfoItem>
      <h3>
        <b>Human Pressures</b>
      </h3>
      <p>
        The World Wildlife Fund’s (WWF) study in 2018 found that an average of 60% decline in global
        populations of birds, reptiles, fish, mammals, and amphibians since 1970. More than a third
        of the world’s land surface and about 75% of freshwater is used for crop or livestock
        production (Hancock, L.). Overfishing, deforestation, and water pollution are all human
        caused factors that are significantly impacting biodiversity around the world. The Natural
        Resources Defense Council (NRDC) published an article in 2019 detailing that overfishing in
        the ocean had the single greatest impact on biodiversity in the last 50 years. It is
        important that sustainable fishing and food production is taken seriously.
      </p>
    </InfoItem>
    <InfoItem>
      <h3>
        <b>Measuring Biodiversity</b>
      </h3>
      <p>
        Measuring biodiversity comes down to species richness and evenness. Richness is a measure of
        how many organisms exist in a specific area. Evenness measures the number of species and the
        relative abundance of species in a specific area or community. Measuring biodiversity can
        become very complex and difficult to accurately measure. Therefore, scientists rely on using
        an index based on the abundance of species that returns a single number to represent both
        richness and abundance. Using an index makes it easier to compare diversity among two or
        more communities of species.
      </p>
    </InfoItem>
    <InfoItem>
      <h3>
        <b>Shannon-Wiener Diversity Index</b>
      </h3>
      <p>
        The Shannon-Wiener Index is one of the most widely used indices. It is used to measure and
        compare species evenness, or the relative abundance of species. The following is the Shannon
        Index formula:
      </p>
      <p>
        If H = 0, then this means the community only has one species. There is no diversity because
        all the living organism in the community belong to the same species. The higher the value of
        H, the more diverse the community is (webpages.uidaho.edu).
      </p>
    </InfoItem>
    <InfoItem as={CalcitePanel} heading="Shannon-Wiener Index">
      <div id="info-panel-content">
        <p className="p-math">
          H = &#8212;<span className="span-math">&Sigma;</span>P<sub>i</sub> ln(P<sub>i</sub>)
        </p>
        <p>
          <b>
            P<sub>i</sub>
          </b>{" "}
          - the proportion of individuals in a species
          <br />
          <b>H</b> - the index
        </p>
      </div>
    </InfoItem>

    <InfoItem>
      <h3>
        <b>Education</b>
      </h3>
      <p>
        Maintaining high levels of Biodiversity on Earth is important for the future of the planet,
        and sustainability is key to doing this. Another key factor is education. Educating the
        current and next generations will help bring awareness and help avoid some of the current
        and past mistakes. The Shannon-Wiener Index Comparison application below is an example of
        content we can create in order to help educate and bring awareness to the ocean
        sustainability goal.
      </p>
    </InfoItem>

    <InfoItem>
      <h3>
        <b>Shannon-Wiener Index Comparison App</b>
      </h3>
      <p>
        The app below allows users to measure and compare species diversity with the Shannon-Wiener
        Index formula. The app is simple and easy to use and helps illustrate some of the work
        scientists do when comparing species diversity. It is intended to allow the user to feel
        like they are scientists on the field comparing species evenness. The app also has some
        great information on actual species in the Gulf of Mexico with links to the{" "}
        <a href="https://www.noaa.gov/" rel="noopener noreferrer" target="_blank">
          NOAA
        </a>{" "}
        site. It allows users to add more living organism onto the map with some editing features.
      </p>
    </InfoItem>
    <InfoItem>
      <h3>
        <b>How to use the App</b>
      </h3>
      <ol>
        <li>
          <p>Click on the area button to start drawing your first area of interest.</p>
        </li>
        <li>
          <p>
            Draw an area around the species you would like to use as your first community to
            compare.
          </p>
        </li>
        <li>
          <p>
            After drawing the first area, click on the area button to draw an area around the second
            community of species you would like to compare the first community with.
          </p>
        </li>
        <li>
          <p>Once the second area is drawn, you will see the results!</p>
        </li>
        <li>
          <p>
            The Shannon Index numbers for both communities will be shown, along with screen captures
            of the area you selected.
          </p>
        </li>
        <li>
          <p>
            Click on the trash button to clear the areas and start drawing another two areas of
            interest if you would like to compare another two communities.
          </p>
        </li>
        <li>
          <p>
            You can click on the animal images on the right to start adding new points on the map!
          </p>
        </li>
      </ol>
    </InfoItem>
    <InfoItem>
      <h3>
        <b>Biodiversity App Demo</b>
      </h3>
      <StepsImg src={process.env.PUBLIC_URL + "/img/biodiversity-app-steps.gif"} />
    </InfoItem>
  </InfoContainer>
);
