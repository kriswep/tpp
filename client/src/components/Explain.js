import React from 'react';

import ScreenCenterer from './ScreenCenterer';
import Text from './Text';

const Explain = ({ noCenter }) => {
  const Inner = <Text size="huge">Explain and answer!</Text>;

  if (noCenter) return Inner;
  return <ScreenCenterer>{Inner}</ScreenCenterer>;
};

export default Explain;
