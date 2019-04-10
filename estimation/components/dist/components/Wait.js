"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ScreenCenterer = _interopRequireDefault(require("./ScreenCenterer"));

var _Text = _interopRequireDefault(require("./Text"));

const Wait = ({
  noCenter
}) => {
  const Inner = _react.default.createElement(_Text.default, {
    size: "huge"
  }, "Wait for estimates!");

  if (noCenter) return Inner;
  return _react.default.createElement(_ScreenCenterer.default, null, Inner);
};

var _default = Wait;
exports.default = _default;