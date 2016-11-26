import React, { Component } from 'react';

const MESSAGE_CYCLE_RATE = 2e3
const DESIGN_REFERENCE_SIZE = 1520;
const WEBSOCKET_URL = (process.env.NODE_ENV === 'production')
                        ? 'wss://cheerskevin.com/wss/'
                        : 'ws://localhost:6400';

class Notifications extends Component {
  constructor() {
    super();
    this.state = { messages: [] };
  }

  componentDidMount() {
    this.spawnWebsocket();
  }

  spawnWebsocket() {
    setTimeout(() => {
      this.w = new WebSocket(WEBSOCKET_URL);

      this.w.onclose = () => {
        this.spawnWebsocket();
      };

      this.w.onmessage = (msg) => {
        if (msg.data === 'reload!') {
          window.location.reload();
        } else {
          this.setState({ messages: this.state.messages.concat([msg.data]) });
        }
      };
    }, 1000);
  }

  displayNextMessage() {
    this.setState({
      messages: this.state.messages.slice(1),
    });
  }

  ensureMessageCycling() {
    if (this.state.messages.length && !this.refresher) {
      this.refresher = setTimeout(() => {
        this.refresher = null;
        this.displayNextMessage();
      }, MESSAGE_CYCLE_RATE);
    }
  }

  render() {
    let currentMessage = this.state.messages[0];
    let pct = this.props.width / DESIGN_REFERENCE_SIZE;
    this.ensureMessageCycling();
    return (
      <div style={ Object.assign({}, styles.container, this.props.style) }>
        <Message {...{pct}} >{ currentMessage }</Message>
      </div>
    );
  }
}

const Message = ({ children, pct }) => {
  if (!children) return null;
  return (
    <div style={ styles.message(pct) }>
      { children }
    </div>
  );
};

const styles = {
  container: {
    color: '#fff',
    textAlign: 'center',
  },
  message: (pct) => ({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    fontFamily: 'Impact, Charcoal, sans-serif',
    letterSpacing: '0.6px',
    color: '#efe',
    lineHeight: '1.4',
    fontSize: `${pct * 64}px`,
    background: 'rgba(0,0,0,0.6)',
    padding: `${pct * 20}px ${pct * 20}px`,
    left: `${pct * 100}px`,
    right:`${pct * 100}px`,
  }),
};

export default Notifications;
