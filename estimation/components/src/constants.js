const protocolPrefix = window.location.protocol === 'https:' ? 'wss:' : 'ws:';

export const socketUrl = process.env.REACT_APP_SOCKET_URL
  ? process.env.REACT_APP_SOCKET_URL
  : `${protocolPrefix}${window.location.host}/api/broker`;
