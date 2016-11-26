import React, { Component } from 'react';
import game from '../games/starter';

const GAME_DIV_ID = 'gamePanel';

class GamePanel extends Component {
  componentDidMount() {
    game.init(GAME_DIV_ID, this.props.pct, this.props.registerListener)
  }

  render() {
    const { bg, style } = this.props;
    return (
      <div id={GAME_DIV_ID} {...{
        style: Object.assign({ background: bg }, style)
      }} />
    );
  }
}

export default GamePanel;
