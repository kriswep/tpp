"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xstate = require("xstate");

// import MessageStore from '../connection/MessageStore';
const roundMachine = (initial = 'intro') => {
  return (0, _xstate.Machine)({
    id: 'game',
    initial,
    states: {
      intro: {
        on: {
          TIME: 'play'
        }
      },
      play: {
        on: {
          TIME: 'result'
        }
      },
      result: {
        on: {
          TIME: 'intro'
        }
      }
    }
  });
};

var _default = roundMachine;
exports.default = _default;