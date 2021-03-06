import Phaser from 'phaser';
import images_starfield from 'url:../assets/starfield.png';
import images_hook from 'url:../assets/hook.png';
import images_key_bg from 'url:../assets/Key_BG.png';
import images_mantaray from 'url:../assets/manta_anim.png';
import images_boat from 'url:../assets/boat_anim.png';
import images_waves from 'url:../assets/waves_anim.png';
import images_oceangradient from 'url:../assets/ocean_gradient.png';
import images_explosion from 'url:../assets/explosion.png';
import sounds_explosion38 from 'url:../assets/explosion38.wav';
import sounds_rocket_shot from 'url:../assets/rocket_shot.wav';
import sounds_soundtrack from 'url:../assets/The_Spyprobe_-_Oceanforms.mp3';

import images_bottle1 from 'url:../assets/Bottle1.png';
import images_tire1 from 'url:../assets/Tire1.png';
import images_bag1 from 'url:../assets/Bag1.png';
import images_bag2 from 'url:../assets/Bag2.png';
import images_bag3 from 'url:../assets/Bag3.png';
import images_bag4 from 'url:../assets/Bag4.png';
//https://www.jamendo.com/track/970793/oceanforms by the THE SPYPROBE (CC)

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'boot' });
  }

  preload() {
    var bg = this.add.rectangle(this.game.config.width / 2, this.game.config.height / 2, 400, 30, 0x666666).setOrigin(0.5, 0.5);
    var bar = this.add.rectangle(bg.x, bg.y, bg.width, bg.height, 0xffffff).setScale(0, 1).setOrigin(0.5, 0.5);

    this.load.image("starfield", images_starfield);
    this.load.image('key_bg', images_key_bg);
    this.load.image('hook', images_hook);
    this.load.image('bottle1', images_bottle1);
    this.load.image('tire1', images_tire1);
    this.load.image('bag1', images_bag1);
    this.load.image('bag2', images_bag2);
    this.load.image('bag3', images_bag3);
    this.load.image('bag4', images_bag4);
    this.load.image('waves', images_waves);// { frameWidth: 64, frameHeight: 4, startFrame: 0, endFrame: 9 };
    this.load.image('oceangradient', images_oceangradient);
    this.load.spritesheet('manta', images_mantaray, { frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 10 });
    this.load.spritesheet('boat', images_boat, { frameWidth: 64, frameHeight: 48, startFrame: 0, endFrame: 9 });
    this.load.spritesheet('explosion', images_explosion, { frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9 });
    this.load.audio('sfx_explosion', sounds_explosion38);
    this.load.audio('sfx_rocket', sounds_rocket_shot);
    this.load.audio('soundtrack', sounds_soundtrack)

    this.load.on('progress', function (progress) {
      bar.setScale(progress, 1);
    });
  }

  update() {
    // this.scene.start('menu');
    this.scene.start('play');
    // this.scene.remove();
  }
}
