"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _manager = _interopRequireDefault(require("../connection/manager"));

var _ConnectionForm = _interopRequireDefault(require("../connection/ConnectionForm"));

var _Text = _interopRequireDefault(require("../components/Text"));

const Connect = props => {
  const error = props.lastError && props.lastError.error;
  const errorReason = error && `: ${props.lastError.message}`;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_ConnectionForm.default, {
    connected: props.connected,
    onHost: _manager.default.host,
    onJoin: _manager.default.join
  }), error && _react.default.createElement(_Text.default, null, "Sorry, that did not work", errorReason));
};

var _default = Connect;
exports.default = _default;