"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Input = _interopRequireDefault(require("../components/Input"));

var _Button = _interopRequireDefault(require("../components/Button"));

const MessageForm = props => {
  const [input, setInput] = (0, _react.useState)('');
  return _react.default.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      props.onSend(input);
      setInput('');
    }
  }, _react.default.createElement(_Input.default, {
    value: input,
    onChange: e => {
      setInput(e.target.value);
    },
    type: "text"
  }), _react.default.createElement(_Button.default, {
    as: "input",
    type: "submit",
    value: "Send"
  }));
};

var _default = MessageForm;
exports.default = _default;