import React, { Component } from 'react';
import styled from 'styled-components';

import Text from '../components/Text';
import Card from './Card';

const Table = styled.div`
  /* align-items: center;
  justify-content: center;
  display: flex; */
`;
class index extends Component {
  state = {
    cards: [
      { idx: 1, value: 0, selected: false },
      { idx: 2, value: 0.5, selected: false },
      { idx: 3, value: 1, selected: false },
      { idx: 4, value: 2, selected: false },
      { idx: 5, value: 3, selected: false },
      { idx: 6, value: 5, selected: false },
      { idx: 7, value: 8, selected: false },
      { idx: 8, value: 13, selected: false },
      { idx: 9, value: 20, selected: false },
      { idx: 10, value: 40, selected: false },
      { idx: 11, value: 100, selected: false },
    ],
  };
  select = e => {
    const cards = this.state.cards.map(current => {
      const newCard = { ...current };
      if (current.idx === parseInt(e.target.dataset.idx)) {
        newCard.selected = true;
      } else {
        newCard.selected = false;
      }

      return newCard;
    });
    this.setState({
      cards,
    });
  };
  render() {
    return (
      <div>
        {this.state.cards.map(card => (
          <Card
            data-idx={card.idx}
            key={card.idx}
            idx={card.idx}
            pose={card.selected ? 'selected' : 'init'}
            onTouchStart={this.select}
            onMouseDown={this.select}
          >
            <Text invert>{card.value}</Text>
          </Card>
        ))}
      </div>
    );
  }
}

export default index;
