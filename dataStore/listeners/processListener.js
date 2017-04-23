const {
  MODE_SET_AWAY,
  MODE_SET_LIVE,
  MODE_SET_HIDDEN,
  MODE_SET_PRESHOW,
  MODE_SET_OFFLINE
} = require('../reducers/actions');

const FORWARDABLE_ACTIONS = [
  MODE_SET_LIVE,
  MODE_SET_HIDDEN,
  MODE_SET_PRESHOW,
  MODE_SET_OFFLINE,
];

function register(store) {
  process.on('message', ({ data }) => {
    if (!store.getState().xsplit.connected) return;
    const command = data.split(/\s/)[0];
    if (command === MODE_SET_AWAY) {
      store.dispatch({
        type: MODE_SET_AWAY,
        seconds: parseInt(data.split(/\s+/)[1]),
      });
    } else if (FORWARDABLE_ACTIONS.includes(command)) {
      store.dispatch({ type: command });
    }
  });
}

module.exports = { register }
