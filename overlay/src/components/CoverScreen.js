import React from 'react';
import superficial from 'superficial';

const MESSAGES = {
  away: {
    primary: "Don't go away,",
    secondary: "I'll be right back!",
  },
  hidden: {
    primary: 'Screen hidden',
    secondary: 'Because secrets!',
  },
  preshow: {
    primary: 'Live in:',
  }
};

class CoverScreen extends React.Component {
  render() {
    const { mode, mode: { currentMode } } = this.props.data;
    const { primary, secondary } = MESSAGES[currentMode] || {};
    let remainingTime;
    let remainingSeconds;
    if (currentMode === 'away') {
      const resumeTime = mode.updatedAt + (mode.seconds * 1000);
      remainingSeconds = Math.ceil((resumeTime - Date.now()) / 1000);
    } else if (currentMode === 'preshow') {
      const startTime = mode.updatedAt + (10 * 60 * 1000);
      remainingSeconds = Math.ceil((startTime - Date.now()) / 1000);
    }
    if (remainingSeconds && remainingSeconds > 0) {
      remainingTime = formatSeconds(remainingSeconds);
      setTimeout(() => this.forceUpdate(), 1000);
    }
    return (
      <div
        looks={[
          this.looks.container,
          currentMode !== 'live' && this.looks.cover,
          currentMode === 'hidden' && this.looks.hidden,
        ]}
      >
        { remainingTime &&
          <div looks={this.looks.timer}>{remainingTime}</div>
        }
        { primary &&
          <div looks={this.looks.primary}>
            {primary}
            { secondary &&
              <div looks={this.looks.secondary}>
                {secondary}
              </div>
            }
          </div>
        }
        { currentMode !== 'live' &&
          <div looks={this.looks.avatarBlock}>
            <img
              looks={this.looks.avatar}
              src="./cheerskevin.jpg"
              alt="avatar"
            />
            <span>@cheerskevin</span>
          </div>
        }
      </div>
    );
  }
}

function formatSeconds(s) {
  return `${Math.floor(s / 60)}:${`0${s % 60}`.slice(-2)}`
}

CoverScreen.looks = {
  container: {
    0: { height: 0, width: 0 },
    1920: { height: '855px', width: '1920px' },
    fontFamily: 'Roboto Thin, sans-serif',
    color: '#fcc',
    position: 'relative',
  },
  hidden: { width: { 0: 0, 1920: '1520px' } },
  cover: {
    background: 'url("./background.jpg")',
    backgroundSize: { 0: '0 auto', 1920: '1920px auto' },
  },
  primary: {
    position: 'absolute',
    0: { fontSize: 0, left: 0, top: 0, right: 0 },
    1920: {
      fontSize: '150px', left: '120px', top: '60px', right: 0,
    },
  },
  secondary: {
    position: 'absolute',
    marginLeft: { 0: 0, 1920: '120px' },
  },
  avatarBlock: {
    position: 'absolute',
    bottom: { 0: 0, 1920: '50px' },
    left: { 0: 0, 1920: '120px' },
    fontSize: { 0: 0, 1920: '94px' },
    lineHeight: { 0: 0, 1920 : '200px' },
  },
  avatar: {
    verticalAlign: 'top',
    display: 'inline-block',
    width: { 0: 0, 1920: '200px' },
    marginRight: { 0: 0, 1920: '50px' },
  },
  timer: {
    position: 'absolute',
    right: 0,
    top: 0,
    textAlign: 'center',
    fontSize: { 0: 0, 1920: '128px' },
    lineHeight: { 0: 0, 1920: '300px' },
    width: { 0: 0, 1920: '400px' },
    height: { 0: 0, 1920: '300px' }
  }
};

export default superficial(CoverScreen);
