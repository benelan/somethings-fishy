import React from "react";
import "@esri/calcite-components/dist/components/calcite-card";
import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/components/calcite-link";
import { CalciteCard, CalciteButton, CalciteLink } from "@esri/calcite-components-react";
import styled from "styled-components";

const BioCard: React.FC<{ card: any; onCardSelect: any }> = ({
  card,
  onCardSelect
}): JSX.Element => {
  const { id, title, description, imageUrl, link } = card;

  return (
    <div
      id={id}
      onClick={() => {
        onCardSelect(card);
      }}
      style={{ width: "280px" }}
    >
      <CalciteCard id={id} style={{ cursor: "pointer" }}>
        <span slot="title">{title}</span>
        <div slot="subtitle">{description}</div>
        <img alt={id} slot="thumbnail" src={process.env.PUBLIC_URL + `/img/${imageUrl}`} />
        <div slot="footer-leading">
          <CalciteButton icon-start="plus" scale="s" slot="footer-leading" />
        </div>
        <div slot="footer-trailing">
          <CalciteLink href={link} target="_blank">
            About the Species
          </CalciteLink>
        </div>
      </CalciteCard>
    </div>
  );
};

export default BioCard;
