let initialState = [
  ['#cheerskevin',
    { username: 'Twoverlay Chat',
      id: 'key',
      emotes: {},
      badges: { moderator: '1' } },
    'Welcome to the chat'],
];

if (global.localStorage && global.localStorage.getItem('twoverlay')) {
  initialState =
    JSON.parse(global.localStorage.getItem('twoverlay')).chat ||
    initialState;
}

const chat = (state = initialState, action = {}) => {
  if (action.type === 'chatMessage') {
    return [action.args].concat(state).slice(0, 50);
  }
  return state;
};

export default chat;
