"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

const Text = _styledComponents.default.input`
  color: ${({
  theme
}) => theme.mode === 'dark' ? theme.light : theme.dark};
  background: transparent;
  border: ${({
  theme
}) => `1px solid ${theme.mode === 'dark' ? theme.light : theme.dark}`};
  font-family: 'radnika_next', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
    'Helvetica Neue', sans-serif;
  font-size: 1.5rem;
  line-height: 2;
`;
var _default = Text;
exports.default = _default;