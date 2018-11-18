import styled from 'styled-components';

const Text = styled.p`
  color: ${({ invert, theme }) => {
    if (invert) return theme.mode === 'dark' ? theme.dark : theme.light;
    return theme.mode === 'dark' ? theme.light : theme.dark;
  }};
`;

export default Text;
