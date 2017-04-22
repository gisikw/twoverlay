const WEBSOCKET_URL = 'wss://cheerskevin.com/wss/';

class TopLevelComponent extends React.Component {
  constructor(...args) {
    super(..args);
    this.state = {};
    this.addListener = this.addListener.bind(this);
    this.addListener();
  }

  componentWillUnmount() { clearTimeout(this.timer); }

  addListener() {
    this.timer = setTimeout(() => {
      const ws = new global.WebSocket(WEBSOCKET_URL);
      ws.onclose = () => { this.addListener() };
      ws.onmessage = (json) => {
        this.setState({ data: JSON.parse(json) });
      };
    }, 1000);
  }

  render() {
    const { data } = this.state;
    if (!data) return null;
    return (
      <div>
        {
          React.Children(this.props.children).map(child =>
            React.cloneElement(child, { data }))
        }
      </div>
    );
  }

}
