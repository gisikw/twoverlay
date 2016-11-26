import React, { Component } from 'react';
import ChatWindow from './components/ChatWindow';
import Notifications from './components/Notifications';
import GamePanel from './components/GamePanel';
import store from './store';

const MESSAGE_CYCLE_RATE = 2e3;

class Twoverlay extends Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
    global.addEventListener('resize', () => this.forceUpdate());
  }

  componentDidUpdate() { this.handleCycle(); }
  handleCycle() {
    if (store.getState().notifications.length && !this.cycler) {
      this.cycler = setTimeout(() => {
        store.dispatch({ type: 'cycleNotifications' });
        this.cycler = null;
        this.handleCycle();
      }, MESSAGE_CYCLE_RATE);
    }
  }

  render() {
    const pct = browserPct();
    const { away, messages, bottomColor, notifications } = store.getState();
    return (
      <div style={styles.twoverlay(pct)}>
        <div style={styles.smallWindow(pct, away)} />
        <div style={styles.bigWindow(pct, away)} />
        <ChatWindow {...{ style: styles.chat(pct), messages, pct }} />
        <GamePanel
          {...{
            style: styles.gamePanel(pct),
            bg: bottomColor || '#9a9',
            store,
            pct,
          }}
        />
        <Notifications
          {...{
            style: styles.notifications(pct),
            message: notifications[0],
            pct,
          }}
        />
      </div>
    );
  }
}


function browserPct() {
  return Math.min(
    global.document.documentElement.clientWidth / 1920,
    global.document.documentElement.clientHeight / 1080,
  );
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
