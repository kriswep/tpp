import styled from 'styled-components';

const Text = styled.p`
  font-family: 'radnika_next', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
    'Helvetica Neue', sans-serif;
  color: ${({ invert, theme }) => {
    if (invert) return theme.mode === 'dark' ? theme.dark : theme.light;
    return theme.mode === 'dark' ? theme.light : theme.dark;
  }};
  font-size: ${({ size = 'normal', theme }) => {
    return theme[size];
  }};
  margin: 0;
  padding: 0;
`;

export default Text;
