let activeTimer;

const TIMER_ACTIONS = ['setAway', 'countdown', 'unsetAway', 'load'];

function handleTimer(store) {
  clearInterval(activeTimer);
  const { cover } = store.getState();
  if (cover.active) {
    activeTimer = setInterval(() => {
      store.dispatch({ type: 'decrementTimer' });
      if (store.getState().cover.seconds <= 0) clearInterval(activeTimer);
    }, 1000);
  }
}

const timer = store => next => (action) => {
  const result = next(action);
  if (TIMER_ACTIONS.indexOf(action.type) !== -1) handleTimer(store);
  return result;
};

export default timer;
