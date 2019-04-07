import React from 'react';
import styled from 'styled-components/macro';
import { Link } from '@reach/router';

const StyledLink = styled(Link)`
  color: ${({ theme }) => (theme.mode === 'dark' ? theme.light : theme.dark)};
`;

const Nav = () => {
  return (
    <nav>
      <StyledLink to="/">Estimation</StyledLink>{' '}
      <StyledLink to="chat">Chat</StyledLink>
    </nav>
  );
};

export default Nav;
