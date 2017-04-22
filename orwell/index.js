const WebSocketServer = require('ws').Server;
const { createStore } = require('redux');
const listeners = require('./listeners');
const reducers = require('./reducers');
const { INIT } = require('./reducers/actions');

const WEBSOCKET_PORT = 9094;
const connections = [];
const wss = new WebSocketServer({ port: WEBSOCKET_PORT });
const store = createStore(reducers);

store.dispatch({ type: INIT });
listeners.register(store);

wss.on('connection', (conn) => {
  connections.push(conn)
  conn.send(JSON.stringify(store.getState()));
  conn.on('close', () => connections.splice(connections.indexOf(conn), 1));
});

store.subscribe(() => {
  const state = JSON.stringify(store.getState());
  connections.forEach((conn) => conn.send(state));
});
