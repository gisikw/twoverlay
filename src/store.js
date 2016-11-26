import { createStore } from 'redux';
import { client as tmi } from 'tmi.js';

const CHAT_DEFAULTS = {
  connection: { reconnect: true, secure: true }, channels: ['#cheerskevin'],
};
const WEBSOCKET_URL = (process.env.NODE_ENV === 'production')
                        ? 'wss://cheerskevin.com/wss/'
                        : 'ws://localhost:6400';
const INITIAL_STATE = {
  messages: [
    ['#cheerskevin',
      { username: 'Twoverlay Chat',
        id: 'key',
        emotes: {},
        badges: { moderator: '1' } },
      'Welcome to the chat'],
  ],
  notifications: [],
};

function transform(state = INITIAL_STATE, action) {
  if (action.type === 'chatMessage') {
    const messages = [action.args].concat(state.messages).slice(0, 50);
    if (action.args[2].match(/^#[a-f0-9]{3}(?:[a-f0-9]{3})?$/i)) {
      return Object.assign({}, state, { messages, bottomColor: action.args[2] });
    }
    return Object.assign({}, state, { messages });
  } else if (action.type === 'keyup' && action.e.keyCode === 32) {
    return Object.assign({}, state, { away: !state.away });
  } else if (action.type === 'notification') {
    return Object.assign({}, state, {
      notifications: state.notifications.concat([action.msg.data]),
    });
  } else if (action.type === 'cycleNotifications') {
    return Object.assign({}, state, {
      notifications: state.notifications.slice(1),
    });
  }
  return state;
}

function addNotificationListener(store) {
  setTimeout(() => {
    const w = new global.WebSocket(WEBSOCKET_URL);
    w.onclose = () => { addNotificationListener(store); };
    w.onmessage = (msg) => {
      if (msg.data === 'reload!') global.window.location.reload();
      else store.dispatch({ type: 'notification', msg });
    };
  }, 1000);
}

function addChatListener(store) {
  const client = tmi(CHAT_DEFAULTS);
  client.connect();
  client.on('message', (...args) => {
    store.dispatch({ type: 'chatMessage', args });
  });
}

function addKeyListener(store) {
  global.addEventListener('keyup', e => store.dispatch({ type: 'keyup', e }));
}

function init() {
  const store = createStore(transform);
  addKeyListener(store);
  addChatListener(store);
  addNotificationListener(store);
  return store;
}

export default init();
