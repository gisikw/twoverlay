import React from 'react';
import ChatMessage from './ChatMessage';

const ChatWindow = ({ style, messages, pct }) => (
  <div id="chat" style={Object.assign({}, styles.container, style)}>
    <div style={styles.overlay} />
    {
      messages.map((msg, i) =>
        <ChatMessage
          {...{ message: msg, key: msg[1].id, first: i === 0, pct }}
        />,
      )
    }
  </div>
);

const styles = {
  container: {
    color: '#fff',
    fontFamily: 'Consolas, monaco, monospace',
    boxSizing: 'border-box',
    padding: '8px 10px',
    background: 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3d' +
                'y53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczL' +
                'm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCI+Cjxma' +
                'Wx0ZXIgaWQ9Im4iPgo8ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZ' +
                'SIgYmFzZUZyZXF1ZW5jeT0iLjciIG51bU9jdGF2ZXM9IjEwIiBzdGl0Y2hUa' +
                'Wxlcz0ic3RpdGNoIj48L2ZlVHVyYnVsZW5jZT4KPC9maWx0ZXI+CjxyZWN0I' +
                'HdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjMDAwIj48L3JlY3Q+C' +
                'jxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiBmaWx0ZXI9InVybCgjb' +
                'ikiIG9wYWNpdHk9IjAuNCI+PC9yZWN0Pgo8L3N2Zz4=")',
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

ChatWindow.propTypes = {
  pct: React.PropTypes.number,
  style: React.PropTypes.any,
  messages: React.PropTypes.array,
};

export default ChatWindow;
