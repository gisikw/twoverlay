const WebSocket = require('ws');
const WEBSOCKET_URL = 'ws://127.0.0.1:9094'
const RECONNECT_DELAY = 1000;
const CLOCK_REFRESH_RATE = 1000;
const CRITICAL = 3.6e6;
const WARNING = 3e6;

let t0 = Date.now();
let mode = '?';

function subscribe() {
  const ws = new WebSocket(WEBSOCKET_URL);
  ws.on('message', (json) => {
    const { updatedAt, currentMode } = JSON.parse(json).mode;
    t0 = updatedAt;
    mode = currentMode.slice(0, 1).toUpperCase();
  });
  ws.on('error', (err) => {
    ws.close();
    setTimeout(subscribe, RECONNECT_DELAY);
  });
}
subscribe();

process.stdout.write("\033c\x1b[?25l");

const format = (time) => [
  Math.floor(time / 1000 / 60 / 60),
  Math.floor(time / 1000 / 60) % 60,
  Math.floor(time / 1000) % 60,
].map(n => `0${n}`.slice(-2)).join(':');

setInterval(() => {
  const Δt = Date.now() - t0;
  const color = (mode === 'L' && (
    (Δt > CRITICAL && '\x1b[31m') ||
    (Δt > WARNING && '\x1b[33m'))) || '';
  process.stdout.write(
    `${color}    ${mode} ${format(Δt)}\r\x1b[0m`
  );
}, CLOCK_REFRESH_RATE);
