import React from 'react';

import ScreenCenterer from './ScreenCenterer';
import Text from './Text';

const Result = ({ noCenter }) => {
  const Inner = <Text size="huge">Results coming soon!</Text>;

  if (noCenter) return Inner;
  return <ScreenCenterer>{Inner}</ScreenCenterer>;
};

export default Result;
