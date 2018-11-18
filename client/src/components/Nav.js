import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

const StyledLink = styled(Link)`
  color: ${({ theme }) => (theme.mode === 'dark' ? theme.light : theme.dark)};
`;

const Nav = () => {
  return (
    <nav>
      <StyledLink to="/">Home</StyledLink>{' '}
      <StyledLink to="card">Card</StyledLink>{' '}
      <StyledLink to="chat">Chat</StyledLink>
    </nav>
  );
};

export default Nav;