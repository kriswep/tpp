"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _MessageStore = _interopRequireDefault(require("../connection/MessageStore"));

var _manager = _interopRequireDefault(require("../connection/manager"));

const useConnection = () => {
  const [messages, setMessages] = (0, _react.useState)(_MessageStore.default.getMessages());
  const [connected, setConnected] = (0, _react.useState)(_manager.default.isConnected());
  const [lastError, setLastError] = (0, _react.useState)({
    error: false
  });
  (0, _react.useEffect)(() => {
    _MessageStore.default.subscribe(updateMessages);

    _manager.default.onStatusChange(updateConnection);

    _manager.default.onMessage(_MessageStore.default.newMessage);

    _manager.default.onError(onError);

    return () => {
      _MessageStore.default.unsubscribe(updateMessages);

      _manager.default.offStatusChange(updateConnection);

      _manager.default.offMessage(_MessageStore.default.newMessage);

      _manager.default.offError(onError);
    };
  }, []);

  const updateMessages = () => {
    setMessages(_MessageStore.default.getMessages());
  };

  const updateConnection = () => {
    const connected = _manager.default.isConnected();

    setConnected(connected);

    if (connected) {
      // remove last error
      setLastError({
        error: false
      });
    }
  };

  const onError = newError => {
    setLastError(newError);
    updateConnection();
  };

  return {
    id: _manager.default.getId(),
    connected,
    messages,
    send: newMessage => {
      _manager.default.sendMessage(newMessage);

      _MessageStore.default.newMessage(newMessage);
    },
    isHost: _manager.default.isHost(),
    lastError
  };
};

var _default = useConnection;
exports.default = _default;