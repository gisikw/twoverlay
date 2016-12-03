let initialState = { active: false };

if (global.localStorage && global.localStorage.getItem('twoverlay')) {
  initialState =
    JSON.parse(global.localStorage.getItem('twoverlay')).cover ||
    initialState;
}

const cover = (state = initialState, action = {}) => {
  if (action.type === 'decrementTimer') {
    return Object.assign({}, state, { seconds: state.seconds - 1 });
  }
  if (action.type === 'unsetAway') {
    return { active: false };
  }
  if (action.type === 'setAway') {
    return {
      primary: "Don't go away,",
      secondary: "I'll be right back!",
      seconds: action.seconds,
      active: true,
    };
  }
  if (action.type === 'secrets') {
    return {
      primary: 'Screen hidden',
      secondary: 'Because secrets!',
      seconds: 0,
      showCam: true,
      active: true,
    };
  }
  if (action.type === 'countdown') {
    return {
      primary: 'Live in:',
      seconds: 600,
      active: true,
    };
  }
  return state;
};

export default cover;
