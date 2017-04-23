import React from 'react';
import superficial from 'superficial';
import xjs from 'xjs-framework/dist/xjs-es2015';

const EXTENSION_SIZE = { width: 200, height: 100 };
const WEBSOCKET_URL = (process.env.NODE_ENV === 'production')
                        ? 'wss://cheerskevin.com/wss/'
                        : 'ws://127.0.0.1:9094';

class Extension extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { offline: true };
  }

  componentDidMount() {
    this.app = new xjs.App();
    resizeXsplitWindow();
    this.addListener();
  }

  componentWillUnmount() { clearTimeout(this.timer); }

  addListener = () => {
    this.timer = setTimeout(() => {
      const ws = new global.WebSocket(WEBSOCKET_URL);
      ws.onclose = this.addListener;
      ws.onmessage = this.handleMessage;
      ws.onopen = () => ws.send('xsplit');
    }, 1000);
  }

  handleMessage = ({ data }) => {
    const parsed = JSON.parse(data);
    const { mode: { currentMode }} = parsed;
    const offline = (currentMode === 'offline');
    if (offline !== this.state.offline) this.setState({ offline });
    this.resolveXsplit(parsed);
  }

  resolveXsplit = (data) => {
    const { mode: { currentMode }} = data;
    this.app.setPrimaryMicEnabled(
      currentMode !== 'away' && currentMode !== 'preshow'
    );
    twitchOutput((output) => {
      if (currentMode === 'offline') {
        output.stopBroadcast();
      } else {
        output.startBroadcast();
      }
    });
  }

  render() {
    const { offline } = this.state;
    return (
      <div looks={this.looks.container}>
        <p looks={[ this.looks.text, offline && this.looks.textOffline ]}>
          Twoverlay
        </p>
      </div>
    );
  }
}

Extension.looks = {
  container: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    boxSizing: 'border-box',
    border: '1px solid #000',
    width: `${EXTENSION_SIZE.width}px`,
    height: `${EXTENSION_SIZE.height}px`,
    fontSize: '28px',
    textAlign: 'center',
    lineHeight: '100px',
    background: `
      radial-gradient(black 15%, transparent 16%) 0 0,
      radial-gradient(black 15%, transparent 16%) 8px 8px,
      radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 0 1px,
      radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 8px 9px`,
    backgroundColor: '#282828',
    backgroundSize: '16px 16px',
    boxShadow: 'inset 0px 0px 50px #000',
  },
  text: {
    margin: 0,
    background: 'linear-gradient(to top, #555 40%, #ccc 49%, #fff 50%, #ccc 51%, #555 60%)',
    textShadow: '0px 0px 10px rgba(255, 0, 0, 0.8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  textOffline: {
    textShadow: '1px 1px 1px rgba(0, 0, 0, 0.2)'
  }
};

function resizeXsplitWindow() {
  const { width, height } = EXTENSION_SIZE;
  xjs.ready().then(() => {
    xjs.ExtensionWindow.getInstance().resize(width, height);
  }).catch(() => {});
}

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
    ).catch(() => {});
}

export default superficial(Extension);
