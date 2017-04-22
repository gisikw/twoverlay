const { CHAT_MESSAGE } = require('./actions');

const HEXCODE_PATTERN = /#[a-f0-9]{3}(?:[a-f0-9]{3})?/i;
const COORD_PATTERN = /^\d+,\s*\d+$/;
const DEFAULT_STATE = {
  background: '#9a9',
  coordinates: [100, 100],
};

function game(state = DEFAULT_STATE, action) {
  if (action.type === CHAT_MESSAGE) {
    const message = action.args[2];
    const hexMatch = message.match(HEXCODE_PATTERN);
    if (hexMatch) {
      return Object.assign({}, state, {
        background: hexMatch[0],
      });
    }
    if (message.match(COORD_PATTERN)) {
      return Object.assign({}, state, {
        coordinates: message.split(',').map(i => parseInt(i)),
      });
    }
    return state;
  }
  return state;
}

module.exports = game;
