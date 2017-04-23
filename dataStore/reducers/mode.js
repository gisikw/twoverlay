const {
  MODE_SET_AWAY,
  MODE_SET_LIVE,
  MODE_SET_HIDDEN,
  MODE_SET_PRESHOW,
  MODE_SET_OFFLINE,
} = require('./actions');

const DEFAULT_STATE = {
  currentMode: 'offline',
  updatedAt: Date.now(),
};

const withTimestamp = (o) => Object.assign(o, { updatedAt: Date.now() });

function modeReducer(state = DEFAULT_STATE, action) {
  if (action.type === MODE_SET_AWAY) {
    return withTimestamp({
      currentMode: 'away',
      seconds: action.seconds || 420,
    });
  }

  if (action.type === MODE_SET_LIVE) {
    return withTimestamp({ currentMode: 'live' });
  }

  if (action.type === MODE_SET_HIDDEN) {
    return withTimestamp({ currentMode: 'hidden' });
  }

  if (action.type === MODE_SET_PRESHOW) {
    return withTimestamp({ currentMode: 'preshow' });
  }

  if (action.type === MODE_SET_OFFLINE) {
    return withTimestamp({ currentMode: 'offline' });
  }

  return state;
}

module.exports = modeReducer;
