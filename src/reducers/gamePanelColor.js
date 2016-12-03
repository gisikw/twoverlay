const HEXCODE_PATTERN = /#[a-f0-9]{3}(?:[a-f0-9]{3})?/i;
let initialState = '#9a9';

if (global.localStorage && global.localStorage.getItem('twoverlay')) {
  initialState =
    JSON.parse(global.localStorage.getItem('twoverlay')).gamePanelColor ||
    initialState;
}

const chat = (state = initialState, action = {}) => {
  if (action.type === 'chatMessage') {
    const match = action.args[2].match(HEXCODE_PATTERN);
    return match ? match[0] : state;
  }
  return state;
};

export default chat;
