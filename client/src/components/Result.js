import React from 'react';

import MessageStore from '../connection/MessageStore';
import ScreenCenterer from './ScreenCenterer';
import Text from './Text';

const Result = ({ noCenter }) => {
  const playedCards = MessageStore.getPlayedCards();
  console.log(playedCards);
  const Inner = playedCards.map((played, idx) => (
    <Text key={idx} size="huge">
      {JSON.stringify(played.card)}
    </Text>
  ));

  if (noCenter) return Inner;
  return <ScreenCenterer>{Inner}</ScreenCenterer>;
};

export default Result;
