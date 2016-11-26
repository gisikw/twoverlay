import React, { Component } from 'react';
import ChatWindow from './components/ChatWindow';
import Notifications from './components/Notifications';
import GamePanel from './components/GamePanel';

let chatListener;

class Twoverlay extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    global.addEventListener('resize', () => this.forceUpdate());
    global.addEventListener('keyup', (e) => {
      if (e.keyCode === 32) {
        this.setState({ away: !this.state.away });
      }
    });
  }

  colorify(hex) {
    this.setState({ bottomColor: hex });
  }

  render() {
    const pct = Math.min(
      global.document.documentElement.clientWidth / 1920,
      global.document.documentElement.clientHeight / 1080,
    );
    return (
      <div style={styles.twoverlay(pct)}>
        { /* Needs background, but overlapped by content */ }
        { <div style={styles.smallWindow(pct, this.state.away)} /> }
        { <div style={styles.bigWindow(pct, this.state.away)} /> }

        { /* Dynamic content */ }
        <ChatWindow
          {...{
            style: styles.chat(pct),
            onMessage: args => chatListener && chatListener(args),
            colorify: hex => this.colorify(hex),
            pct,
          }}
        />
        <GamePanel
          {...{
            style: styles.gamePanel(pct),
            bg: this.state.bottomColor || '#9a9',
            registerListener: fn => (chatListener = fn),
            pct,
          }}
        />
        <Notifications
          {...{
            style: styles.notifications(pct),
            width: pct * 1520,
            height: pct * 855,
          }}
        />
      </div>
    );
  }
}

const styles = {
  twoverlay: pct => ({
    height: `${pct * 1080}px`,
    position: 'relative',
    width: `${pct * 1920}px`,
    margin: '0 auto',
    overflow: 'hidden',
  }),
  smallWindow: (pct, away) => ({
    background: away ? '#000' : 'transparent',
    height: `${pct * 300}px`,
    position: 'absolute',
    right: 0,
    top: 0,
    width: `${pct * 400}px`,
  }),
  bigWindow: (pct, away) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: `${pct * (1920 - 400)}px`,
    height: `${((pct * (1920 - 400)) / 16) * 9}px`,
    background: away ? '#000' : 'transparent',
  }),
  chat: pct => ({
    bottom: 0,
    position: 'absolute',
    right: 0,
    top: `${pct * 300}px`,
    width: `${pct * 400}px`,
  }),
  gamePanel: pct => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: `${pct * 401}px`,
    height: `${(pct * 1080) - (((pct * (1920 - 400)) / 16) * 9)}px`,
  }),
  notifications: pct => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: `${pct * 1520}px`,
    height: `${pct * 855}px`,
  }),
};

export default Twoverlay;
