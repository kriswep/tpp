const protocolPrefix = window.location.protocol === 'https:' ? 'wss:' : 'ws:';

export const socketUrl = `${protocolPrefix}${window.location.host}/api/broker`;
