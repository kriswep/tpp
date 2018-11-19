import styled from 'styled-components';
import posed from 'react-pose';

const height = window.innerHeight;

const transform = scale => props => {
  let deg = 0;
  let translateX = 0;
  let translateY = -height + 250;
  switch (props.idx) {
    case 1:
      deg = -90;
      translateX -= 180;
      translateY += 240;
      break;
    case 2:
      deg = -72;
      translateX -= 170;
      translateY += 180;
      break;
    case 3:
      deg = -54;
      translateX -= 150;
      translateY += 120;
      break;
    case 4:
      deg = -36;
      translateX -= 110;
      translateY += 70;
      break;
    case 5:
      deg = -18;
      translateX -= 60;
      translateY += 25;
      break;

    case 6:
      deg = 0;
      translateX += 0;
      translateY += 0;
      break;

    case 7:
      deg = 18;
      translateX += 60;
      translateY += 25;
      break;
    case 8:
      deg = 36;
      translateX += 110;
      translateY += 70;
      break;
    case 9:
      deg = 54;
      translateX += 150;
      translateY += 120;
      break;
    case 10:
      deg = 72;
      translateX += 170;
      translateY += 180;
      break;
    case 11:
      deg = 90;
      translateX += 180;
      translateY += 240;
      break;

    default:
      deg = 0;
      translateX += 0;
      translateY += 0;
      break;
  }

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
      transform: transform(1.2),
      // transform: 'scale(1.2)',
      'z-index': 1000,
    },
    press: {
      boxShadow: '0px 2px 5px rgba(220,220,220,0.1)',
      transform: 'scale(1.1) translateX(0px) translateY(-20px) rotate(0deg)',
      'z-index': 1000,
    },
    selected: {
      boxShadow: '0px 2px 5px rgba(220,220,220,0.1)',
      transform: 'scale(1.1) translateX(0px) translateY(-20px) rotate(0deg)',
      'z-index': 1000,
    },
  }),
)`
  position: fixed;
  bottom: 0;
  left: calc(50% - 50px);
  color: ${({ theme }) => (theme.mode === 'dark' ? theme.dark : theme.light)};
  background-color: ${({ theme }) =>
    theme.mode === 'dark' ? theme.light : theme.dark};
  border: ${({ theme }) =>
    `1px solid ${theme.mode === 'dark' ? theme.dark : theme.light}`};
  border-radius: 0.5rem;
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
