const { combineReducers } = require('redux');
const game = require('./game');
const chat = require('./chat');
const mode = require('./mode');
const xsplit = require('./xsplit');

module.exports = combineReducers({
  xsplit,
  game,
  chat,
  mode,
});
