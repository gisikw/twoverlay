const { combineReducers } = require('redux');
const game = require('./game');
const chat = require('./chat');
const mode = require('./mode');

module.exports = combineReducers({
  game,
  chat,
  mode,
});
