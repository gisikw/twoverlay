import { combineReducers } from 'redux';
import chat from './chat';
import cover from './cover';
import notifications from './notifications';
import gamePanelColor from './gamePanelColor';

export default combineReducers({
  chat,
  cover,
  notifications,
  gamePanelColor,
});
