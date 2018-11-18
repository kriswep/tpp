import React, { Component } from 'react';
import styled from 'styled-components';

import Text from '../components/Text';
import Card from './Card';

const Table = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
`;
class index extends Component {
  state = {
    cards: [
      { idx: 1, value: 0 },
      { idx: 2, value: 0.5 },
      { idx: 3, value: 1 },
      { idx: 4, value: 2 },
      { idx: 5, value: 3 },
      { idx: 6, value: 5 },
      { idx: 7, value: 8 },
      { idx: 8, value: 13 },
      { idx: 9, value: 20 },
      { idx: 10, value: 40 },
      { idx: 11, value: 100 },
    ],
  };
  render() {
    return (
      <Table>
        {this.state.cards.map(card => (
          <Card key={card.idx} idx={card.idx}>
            <Text invert>{card.value}</Text>
          </Card>
        ))}
      </Table>
    );
  }
}

export default index;
