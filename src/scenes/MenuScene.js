import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'menu' });
  }

  create() {
    // this.add.image(400, 300, 'rocket');

    this.add.text(this.game.config.width / 2, this.game.config.height / 2, 'Rocket Patrol\nin Phaser 3 & Parcel\n\n>>play<<', {
      align: 'center',
      fill: 'white',
      fontFamily: 'sans-serif',
      fontSize: 48
    }).setOrigin(0.5, 0);

    this.input.on('pointerdown', function () {
      this.scene.switch('play');
    }, this);
  }
}
