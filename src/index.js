import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import Twoverlay from './components/Twoverlay';
import reducer from './reducers';
import localStorage from './middleware/localStorage';
import cycler from './middleware/cycler';
import timer from './middleware/timer';
import chatListener from './listeners/chat';
import notificationListener from './listeners/notification';

const store =
  createStore(reducer, applyMiddleware(localStorage, cycler, timer));

notificationListener(store);
chatListener(store);
store.dispatch({ type: 'load' });

ReactDOM.render(
  <Twoverlay store={store} />,
  global.document.getElementById('root'),
);
