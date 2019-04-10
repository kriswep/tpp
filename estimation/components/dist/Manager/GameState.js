"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _interpreter = require("xstate/lib/interpreter");

var _round = _interopRequireDefault(require("./round.machine"));

function useMachine(machine) {
  return distribute => {
    const [current, setCurrent] = (0, _react.useState)(machine.initialState);
    const service = (0, _react.useMemo)(() => (0, _interpreter.interpret)(machine).onTransition(state => {
      if (distribute) {
        distribute(JSON.stringify({
          type: 'gamestate',
          state
        }));
      }

      setCurrent(state);
    }) // .onEvent(e => console.log('EVENT:', e))
    .start(), [typeof distribute]);
    (0, _react.useEffect)(() => {
      return () => service.stop();
    }, []);
    return {
      gameState: current,
      next: () => {
        const {
          send
        } = service;
        send('TIME');
      }
    };
  };
}

const useGameState = useMachine((0, _round.default)());
var _default = useGameState;
exports.default = _default;