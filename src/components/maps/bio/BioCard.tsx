import React from "react";
import "@esri/calcite-components/dist/components/calcite-card";
import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/components/calcite-link";
import { CalciteCard, CalciteButton, CalciteLink } from "@esri/calcite-components-react";
import styled from "styled-components";

const CardImage = styled.img`
  max-width: 250px;
  max-height: 300px;
`;

const BioCard: React.FC<{ card: any; onCardSelect: any }> = ({
  card,
  onCardSelect
}): JSX.Element => {
  const { id, title, description, imageUrl, link } = card;

  return (
    <CalciteCard
      id={id}
      onClick={() => {
        onCardSelect(card);
      }}
      style={{ cursor: "pointer", width: "350px" }}
    >
      <span slot="title">{title}</span>
      <div slot="subtitle">{description}</div>
      <CardImage alt={id} slot="thumbnail" src={process.env.PUBLIC_URL + `/img/${imageUrl}`} />
      <div slot="footer-leading">
        <CalciteButton icon-start="plus" scale="s" slot="footer-leading" />
      </div>
      <div slot="footer-trailing">
        <CalciteLink href={link} rel="noopener noreferrer" target="_blank">
          About the Species
        </CalciteLink>
      </div>
    </CalciteCard>
  );
};

export default BioCard;
