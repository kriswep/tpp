"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Text = _interopRequireDefault(require("../components/Text"));

const ChatMessage = props => {
  return _react.default.createElement(_Text.default, null, props.message);
};

var _default = ChatMessage;
exports.default = _default;