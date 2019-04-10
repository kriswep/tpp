"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _MessageList = _interopRequireDefault(require("./MessageList"));

var _MessageForm = _interopRequireDefault(require("./MessageForm"));

var _Connection = _interopRequireDefault(require("../Manager/Connection"));

var _Connect = _interopRequireDefault(require("../connection/Connect"));

const Chat = () => {
  const {
    connected,
    messages,
    send
  } = (0, _Connection.default)();
  if (!connected) return _react.default.createElement(_Connect.default, {
    connected: connected
  });
  return _react.default.createElement(_react.default.Fragment, null, messages && _react.default.createElement(_MessageList.default, {
    messages: messages
  }), _react.default.createElement(_MessageForm.default, {
    onSend: send
  }));
};

var _default = Chat;
exports.default = _default;