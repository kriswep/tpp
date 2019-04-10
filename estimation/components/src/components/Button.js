import styled from 'styled-components';

const Button = styled.button`
  color: ${({ theme }) => (theme.mode === 'dark' ? theme.light : theme.dark)};
  background: transparent;
  border: ${({ theme }) =>
    `1px solid ${theme.mode === 'dark' ? theme.light : theme.dark}`};
  font-family: 'radnika_next', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
    'Helvetica Neue', sans-serif;
  font-size: ${({ size = 'normal', theme }) => {
    return theme[size];
  }};
  line-height: 2;
  align-self: ${({ align = 'initial' }) => align};
`;

export default Button;
