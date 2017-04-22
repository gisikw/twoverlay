import React from 'react';
import superficial from 'superficial';
import CoverScreen from './CoverScreen';
import ChatWindow from './ChatWindow';
import GamePanel from './GamePanel';

const {
  addEventListener,
  removeEventListener,
  document: { documentElement },
} = global;

class Overlay extends React.Component {
  constructor(...args) {
    super(...args);
    const { clientWidth, clientHeight } = documentElement;
    this.state = { clientWidth, clientHeight };
    this.setSize = this.setSize.bind(this);
  }

  componentDidMount() {  addEventListener('resize', this.setSize); }
  componentWillUnmount() { removeEventListener('resize', this.setSize); }

  setSize() {
    const { clientWidth, clientHeight } = documentElement;
    this.setState({ clientWidth, clientHeight });
  }

  render() {
    const { data } = this.props;
    const style = aspect16x9(this.state);
    const { width } = style;
    return (
      <div
        looks={this.looks.container}
        style={style}
      >
        <CoverScreen {...{ width, data }} />
        <ChatWindow {...{ width, data }} />
        <GamePanel {...{ width, data }} />
      </div>
    );
  }
}

function aspect16x9({ clientWidth, clientHeight }) {
  return {
    width: Math.min(clientWidth, clientHeight * (16 / 9)),
    height: Math.min(clientHeight, clientWidth * (9 / 16)),
  };
}

Overlay.looks = {
  container: { position: 'relative' },
}

export default superficial(Overlay);
