import React, { Component }  from 'react';
import { client as tmi } from 'tmi.js';

const options = {
  connection: { reconnect: true, secure: true },
  channels: [ '#cheerskevin' ],
};
const colorCache = {
  cheerskevin: '#d83ec4',
  'Twoverlay Chat': '#ff60f3',
};

const randomColor = () => '#' + `00000${Math.floor(Math.random()*0xFFFFFF).toString(16)}`.slice(-6);

class ChatWindow extends Component {

  constructor() {
    super();
    this.state = { messages: [
      [
        '#cheerskevin',
        {
          username: 'Twoverlay Chat',
          id: 'key',
          emotes: {},
          badges: { moderator: '1' },
        },
        'Welcome to the chat',
      ]
    ] };
  }

  componentDidMount() {
    var client = new tmi(options);
    client.connect();
    client.on('message', (...args) => {
      if (args[2].match(/^#[a-f0-9]{3}(?:[a-f0-9]{3})?$/i)) {
        this.props.colorify(args[2]);
      }
      this.props.onMessage({
        sender: args[1].username || args[1]['display-name'],
        message: args[2],
      });
      this.setState({
        messages: [args].concat(this.state.messages).slice(0,50)
      });
    });
  }

  badges(userState) {
    if (!userState.badges) return '';
    if (userState.badges.broadcaster) {
      return (
        <span>
          <img style={styles.emoji(this.props.pct)} src='https://static-cdn.jtvnw.net/badges/v1/5527c58c-fb7d-422d-b71b-f309dcb85cc1/1' />
          {' '}
        </span>
      );
    }
    if (userState.badges.moderator) {
      return (
        <span>
          <img style={styles.emoji(this.props.pct)} src='https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/1' />
          {' '}
        </span>
      );
    }
    return '';
  }

  formattedMessage([channel, userState, message], isFirst) {
    let name = userState.username || userState['display-name'];
    let color = userState.color || colorCache[name] || (colorCache[name] = randomColor());
    return (
      <div key={userState.id} style={styles.message(this.props.pct, isFirst) }>
        { this.badges(userState) }
        <span style={styles.username(color)}>{ name }:</span>
        {' '}
        <span>
          { this.emojify(message, userState.emotes) }
        </span>
      </div>
    );
  }

  emojify(message, emotes) {
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
        msgArray.push(<img key={i} style={styles.emoji(this.props.pct) }src={`http://static-cdn.jtvnw.net/emoticons/v1/${replacements[marker]}/1.0`} />);
        msgArray.push(replacementString.slice(end+1, replacementString.length));
      });
    return msgArray;
  }

  render() {
    return (
      <div id='chat' style={ Object.assign({}, styles.container, this.props.style) }>
        <div style={ styles.overlay } />
        { this.formattedMessage(this.state.messages[0], true) }
        { this.state.messages.slice(1).map((args) => this.formattedMessage(args)) }
      </div>
    );
  }
};

const styles = {
  container: {
    color: '#fff',
    fontFamily: 'Consolas, monaco, monospace',
    boxSizing: 'border-box',
    padding: '8px 10px',
    background: 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCI+CjxmaWx0ZXIgaWQ9Im4iPgo8ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjciIG51bU9jdGF2ZXM9IjEwIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIj48L2ZlVHVyYnVsZW5jZT4KPC9maWx0ZXI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjMDAwIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiBmaWx0ZXI9InVybCgjbikiIG9wYWNpdHk9IjAuNCI+PC9yZWN0Pgo8L3N2Zz4=")',
  },
  overlay: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    top: '20%',
    background: 'linear-gradient(to top, #000, transparent)',
  },
  message: (pct, isFirst) => {
    return Object.assign({},
      {
        lineHeight: `${24 * pct}px`,
        fontSize: `${22 * pct}px`,
        marginBottom: `${6 * pct}px`,
        wordWrap: 'break-word',
        breakWord: 'all',
      },
      isFirst ? {
        animation: 'scaleUp 0.4s ease-in-out 1'
      } : {}
    )
  },
  emoji: (pct) => ({
    height: `${22 * pct}px`,
    verticalAlign: 'bottom',
  }),
  username: (color) => ({
    fontWeight: 'bold',
    color,
  })
};

export default ChatWindow;
