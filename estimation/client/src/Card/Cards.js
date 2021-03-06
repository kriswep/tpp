import React, { useState } from 'react';

import Card from './Card';
import Text from '../components/Text';
// let isSelecting = false;
const Cards = ({ id, send }) => {
  const [cards, setCards] = useState([
    // { idx: 1, value: 0, selected: false, choosen: false },
    // { idx: 2, value: 0.5, selected: false, choosen: false },
    { idx: 1, value: 1, selected: false, choosen: false },
    { idx: 2, value: 2, selected: false, choosen: false },
    { idx: 3, value: 3, selected: false, choosen: false },
    { idx: 4, value: 5, selected: false, choosen: false },
    { idx: 5, value: 8, selected: false, choosen: false },
    { idx: 6, value: 13, selected: false, choosen: false },
    { idx: 7, value: 21, selected: false, choosen: false },
    // { idx: 10, value: 40, selected: false, choosen: false },
    // { idx: 11, value: 100, selected: false, choosen: false },
  ]);

  const [double, setDouble] = useState(false);
  const select = e => {
    const newCards = cards.map(current => {
      const newCard = { ...current };
      if (current.idx === parseInt(e.target.dataset.idx)) {
        if (newCard.selected) {
          newCard.choosen = true;
          // send choosen card to the world (aka to host)
          setDouble(true);
          send(JSON.stringify({ type: 'card', card: newCard, id }));
        } else {
          newCard.selected = true;
          send(JSON.stringify({ type: 'card', card: newCard, id }));
        }
      } else {
        newCard.selected = false;
      }

      return newCard;
    });
    setCards(newCards);
  };

  const choosenCard = cards.filter(card => {
    return card.choosen;
  })[0];

  return (
    <>
      {cards.map(card => {
        let pose = 'init';
        if (card.selected) {
          pose = 'selected';
        }
        if (choosenCard) {
          pose = 'hidden';
          // every card is hidden, except the choosen one
          if (card.idx === choosenCard.idx) {
            pose = 'choosen';
          }
        }
        let labelText;
        if (card.value === 1) {
          labelText = `${card.value} point`;
        } else {
          labelText = `${card.value} points`;
        }
        if (card.selected) {
          labelText = `Pick ${labelText}!`;
        }
        return (
          <Card
            data-idx={card.idx}
            key={card.idx}
            idx={card.idx}
            pose={pose}
            setPose={pose}
            // disabled={isSelecting}
            disabled={double}
            // onTouchStart={select}
            // onMouseDown={select}
            onClick={select}
            aria-label={labelText}
          >
            <Text invert>{card.value}</Text>
          </Card>
        );
      })}
    </>
  );
};

export default Cards;
