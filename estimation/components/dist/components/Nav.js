"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _router = require("@reach/router");

const StyledLink = (0, _styledComponents.default)(_router.Link)`
  color: ${({
  theme
}) => theme.mode === 'dark' ? theme.light : theme.dark};
`;

const Nav = () => {
  return _react.default.createElement("nav", null, _react.default.createElement(StyledLink, {
    to: "/"
  }, "Estimation"), ' ', _react.default.createElement(StyledLink, {
    to: "chat"
  }, "Chat"));
};

var _default = Nav;
exports.default = _default;