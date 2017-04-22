const WEBSOCKET_URL = (process.env.NODE_ENV === 'production')
                        ? 'wss://cheerskevin.com/wss/'
                        : 'ws://localhost:6400';

const OVERLAY_COMMANDS = {
  'reload!': () => global.window.location.reload(),
  'away! \\d+': (store, message) => {
    store.dispatch({
      type: 'setAway',
      seconds: parseInt(message.match(/\d+/)[0], 10) * 60,
    });
  },
  'back!': store => store.dispatch({ type: 'unsetAway' }),
  'secrets!': store => store.dispatch({ type: 'secrets' }),
  'countdown!': store => store.dispatch({ type: 'countdown' }),
  'finish!': () => {},
};

function addNotificationListener(store) {
  setTimeout(() => {
    const w = new global.WebSocket(WEBSOCKET_URL);
    w.onclose = () => { addNotificationListener(store); };
    w.onmessage = (msg) => {
      const match =
        Object.keys(OVERLAY_COMMANDS).find(key =>
          (new RegExp(key)).test(msg.data));
      if (match) OVERLAY_COMMANDS[match](store, msg.data);
      else store.dispatch({ type: 'notification', msg });
    };
  }, 1000);
}

export default store => addNotificationListener(store);
