let initialState = [];

if (global.localStorage && global.localStorage.getItem('twoverlay')) {
  initialState =
    JSON.parse(global.localStorage.getItem('twoverlay')).notifications ||
    initialState;
}

const notifications = (state = initialState, action = {}) => {
  if (action.type === 'notification') {
    return state.concat([action.msg.data]);
  } else if (action.type === 'cycleNotifications') {
    return state.slice(1);
  }
  return state;
};

export default notifications;
