import { client as tmi } from 'tmi.js';

const CHAT_DEFAULTS = {
  connection: { reconnect: true, secure: true }, channels: ['#cheerskevin'],
};

export default (store) => {
  const client = tmi(CHAT_DEFAULTS);
  client.connect();
  client.on('message', (...args) => {
    store.dispatch({ type: 'chatMessage', args });
  });
};
