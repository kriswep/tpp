const protocolPrefix = window.location.protocol === 'https:' ? 'wss:' : 'ws:';

export let socketUrl;

if (process.env.REACT_APP_SOCKET_URL) {
  socketUrl = process.env.REACT_APP_SOCKET_URL;
} else if (process.env.GATSBY_APP_SOCKET_URL) {
  socketUrl = process.env.GATSBY_APP_SOCKET_URL;
} else {
  socketUrl = `${protocolPrefix}${window.location.host}/api/broker`;
}
