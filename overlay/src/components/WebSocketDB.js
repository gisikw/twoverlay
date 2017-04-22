import React from 'react';
const WEBSOCKET_URL = 'ws://127.0.0.1:9094';

class WebSocketDB extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
    this.addListener = this.addListener.bind(this);
    this.addListener();
  }

  componentWillUnmount() { clearTimeout(this.timer); }

  addListener() {
    this.timer = setTimeout(() => {
      const ws = new global.WebSocket(WEBSOCKET_URL);
      ws.onclose = () => { this.addListener() };
      ws.onmessage = ({ data }) => {
        this.setState({ data: JSON.parse(data) });
      };
    }, 1000);
  }

  render() {
    const { data } = this.state;
    if (!data) return null;
    return (
      <div>
        {
          React.Children.map(this.props.children, child =>
            React.cloneElement(child, { data }))
        }
      </div>
    );
  }
}

export default WebSocketDB
