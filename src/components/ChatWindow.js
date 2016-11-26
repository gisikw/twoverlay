import React, { Component } from 'react';
import { client as tmi } from 'tmi.js';
import ChatMessage from './ChatMessage';

const DEFAULT_MESSAGE = [
  '#cheerskevin',
  { username: 'Twoverlay Chat', id: 'key', emotes: {}, badges: { moderator: '1' } },
  'Welcome to the chat',
];

const options = {
  connection: { reconnect: true, secure: true }, channels: ['#cheerskevin'],
};

class ChatWindow extends Component {
  constructor() {
    super();
    this.state = { messages: [DEFAULT_MESSAGE] };
  }

  componentDidMount() {
    const client = tmi(options);
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
        messages: [args].concat(this.state.messages).slice(0, 50),
      });
    });
  }

  render() {
    return (
      <div id="chat" style={Object.assign({}, styles.container, this.props.style)}>
        <div style={styles.overlay} />
        <ChatMessage
          message={this.state.messages[0]}
          pct={this.props.pct}
          first
        />
        {
          this.state.messages.slice(1).map(msg =>
            <ChatMessage message={msg} pct={this.props.pct} key={msg[1].id} />)
        }
      </div>
    );
  }
}

ChatWindow.propTypes = {
  pct: React.PropTypes.number,
  style: React.PropTypes.any,
  onMessage: React.PropTypes.func,
  colorify: React.PropTypes.func,
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
};

export default ChatWindow;
