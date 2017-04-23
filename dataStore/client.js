const WebSocket = require('ws');
const readline = require('readline');

let ws;

function subscribe() {
  ws = new WebSocket('ws://127.0.0.1:9094');
  ws.on('message', (data) => {
    const { mode, xsplit } = JSON.parse(data);
    console.log(prettyPrint({ mode, xsplit }))
  });
  ws.on('error', () => {
    ws.close();
    setTimeout(subscribe, 1000);
  });
}
subscribe();

function prettyPrint(data) {
  return JSON.stringify(data, null, 4);
}

readline.createInterface({
  input: process.stdin, output: process.stdout, terminal: false
}).on('line', (line) => {
  ws.send(JSON.stringify({ type: line }))
});
