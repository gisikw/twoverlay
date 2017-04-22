const localStorage = store => next => (action) => {
  const result = next(action);
  global.localStorage.setItem(
    'twoverlay',
    JSON.stringify(store.getState()),
  );
  return result;
};

export default localStorage;
