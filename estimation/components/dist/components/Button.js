"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

const Button = _styledComponents.default.button`
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
  font-size: ${({
  size = 'normal',
  theme
}) => {
  return theme[size];
}};
  line-height: 2;
  align-self: ${({
  align = 'initial'
}) => align};
`;
var _default = Button;
exports.default = _default;