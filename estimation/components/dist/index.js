"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Card", {
  enumerable: true,
  get: function () {
    return _Card.default;
  }
});
exports.default = void 0;

var _Card = _interopRequireDefault(require("./Card"));

// import Bar from './Bar'
// export Card as named exports
// alternative, more concise syntax for named exports
// export { default as Card } from './Card'
// you can optionally also set a default export for your module
var _default = {
  Card: _Card.default
};
exports.default = _default;