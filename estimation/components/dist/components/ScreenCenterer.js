"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _default = _styledComponents.default.div`
  position: fixed;
  bottom: 0;
  height: 80vh;
  width: 100vw;
  display: grid;
  align-items: center;
  justify-items: center;
`;

exports.default = _default;