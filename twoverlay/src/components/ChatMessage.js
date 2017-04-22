import React from 'react';

const EMOJI_URL = 'http://static-cdn.jtvnw.net/emoticons/v1';
const BADGE_URL = 'https://static-cdn.jtvnw.net/badges/v1';
const BADGE_SRC = {
  broadcaster:
    `${BADGE_URL}/5527c58c-fb7d-422d-b71b-f309dcb85cc1/1`,
  moderator:
    `${BADGE_URL}/3267646d-33f0-4b17-b3df-f923a41db1d0/1`,
};

const colorCache = {
  cheerskevin: '#d83ec4',
  'Twoverlay Chat': '#ff60f3',
};

function ChatMessage({ message, pct, first }) {
  const userState = message[1];
  const msg = message[2];
  const name = displayName(userState);
  return (
    <div style={styles.message(pct, first)}>
      { badges(userState, pct) }
      <span style={styles.username(displayColor(userState, name))}>
        { name }:
      </span>
      {' '}
      <span>
        { messageWithEmoji(msg, userState.emotes, pct) }
      </span>
    </div>
  );
}

ChatMessage.propTypes = {
  message: React.PropTypes.array,
  pct: React.PropTypes.number,
  first: React.PropTypes.bool,
};

function displayName(userState) {
  return userState.username || userState['display-name'];
}

function displayColor(userState, name) {
  if (userState.color) return userState.color;
  if (!colorCache[name]) colorCache[name] = nextColor();
  return colorCache[name];
}

function nextColor() {
  return `hsl(${(Object.keys(colorCache).length * 70) % 360}, 100%, 60%)`;
}

function messageWithEmoji(message, emotes, pct) {
  if (!emotes || !Object.keys(emotes).length) return message;
  const replacements = Object.keys(emotes).reduce((h, icon) => (
    emotes[icon].reduce((o, markers) =>
      Object.assign({}, o, { [markers]: icon }), {})
  ), {});
  const msgArray = [message];
  let offset = 0;
  Object
    .keys(replacements)
    .sort((a, b) =>
      parseInt(a.split('-')[0], 10) - parseInt(b.split('-')[0], 10),
    )
    .forEach((marker, i) => {
      const start = parseInt(marker.split('-')[0], 10) - offset;
      const end = parseInt(marker.split('-')[1], 10) - offset;
      offset = offset + end + 1;
      const replacementString = msgArray.pop();
      msgArray.push(replacementString.slice(0, start));
      msgArray.push(
        <img
          key={i}
          alt="emoji"
          style={styles.emoji(pct)}
          src={`${EMOJI_URL}/${replacements[marker]}/1.0`}
        />,
      );
      msgArray.push(replacementString.slice(end + 1, replacementString.length));
    });
  return msgArray;
}

function badges(userState, pct) {
  if (!userState.badges) return '';
  let badge;
  Object.keys(BADGE_SRC).every((key) => {
    if (userState.badges[key]) {
      badge = key;
      return false;
    }
    return true;
  });
  if (!badge) return '';
  return (
    <span>
      <img
        alt="badge"
        style={styles.emoji(pct)}
        src={BADGE_SRC[badge]}
      />
      {' '}
    </span>
  );
}

const styles = {
  message: (pct, isFirst) => (
    Object.assign({},
      {
        lineHeight: `${24 * pct}px`,
        fontSize: `${22 * pct}px`,
        marginBottom: `${6 * pct}px`,
        wordWrap: 'break-word',
        breakWord: 'all',
      },
      isFirst ? { animation: 'scaleUp 0.4s ease-in-out 1' } : {},
    )
  ),
  emoji: pct => ({ height: `${22 * pct}px`, verticalAlign: 'bottom' }),
  username: color => ({ fontWeight: 'bold', color }),
};

export default ChatMessage;
