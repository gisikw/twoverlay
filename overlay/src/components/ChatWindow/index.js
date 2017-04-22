import React from 'react';
import superficial from 'superficial';
import ChatMessage from './ChatMessage';

function ChatWindow({ width, data }, looks) {
  const { chat } = data;
  const css =
    `#chatWindow img { height: ${22 * (width / 1920)}px; vertical-align: bottom; }`;
  return (
    <div id="chatWindow" looks={looks.container}>
      <style>{css}</style>
      <div looks={looks.gradient} />
      { chat.map((msg, i) =>
          <ChatMessage {...{ key: msg[1].id, first: i === 0, msg }} />) }
    </div>
  );
}

ChatWindow.looks = {
  container: {
    position: 'absolute',
    boxSizing: 'border-box',
    right: 0,
    bottom: 0,
    color: '#fff',
    fontFamily: 'Consolas, monaco, monospace',
    background: 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3d' +
                'y53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczL' +
                'm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCI+Cjxma' +
                'Wx0ZXIgaWQ9Im4iPgo8ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZ' +
                'SIgYmFzZUZyZXF1ZW5jeT0iLjciIG51bU9jdGF2ZXM9IjEwIiBzdGl0Y2hUa' +
                'Wxlcz0ic3RpdGNoIj48L2ZlVHVyYnVsZW5jZT4KPC9maWx0ZXI+CjxyZWN0I' +
                'HdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjMDAwIj48L3JlY3Q+C' +
                'jxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiBmaWx0ZXI9InVybCgjb' +
                'ikiIG9wYWNpdHk9IjAuNCI+PC9yZWN0Pgo8L3N2Zz4=")',
    overflow: 'hidden',
    wordWrap: 'break-word',
    breakWord: 'all',
    zIndex: 1,
    0: {
      height: 0,
      width: 0,
      lineHeight: 0,
      fontSize: 0,
      marginBottom: 0,
      padding: '0px 0px',
    },
    1920: {
      height: '780px',
      width: '400px',
      lineHeight: '24px',
      fontSize: '22px',
      padding: '8px 10px',
    },
  },
  gradient: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    top: '20%',
    background: 'linear-gradient(to top, #000, transparent)',
  }
};

export default superficial(ChatWindow);
