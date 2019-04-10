"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ScreenCenterer = _interopRequireDefault(require("../components/ScreenCenterer"));

var _Explain = _interopRequireDefault(require("../components/Explain"));

var _Result = _interopRequireDefault(require("../components/Result"));

var _Cards = _interopRequireDefault(require("./Cards"));

const Estimator = ({
  id,
  gameState,
  send
}) => {
  if (!gameState) return null;
  return _react.default.createElement(_react.default.Fragment, null, gameState.matches('intro') && _react.default.createElement(_ScreenCenterer.default, null, _react.default.createElement(_Explain.default, {
    noCenter: true
  })), gameState.matches('play') && _react.default.createElement(_Cards.default, {
    send: send,
    id: id
  }), gameState.matches('result') && _react.default.createElement(_ScreenCenterer.default, null, _react.default.createElement(_Result.default, null)));
};

var _default = Estimator;
exports.default = _default;