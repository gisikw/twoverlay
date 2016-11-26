import React from 'react';

const BADGE_SRC = {
  broadcaster: 'https://static-cdn.jtvnw.net/badges/v1/5527c58c-fb7d-422d-b71b-f309dcb85cc1/1',
  moderator: 'https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/1',
}

const colorCache = {
  cheerskevin: '#d83ec4',
  'Twoverlay Chat': '#ff60f3',
};

function ChatMessage({message, pct, first}) {
  const [channel, userState, msg] = message;
  const name = displayName(userState);
  return (
    <div key={userState.id} style={styles.message(pct, first) }>
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

function displayName(userState) {
  return userState.username || userState['display-name'];
}

function displayColor(userState, name) {
  if (userState.color) return userState.color;
  if (!colorCache[name]) colorCache[name] = randomColor();
  return colorCache[name];
}

const randomColor = () =>
  '#' + `00000${Math.floor(Math.random()*0xFFFFFF).toString(16)}`.slice(-6);

function messageWithEmoji(message, emotes, pct) {
  if (!emotes || !Object.keys(emotes).length) return message;
  let replacements = Object.keys(emotes).reduce((h, icon) => {
    emotes[icon].forEach((markers) => h[markers] = icon); return h;
  }, {});

  let msgArray = [message];
  let offset = 0;
  Object
    .keys(replacements)
    .sort((a,b) => parseInt(a.split('-')[0]) - parseInt(b.split('-')[0]))
    .forEach((marker, i) => {
      let start = parseInt(marker.split('-')[0]) - offset;
      let end = parseInt(marker.split('-')[1]) - offset;
      offset = offset + end + 1;
      let replacementString = msgArray.pop();
      msgArray.push(replacementString.slice(0, start));
      msgArray.push(<img key={i} style={styles.emoji(pct) }src={`http://static-cdn.jtvnw.net/emoticons/v1/${replacements[marker]}/1.0`} />);
      msgArray.push(replacementString.slice(end+1, replacementString.length));
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
        style={styles.emoji(pct)}
        src={ BADGE_SRC[badge] }
      />
      {' '}
    </span>
  );
}

const styles = {
  message: (pct, isFirst) => {
    return Object.assign({},
      {
        lineHeight: `${24 * pct}px`,
        fontSize: `${22 * pct}px`,
        marginBottom: `${6 * pct}px`,
        wordWrap: 'break-word',
        breakWord: 'all',
      },
      isFirst ? { animation: 'scaleUp 0.4s ease-in-out 1' } : {},
    )
  },
  emoji: (pct) => ({ height: `${22 * pct}px`, verticalAlign: 'bottom' }),
  username: (color) => ({ fontWeight: 'bold', color }),
};

export default ChatMessage;
