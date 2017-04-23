const { CHAT_MESSAGE } = require('./actions');

const DEFAULT_STATE = [
  ['#cheerskevin',
    { username: 'Twoverlay Chat',
      id: 'key',
      emotes: {},
      badges: { moderator: '1' } },
    'Welcome to the chat'],
];

function chat(state = DEFAULT_STATE, action) {
  if (action.type === CHAT_MESSAGE) {
    const { args } = action;
    return [args].concat(state).slice(0, 50);
  }
  return state;
};

module.exports = chat;
