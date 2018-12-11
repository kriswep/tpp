import styled from 'styled-components';

const Text = styled.p`
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
