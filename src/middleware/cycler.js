const MESSAGE_CYCLE_RATE = 2e3;

let cycleTimeout;

function handleCycle(store) {
  if (store.getState().notifications.length && !cycleTimeout) {
    cycleTimeout = setTimeout(() => {
      store.dispatch({ type: 'cycleNotifications' });
      cycleTimeout = null;
      handleCycle(store);
    }, MESSAGE_CYCLE_RATE);
  }
}

const cycler = store => next => (action) => {
  const result = next(action);
  handleCycle(store);
  return result;
};

export default cycler;
