import React from 'react';
import superficial from 'superficial';
import starter from '../games/starter';

const GAME_DIV_ID = 'gamePanel';

class GamePanel extends React.Component {
  componentDidMount() {
    starter({
      id: GAME_DIV_ID,
      width: this.props.width,
      height: (this.props.width / 1920) * 225,
      subscribe: (f) => this.notify = f,
    });
  }

  componentWillReceiveProps(nextProps) {
    const [ newX, newY ] = nextProps.data.game.coordinates;
    const [ x, y ] = this.props.data.game.coordinates;
    if (newX !== x || newY !== y) {
      if (this.notify) this.notify(newX, newY);
    }
  }

  render() {
    const { data: { game } } = this.props;
    const { background } = game;
    return (
      <div
        id={GAME_DIV_ID}
        looks={this.looks.container}
        style={{ background }}
      />
    );
  }
}

GamePanel.looks = {
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    0: { width: 0, height: 0 },
    1920: { width: '1520px', height: '225px' },
  },
};

export default superficial(GamePanel);
