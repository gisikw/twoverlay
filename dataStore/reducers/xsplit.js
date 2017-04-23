const {
  XSPLIT_CONNECT,
  XSPLIT_DISCONNECT,
} = require('./actions');

const DEFAULT_STATE = {
  connected: false,
};

function xsplitReducer(state = DEFAULT_STATE, action) {
  if (action.type === XSPLIT_CONNECT) {
    return { connected: true };
  }
  if (action.type == XSPLIT_DISCONNECT) {
    return { connected: false };
  }
  return state;
}

module.exports = xsplitReducer;
