import React from 'react';

import ScreenCenterer from './ScreenCenterer';
import Text from './Text';

const Wait = ({ noCenter }) => {
  const Inner = <Text size="huge">Wait for estimates!</Text>;

  if (noCenter) return Inner;
  return <ScreenCenterer>{Inner}</ScreenCenterer>;
};

export default Wait;
