"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ChatMessage = _interopRequireDefault(require("./ChatMessage"));

const MessageList = props => {
  var messages = props.messages.map(function (msg, i) {
    return _react.default.createElement(_ChatMessage.default, {
      message: msg,
      key: i
    });
  });
  return _react.default.createElement("div", null, messages);
};

var _default = MessageList;
exports.default = _default;