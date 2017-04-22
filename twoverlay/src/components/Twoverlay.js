import React, { Component } from 'react';
import ChatWindow from './ChatWindow';
import Notifications from './Notifications';
import GamePanel from './GamePanel';
import CoverScreen from './CoverScreen';

class Twoverlay extends Component {
  componentDidMount() {
    this.props.store.subscribe(() => this.forceUpdate());
    global.addEventListener('resize', () => this.forceUpdate());
  }

  render() {
    const pct = browserPct();
    const { chat, gamePanelColor, notifications, cover } =
      this.props.store.getState();
    return (
      <div style={styles.twoverlay(pct)}>
        <CoverScreen
          {...{
            style: styles.cover(pct, cover.showCam),
            primary: cover.primary,
            secondary: cover.secondary,
            seconds: cover.seconds,
            active: cover.active,
            showCam: cover.showCam,
            pct,
          }}
        />
        <ChatWindow {...{ style: styles.chat(pct), chat, pct }} />
        <GamePanel
          {...{
            style: styles.gamePanel(pct),
            bg: gamePanelColor,
            store: this.props.store,
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

Twoverlay.propTypes = {
  store: React.PropTypes.shape({
    subscribe: React.PropTypes.func,
    getState: React.PropTypes.func,
  }).isRequired,
};

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
  cover: (pct, showCam) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: showCam ? `${400 * pct}px` : 0,
    height: `${((pct * (1920 - 400)) / 16) * 9}px`,
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
