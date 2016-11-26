global.PIXI = require('phaser/build/custom/pixi');
global.p2 = require('phaser/build/custom/p2');
global.Phaser = require('phaser/build/custom/phaser-split');

const DEBUG = true;
const AVATAR_SCALE = 3;
const SPRITE_SIZE = 16;
const NEAR_DISTANCE = 10;
const WALKING_SPEED = 150;
const NEW_TARGET_PROBABILITY = 0.0001;
const PLAYER_CHARACTER = 'man';
const CHARACTER_OFFSETS = { baby: 0, man: 3, woman: 6, alien: 9 };

export default {
  init(id, pct, register) {
    const Phaser = global.Phaser;
    const SCALE_X = 1520 * pct;
    const SCALE_Y = 225 * pct;
    let targetX;
    let targetY;
    let player;
    const game = new Phaser.Game(SCALE_X, SCALE_Y, Phaser.AUTO, id,
                                 { preload, create, render }, true);

    pickRandomTarget();

    register(({ message }) => {
      if (message.match(/^\d+,\s*\d+$/)) {
        pickXYTarget(
          parseInt(message.split(',')[0], 10),
          parseInt(message.split(',')[1], 10),
        );
      }
    });

    function preload() {
      game.load.spritesheet('characters', './games/starter/characters.png',
                            SPRITE_SIZE, SPRITE_SIZE);
      game.stage.disableVisibilityChange = true;
    }

    function create() {
      if (DEBUG) game.time.advancedTiming = true;
      player = character(PLAYER_CHARACTER);
      game.physics.arcade.enable(player);
    }

    function render() {
      if (DEBUG) displayDebugInformation();
      if (nearTarget()) {
        stopPlayer();
        if (Math.random() < NEW_TARGET_PROBABILITY) pickRandomTarget();
      } else chaseTarget();
    }

    function character(name) {
      const i = CHARACTER_OFFSETS[name];
      const chr = game.add.sprite(-AVATAR_SCALE * SPRITE_SIZE * 2,
                                game.world.centerY,
                                'characters');
      chr.scale.setTo(AVATAR_SCALE, AVATAR_SCALE);
      chr.animations.add('down', [i, i + 1, i + 2], 8, true);
      chr.animations.add('left', [i + 12, i + 13, i + 14], 8, true);
      chr.animations.add('right', [i + 24, i + 25, i + 26], 8, true);
      chr.animations.add('up', [i + 36, i + 37, i + 38], 8, true);
      chr.frame = i + 1;
      chr.restingFrame = i + 1;
      return chr;
    }

    function displayDebugInformation() {
      const rect = new Phaser.Rectangle(0, 0, 30, 18);
      const point = new Phaser.Point(targetX, targetY);
      game.debug.geom(rect, 'rgba(0,0,0,0.7)');
      game.debug.geom(point, 'rgba(255,255,0,1)');
      game.debug.text(game.time.fps, 2, 14, '#00ff00');
    }

    function nearTarget() {
      return game.physics.arcade.distanceToXY(player, targetX, targetY) <
             NEAR_DISTANCE;
    }

    function stopPlayer() {
      player.animations.stop();
      player.frame = player.restingFrame;
      player.body.velocity.y = player.body.velocity.x = 0;
    }

    function chaseTarget() {
      game.physics.arcade.moveToXY(player, targetX, targetY, WALKING_SPEED);
      if (Math.abs(player.body.velocity.x) > Math.abs(player.body.velocity.y)) {
        player.animations.play(player.body.velocity.x > 0 ? 'right' : 'left');
      } else {
        player.animations.play(player.body.velocity.y > 0 ? 'down' : 'up');
      }
    }

    function pickRandomTarget() {
      targetX = Math.random() * (SCALE_X - (AVATAR_SCALE * SPRITE_SIZE));
      targetY = Math.random() * (SCALE_Y - (AVATAR_SCALE * SPRITE_SIZE));
    }

    function pickXYTarget(x, y) {
      targetX = Math.max(Math.min(x, SCALE_X - (AVATAR_SCALE * SPRITE_SIZE)), 0);
      targetY = Math.max(Math.min(y, SCALE_Y - (AVATAR_SCALE * SPRITE_SIZE)), 0);
    }
  },
};
