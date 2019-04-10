"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Text = _interopRequireDefault(require("../components/Text"));

var _Input = _interopRequireDefault(require("../components/Input"));

var _Button = _interopRequireDefault(require("../components/Button"));

const ConnectionForm = props => {
  const [channel, setChannel] = (0, _react.useState)('');
  const [name, setName] = (0, _react.useState)('');

  const handleChange = e => {
    if (e.target.name === 'channel') {
      setChannel(e.target.value);
    } else if (e.target.name === 'name') {
      setName(e.target.value);
    }
  };

  return _react.default.createElement("form", {
    method: "post"
  }, props.connected ? _react.default.createElement(_Text.default, null, "Connected") : _react.default.createElement(_Text.default, null, "Please connect first."), _react.default.createElement(_Input.default, {
    name: "channel",
    value: channel,
    onChange: handleChange,
    placeholder: "channel",
    type: "text",
    "aria-label": "Enter the channel name you wish to connect to."
  }), _react.default.createElement(_Input.default, {
    name: "name",
    value: name,
    onChange: handleChange,
    placeholder: "name",
    type: "text",
    "aria-label": "Your name, so your teammates recognize you."
  }), _react.default.createElement(_Button.default, {
    onClick: props.onHost.bind(null, channel, name)
  }, "Host"), _react.default.createElement(_Button.default, {
    onClick: props.onJoin.bind(null, channel, name)
  }, "Join"));
};

var _default = ConnectionForm;
exports.default = _default;