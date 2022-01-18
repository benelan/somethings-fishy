import React from "react";
import BioCard from "./BioCard";

const BioCardList: React.FC<{ cards: any; onCardSelect: any }> = ({
  cards,
  onCardSelect
}): JSX.Element => {
  const bioCards: any = cards.map((card: any) => {
    return <BioCard card={card} key={card.species} onCardSelect={onCardSelect} />;
  });

  return bioCards;
};

export default BioCardList;
