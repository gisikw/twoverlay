const tmi = require('tmi.js');
const { CHAT_MESSAGE } = require('../reducers/actions');

const CHAT_DEFAULTS = {
  connection: { reconnect: true, secure: true },
  channels: ['#cheerskevin'],
};

function register(store) {
  const client = tmi.client(CHAT_DEFAULTS);
  client.on('message', (...args) => {
    store.dispatch({ type: CHAT_MESSAGE, args });
  });
  client.connect();
}

module.exports = { register }
