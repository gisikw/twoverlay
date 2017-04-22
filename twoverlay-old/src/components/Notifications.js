import React from 'react';

const Notifications = ({ message, pct, style }) => {
  if (!message) return null;
  return (
    <div style={Object.assign({}, styles.container, style)}>
      <div style={styles.message(pct)}>
        { message }
      </div>
    </div>
  );
};

const styles = {
  container: {
    color: '#fff',
    textAlign: 'center',
  },
  message: pct => ({
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
    right: `${pct * 100}px`,
  }),
};

Notifications.propTypes = {
  message: React.PropTypes.string,
  pct: React.PropTypes.number,
  style: React.PropTypes.any,
};

export default Notifications;
