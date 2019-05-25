import styled from 'styled-components/macro';

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
  margin: 1rem 1rem 1rem 0;
  padding: 0.5rem;
  text-align: left;
  width: 20rem;
`;

export default Button;
