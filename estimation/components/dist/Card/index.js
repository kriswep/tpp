"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Index = void 0;

var _react = _interopRequireDefault(require("react"));

var _Master = _interopRequireDefault(require("./Master"));

var _Estimator = _interopRequireDefault(require("./Estimator"));

var _Connection = _interopRequireDefault(require("../Manager/Connection"));

var _GameState = _interopRequireDefault(require("../Manager/GameState"));

var _Connect = _interopRequireDefault(require("../connection/Connect"));

const Index = () => {
  const {
    id,
    connected,
    send,
    messages,
    isHost,
    lastError
  } = (0, _Connection.default)();
  const {
    gameState,
    next
  } = (0, _GameState.default)(isHost ? send : null);
  if (!connected) return _react.default.createElement(_Connect.default, {
    connected: connected,
    lastError: lastError
  });

  if (!isHost) {
    // we need to compute current state from received messages
    let neededGameState;

    for (let index = messages.length - 1; index >= 0; index--) {
      try {
        const message = JSON.parse(messages[index]);

        if (message.type === 'gamestate' && message.state) {
          neededGameState = message.state;
          break;
        }
      } catch (e) {}
    }

    if (gameState && neededGameState && !gameState.matches(neededGameState.value)) {
      next();
    }
  }

  return _react.default.createElement(_react.default.Fragment, null, isHost && _react.default.createElement(_Master.default, {
    gameState: gameState,
    next: next,
    id: id
  }), !isHost && _react.default.createElement(_Estimator.default, {
    gameState: gameState,
    send: send,
    id: id
  }));
};

exports.Index = Index;
var _default = Index;
exports.default = _default;