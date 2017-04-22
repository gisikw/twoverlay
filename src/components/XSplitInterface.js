import React from 'react';
import xjs from 'xjs-framework/dist/xjs-es2015';

const WEBSOCKET_URL = (process.env.NODE_ENV === 'production')
                        ? 'wss://cheerskevin.com/wss/'
                        : 'ws://localhost:6400';

const app = new xjs.App();

const PATTERNS = [
  [ /away! \d+/, () => app.setPrimaryMicEnabled(false) ],
  [ /back!/, () => app.setPrimaryMicEnabled(true) ],
  [ /countdown!/, () => {
    twitchOutput((twitch) => {
      app.setPrimaryMicEnabled(false)
      twitch.startBroadcast();
    });
  } ],
  [ /finish!/, () => {
    twitchOutput((twitch) => {
      app.setPrimaryMicEnabled(true)
      twitch.stopBroadcast();
    });
  } ],
];

function twitchOutput(callback) {
  xjs.Output.getOutputList()
    .then(outputs =>
      Promise.all(
        outputs.map(output =>
          output.getName().then(name => [ name, output ])
        )
      )
    ).then(pairs =>
      callback(
        pairs.find(([ name, output ]) => name.includes('cheerskevin'))[1]
      )
    );
}

class XSplitInterface extends React.Component {
  constructor(...args) {
    super(...args);
    this.listen = this.listen.bind(this);
  }

  componentDidMount() {
    this.listen();
  }

  listen() {
    setTimeout(() => {
      const w = new global.WebSocket(WEBSOCKET_URL);
      w.onclose = () => { this.listen(); }
      w.onmessage = (msg) =>
        PATTERNS.find(([ pattern, fn ]) => pattern.test(msg.data) && fn());
    }, 1000);
  }

  render() {
    return (
      <div style={{ background: '#fff' }}>
        <h1>XSplit Twoverlay Plugin</h1>
      </div>
    );
  }
}

export default XSplitInterface;
