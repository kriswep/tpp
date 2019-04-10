"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.socketUrl = void 0;
const protocolPrefix = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
const socketUrl = process.env.REACT_APP_SOCKET_URL ? process.env.REACT_APP_SOCKET_URL : `${protocolPrefix}${window.location.host}/api/broker`;
exports.socketUrl = socketUrl;