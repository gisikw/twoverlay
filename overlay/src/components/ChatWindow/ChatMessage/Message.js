import React from 'react';
import BTTV_EMOJI from './bttv.json';

const EMOJI_URL = 'http://static-cdn.jtvnw.net/emoticons/v1';

function Message({ message, userState: { emotes } }) {
  const parsedMessage = injectBTTVEmoji(injectTwitchEmoji(message, emotes));
  return <span>{parsedMessage}</span>;
}

function injectTwitchEmoji(message, emotes) {
  if (!emotes || !Object.keys(emotes).length) return message;
  const replacements = Object.keys(emotes).reduce((h, icon) => (
    Object.assign({}, h, emotes[icon].reduce((o, markers) =>
      Object.assign({}, o, { [markers]: icon }), {}))
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
          src={`${EMOJI_URL}/${replacements[marker]}/1.0`}
        />,
      );
      msgArray.push(replacementString.slice(end + 1, replacementString.length));
    });
  return msgArray;
}

function injectBTTVEmoji(message) {
  if (Array.isArray(message)) return message.map(injectBTTVEmoji);
  if (typeof message !== "string") return message;
  return message.split(/\s+/).map((t, i) => {
    const match = BTTV_EMOJI.emotes.find(emote => t === emote.regex);
    return match
      ? <img key={`b${i}`} alt={t} src={match.url} />
      : t;
  }).reduce((acc, t) => acc.concat(t, ' '), []);
}

export default Message;
