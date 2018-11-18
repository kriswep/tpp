import styled from 'styled-components';

const Text = styled.p`
  color: ${({ theme }) => (theme.mode === 'dark' ? theme.light : theme.dark)};
`;

export default Text;
