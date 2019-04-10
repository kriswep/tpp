"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactPose = _interopRequireDefault(require("react-pose"));

var _MessageStore = _interopRequireDefault(require("../connection/MessageStore"));

var _Text = _interopRequireDefault(require("./Text"));

const Container = _styledComponents.default.div`
  display: flex;
`;
const ResultCard = (0, _styledComponents.default)(_reactPose.default.div({
  hoverable: true,
  pressable: true,
  init: {
    transform: 'scale(1)',
    'z-index': 1 // 'z-index': ({ idx }) => idx,

  },
  hover: {
    // transform: transform(1.2),
    transform: 'scale(1.2)',
    'z-index': 1000
  },
  press: {
    // transform: transform(1.1),
    transform: 'scale(1.1)',
    'z-index': 1000
  }
}))`
  color: ${({
  theme
}) => theme.mode === 'dark' ? theme.dark : theme.light};
  background-color: ${({
  theme
}) => theme.mode === 'dark' ? theme.light : theme.dark};
  border: ${({
  theme
}) => `1px solid ${theme.mode === 'dark' ? theme.dark : theme.light}`};
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

const Result = ({
  noCenter
}) => {
  const playedCards = _MessageStore.default.getPlayedCards();

  let Result = playedCards.map((played, idx) => _react.default.createElement(ResultCard, {
    key: idx
  }, _react.default.createElement(_Text.default, {
    invert: true,
    size: "small"
  }, played.id.name), _react.default.createElement(_Text.default, {
    invert: true
  }, played.card.value)));

  if (Result.length <= 0) {
    Result = _react.default.createElement(_Text.default, {
      size: "huge"
    }, "No estimates were made...");
  }

  return _react.default.createElement(Container, null, Result);
};

var _default = Result;
exports.default = _default;