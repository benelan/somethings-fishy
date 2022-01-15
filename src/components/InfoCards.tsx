import React from "react";
import "@esri/calcite-components/dist/components/calcite-card";
import { CalciteCard } from "@esri/calcite-components-react";
import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  overflow-x: hidden;
  margin: -1rem;

  & > * {
    flex: 1 1 300px;
    margin: 1rem;
  }
`;

const Card = styled.div`
  height: 100%;
`;

const Introduction: React.FC = (): JSX.Element => (
  <CardContainer>
    <div>
      <Card as={CalciteCard}>
        <h3 slot="title">Lorem ipsum</h3>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Card>
    </div>
    <div>
      <Card as={CalciteCard}>
        <h3 slot="title">Lorem ipsum </h3>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Neque ornare aenean euismod elementum nisi quis eleifend quam
        adipiscing. Quam nulla porttitor massa id neque aliquam. Diam quis enim lobortis scelerisque
        fermentum dui faucibus. Massa tempor nec feugiat nisl pretium fusce. Integer quis auctor
        elit sed vulputate mi sit. Sed felis eget velit aliquet sagittis id.
      </Card>
    </div>
    <div>
      <Card as={CalciteCard}>
        <h3 slot="title">Lorem ipsum </h3>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Facilisis sed odio morbi quis commodo odio aenean sed. Nibh
        nisl condimentum id venenatis. Penatibus et magnis dis parturient. Lectus arcu bibendum at
        varius vel pharetra vel turpis nunc. Vestibulum mattis ullamcorper velit sed ullamcorper.
        Ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Sem et tortor
        consequat id porta nibh venenatis cras.
      </Card>
    </div>
    <div>
      <Card as={CalciteCard}>
        <h3 slot="title">Lorem ipsum </h3>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Sed tempus urna et pharetra pharetra massa massa ultricies.
        Feugiat pretium nibh ipsum consequat. Cursus risus at ultrices mi tempus imperdiet nulla
        malesuada. Donec massa sapien faucibus et. Ligula ullamcorper malesuada proin libero nunc
        consequat interdum varius sit. At erat pellentesque adipiscing commodo elit at. Dolor sed
        viverra ipsum nunc aliquet bibendum enim facilisis gravida. Elit at imperdiet dui accumsan
        sit amet nulla facilisi. Semper auctor neque vitae tempus quam pellentesque nec. Arcu cursus
        euismod quis viverra nibh cras pulvinar mattis. Facilisis leo vel fringilla est ullamcorper
        eget nulla. Eget sit amet tellus cras adipiscing enim eu turpis.
      </Card>
    </div>
  </CardContainer>
);

export default Introduction;
