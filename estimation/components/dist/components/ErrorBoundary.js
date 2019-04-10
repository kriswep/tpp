"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Text = _interopRequireDefault(require("./Text"));

class _default extends _react.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }

  render() {
    return this.state.hasError ? console.log(this.state.error) || _react.default.createElement(_Text.default, null, "An error occured") : this.props.children;
  }

}

exports.default = _default;