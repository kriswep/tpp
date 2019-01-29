import React, { useState } from 'react';

import Card from './Card';
import Text from '../components/Text';

const Cards = () => {
  const [cards, setCards] = useState([
    { idx: 1, value: 0, selected: false, choosen: false },
    { idx: 2, value: 0.5, selected: false, choosen: false },
    { idx: 3, value: 1, selected: false, choosen: false },
    { idx: 4, value: 2, selected: false, choosen: false },
    { idx: 5, value: 3, selected: false, choosen: false },
    { idx: 6, value: 5, selected: false, choosen: false },
    { idx: 7, value: 8, selected: false, choosen: false },
    { idx: 8, value: 13, selected: false, choosen: false },
    { idx: 9, value: 20, selected: false, choosen: false },
    { idx: 10, value: 40, selected: false, choosen: false },
    { idx: 11, value: 100, selected: false, choosen: false },
  ]);

  const select = e => {
    const newCards = cards.map(current => {
      const newCard = { ...current };
      if (current.idx === parseInt(e.target.dataset.idx)) {
        if (newCard.selected) {
          newCard.choosen = true;
        } else {
          newCard.selected = true;
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
        return (
          <Card
            data-idx={card.idx}
            key={card.idx}
            idx={card.idx}
            pose={pose}
            // pose={card.selected ? 'selected' : 'init'}
            // endPose={
            //   pose === 'choosen' || pose === 'selected' || pose === 'hidden'
            // }
            setPose={pose}
            onTouchStart={select}
            onMouseDown={select}
          >
            <Text invert>{card.value}</Text>
          </Card>
        );
      })}
    </>
  );
};

export default Cards;
