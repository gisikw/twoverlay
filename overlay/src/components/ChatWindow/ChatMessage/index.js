import React from 'react';
import Username from './Username';
import Message from './Message';

function ChatMessage({ msg, first }) {
  const [_, userState, message] = msg;
  return (
    <div>
      <Username {...userState} />:{' '}
      <Message {...{ message, userState }} />
    </div>
  );
}

export default ChatMessage;
