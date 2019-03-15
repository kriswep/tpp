import React from 'react';
import styled from 'styled-components/macro';
import posed from 'react-pose';

import MessageStore from '../connection/MessageStore';
import Text from './Text';

const Container = styled.div`
  display: flex;
`;

const ResultCard = styled(
  posed.div({
    hoverable: true,
    pressable: true,
    init: {
      transform: 'scale(1)',
      'z-index': 1,
      // 'z-index': ({ idx }) => idx,
    },
    hover: {
      // transform: transform(1.2),
      transform: 'scale(1.2)',
      'z-index': 1000,
    },
    press: {
      // transform: transform(1.1),
      transform: 'scale(1.1)',
      'z-index': 1000,
    },
  }),
)`
  color: ${({ theme }) => (theme.mode === 'dark' ? theme.dark : theme.light)};
  background-color: ${({ theme }) =>
    theme.mode === 'dark' ? theme.light : theme.dark};
  border: ${({ theme }) =>
    `1px solid ${theme.mode === 'dark' ? theme.dark : theme.light}`};
  border-radius: 0.5rem;
  height: 200px;
  width: 100px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  justify-items: center;
  align-items: center;
  margin: 0.1rem;
`;

const Result = ({ noCenter }) => {
  const playedCards = MessageStore.getPlayedCards();
  console.log(playedCards);
  const Inner = playedCards.map((played, idx) => (
    <ResultCard key={idx} size="huge">
      <Text invert size="small">
        {played.id.name}
      </Text>
      <Text invert>{played.card.value}</Text>
    </ResultCard>
  ));

  return <Container>{Inner}</Container>;
};

export default Result;
