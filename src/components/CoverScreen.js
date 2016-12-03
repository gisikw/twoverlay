import React from 'react';

const Cover = (props) => {
  const { style, pct, primary, secondary, seconds, active, showCam } = props;
  if (!active) return null;
  return (
    <div style={Object.assign({}, style, styles.container(showCam))}>
      <div style={styles.timer(pct)}>
        { seconds <= 0
            ? ''
            : `${Math.floor(seconds / 60)}:${`${seconds % 60}0`.slice(0, 2)}`
        }
      </div>
      <div style={styles.message(pct)}>
        { primary }
        <div style={styles.indented(pct)}>
          { secondary }
        </div>
      </div>
      <div style={styles.avatarBlock(pct)}>
        <img style={styles.avatar(pct)} src="./cheerskevin.jpg" alt="avatar" />
        <div style={styles.avatarName(pct)}>
          @cheerskevin
        </div>
      </div>
    </div>
  );
};

Cover.propTypes = {
  style: React.PropTypes.object,
  primary: React.PropTypes.string,
  secondary: React.PropTypes.string,
  seconds: React.PropTypes.number,
  showCam: React.PropTypes.bool,
  active: React.PropTypes.bool,
  pct: React.PropTypes.number,
};

const styles = {
  container: showCam => ({
    backgroundColor: '#000',
    backgroundImage: 'url("./background.jpg")',
    backgroundSize: showCam ? '170vh' : 'cover',
    fontFamily: 'Roboto Thin, sans-serif',
    color: '#fcc',
  }),
  timer: pct => ({
    position: 'absolute',
    right: 0,
    top: 0,
    fontSize: `${128 * pct}px`,
    textAlign: 'center',
    lineHeight: `${300 * pct}px`,
    width: `${400 * pct}px`,
    height: `${300 * pct}px`,
  }),
  message: pct => ({
    position: 'absolute',
    left: `${50 * pct}px`,
    top: `${60 * pct}px`,
    fontSize: `${150 * pct}px`,
  }),
  indented: pct => ({
    textIndent: `${120 * pct}px`,
  }),
  avatarBlock: pct => ({
    position: 'absolute',
    bottom: `${50 * pct}px`,
    left: `${50 * pct}px`,
    fontSize: `${72 * pct}px`,
  }),
  avatar: pct => ({
    width: `${200 * pct}px`,
    display: 'inline-block',
    verticalAlign: 'top',
  }),
  avatarName: pct => ({
    display: 'inline-block',
    lineHeight: `${200 * pct}px`,
    verticalAlign: 'top',
    marginLeft: `${80 * pct}px`,
  }),
};

export default Cover;
