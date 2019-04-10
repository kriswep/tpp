"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactPose = _interopRequireWildcard(require("react-pose"));

var _ScreenCenterer = _interopRequireDefault(require("../components/ScreenCenterer"));

var _Button = _interopRequireDefault(require("../components/Button"));

var _Explain = _interopRequireDefault(require("../components/Explain"));

var _Wait = _interopRequireDefault(require("../components/Wait"));

var _Result = _interopRequireDefault(require("../components/Result"));

const Poser = _reactPose.default.div({
  enter: {
    x: 0,
    opacity: 1
  },
  exit: {
    x: 50,
    opacity: 0
  }
});

const Listen = ({
  gameState,
  next
}) => {
  if (!gameState) return null;
  return _react.default.createElement(_ScreenCenterer.default, null, _react.default.createElement(_reactPose.PoseGroup, null, gameState.matches('intro') && _react.default.createElement(Poser, {
    key: gameState.value
  }, _react.default.createElement(_Explain.default, {
    noCenter: true
  })), gameState.matches('play') && _react.default.createElement(Poser, {
    key: gameState.value
  }, _react.default.createElement(_Wait.default, {
    noCenter: true
  })), gameState.matches('result') && _react.default.createElement(Poser, {
    key: gameState.value
  }, _react.default.createElement(_Result.default, null))), next && _react.default.createElement(_Button.default, {
    align: "flex-end",
    size: "big",
    onClick: next
  }, gameState.matches('intro') && 'start', gameState.matches('play') && 'finish', gameState.matches('result') && 'restart'));
};

var _default = Listen;
exports.default = _default;