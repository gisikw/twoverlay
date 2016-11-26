import React from 'react';
import game from '../games/starter';

const GAME_DIV_ID = 'gamePanel';

class GamePanel extends React.Component {
  componentDidMount() {
    game.init(GAME_DIV_ID, this.props.pct, this.props.registerListener);
  }

  render() {
    const { bg, style } = this.props;
    return (
      <div
        id={GAME_DIV_ID}
        {...{ style: Object.assign({ background: bg }, style) }}
      />
    );
  }
}

GamePanel.propTypes = {
  pct: React.PropTypes.number,
  bg: React.PropTypes.any,
  style: React.PropTypes.any,
  registerListener: React.PropTypes.func,
};

export default GamePanel;
