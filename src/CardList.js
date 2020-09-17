import React from "react";
import Card from "./Card";


//  * this is just a rendering component, it takes whatever props it gets, maps over them and renders a Card component with a punch of props
//  * it has teh apply function as well which makes api calls based on where it comes from
function CardList({ cards = [], apply = () => null }) {
  return cards.length ? (
      <div className="CardList">
          {/* takes one job/company object at a time and send it to card */}
      {cards.map((cardData, idx) => (
        <Card
          item={cardData}
          key={idx}
          idx={idx}
          apply={apply}
        />
      ))}
    </div>
  ) : (
    <p className="lead">Sorry, no results were found!</p>
  );
}

export default CardList;
