import styled from 'styled-components';
import posed from 'react-pose';

const transform = scale => props => {
  let deg = 0;
  let translateX = 0;
  let translateY = 0;
  switch (props.idx) {
    case 1:
      deg = -90;
      translateY = 150;
      break;
    case 2:
      deg = -72;
      translateY = 120;
      break;
    case 3:
      deg = -54;
      translateY = 90;
      break;
    case 4:
      deg = -36;
      translateY = 60;
      break;
    case 5:
      deg = -18;
      translateY = 30;
      break;

    case 6:
      deg = 0;
      break;

    case 7:
      deg = 18;
      translateY = 30;
      break;
    case 8:
      deg = 36;
      translateY = 60;
      break;
    case 9:
      deg = 54;
      translateY = 90;
      break;
    case 10:
      deg = 72;
      translateY = 120;
      break;
    case 11:
      deg = 90;
      translateY = 150;
      break;

    default:
      deg = 0;
      translateY = 0;
      break;
  }
  if (props.idx < 2) translateY += 20;
  if (props.idx > 10) translateY += 20;

  translateX = Math.floor(translateY / 2);
  if (props.idx > 6) {
    translateX *= -1;
  }
  if (props.idx < 3) translateX += 20;
  if (props.idx < 2) translateX += 20;
  if (props.idx > 9) translateX -= 20;
  if (props.idx > 10) translateX -= 20;

  return `scale(${scale}) translateX(${translateX}px) translateY(${translateY}px) rotate(${deg}deg)`;
};

const Card = styled(
  posed.div({
    hoverable: true,
    pressable: true,
    init: {
      boxShadow: '0px 0px 0px rgba(220,220,220,0)',
      transform: transform(1),
      'z-index': ({ idx }) => idx,
    },
    hover: {
      boxShadow: '0px 5px 10px rgba(220,220,220,0.2)',
      // transform: 'scale(1.2)',
      transform: transform(1.2),
      'z-index': 1000,
    },
    press: {
      boxShadow: '0px 2px 5px rgba(220,220,220,0.1)',
      // transform: 'scale(1.1)',
      transform: transform(1.1),
      'z-index': 1000,
    },
  }),
)`
  color: ${({ theme }) => (theme.mode === 'dark' ? theme.dark : theme.light)};
  background-color: ${({ theme }) =>
    theme.mode === 'dark' ? theme.light : theme.dark};
  border: ${({ theme }) =>
    `1px solid ${theme.mode === 'dark' ? theme.dark : theme.light}`};
  height: 200px;
  width: 100px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  justify-items: center;
  align-items: center;
  margin: 0.1rem;
`;

export default Card;
