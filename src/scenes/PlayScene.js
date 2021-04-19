import Phaser from 'phaser';
import Hook from '../prefabs/Hook';
import Boat from '../prefabs/Boat';
import Manta from '../prefabs/Manta';
import Trash from '../prefabs/Trash';

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'play',
      physics: {
        arcade: {
          gravity: { y: 300 },
          debug: false
        }
      }
    });
  }
  preload() {
    //preloads happen in boot
    // this.matterWorld = new MatterPhysics(scene)
    // setup keybindings
    window.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    window.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    window.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    window.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    window.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    window.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    window.keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    window.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    window.keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
  }

  create() {

    // window.borderUISize = 20
    window.borderPadding = 50

    let music = this.sound.add('soundtrack', { loop: true });
    music.play();

    // var emitter = this.add.particles('explosion')
    //   .createEmitter({
    //     speed: 100,
    //     scale: { start: 1, end: 0 },
    //     blendMode: 'ADD'
    //   });

    // var logo = this.physics.add.image(400, 100, 'rocket')
    //   .setVelocity(100, 200)
    //   .setBounce(1, 1)
    //   .setCollideWorldBounds(true);

    // emitter.startFollow(logo);

    this.gameOver = false;

    // score
    this.score = 0;
    let scoreConfig = {
      fontFamily: 'Courier',
      fontSize: '28px',
      backgroundColor: '#000000',
      color: '#FFFF66',
      align: 'center',
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 50
    };

    this.scoreLeft = this.add.text(0, 0, this.score, scoreConfig);

    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0 }),
      frameRate: 10
    });

    this.anims.create({
      key: 'mantaAnim',
      frames: this.anims.generateFrameNumbers('manta', { start: 0, end: 10, first: 0 }),
      frameRate: 10,
      repeat: Infinity
    });

    this.anims.create({
      key: 'boatAnim',
      frames: this.anims.generateFrameNumbers('boat', { start: 0, end: 9, first: 0 }),
      frameRate: 10,
      repeat: Infinity
    });

    this.starfield = this.add.tileSprite(
      0, 0, gameSize, gameSize, 'starfield'
    ).setOrigin(0, 0);

    let gradientA = this.add.image(borderPadding, borderPadding, 'oceangradient').setAlpha(0.5).setOrigin(0, 0);
    let scaleFactor = (gameSize - (borderPadding * 2)) / gradientA.width;
    gradientA.setX(borderPadding)
    gradientA.setY(borderPadding)
    gradientA.setScale(scaleFactor, scaleFactor);
        // var graphics = this.add.graphics();
    // graphics.fillGradientStyle(0x196f8d, 0x0C3C45, 0x76dae1, 0x196f8d, 1);
    // graphics.fillRect(borderPadding, borderPadding, width - (borderPadding * 2), height - (borderPadding * 2));

    this.hook = new Hook(this, gameSize / 2, gameSize / 2, 'hook')
    const top_layer = this.add.layer();
    top_layer.add([this.hook])


    this.mantas = [
      new Manta(this, 'manta', 0, 1),
      new Manta(this, 'manta', 0, 1),
      new Manta(this, 'manta', 0, 1),
    ]
    for (let i = 0; i < this.mantas.length; i++) {
      const manta = this.mantas[i]
      setTimeout(() => { manta.reset() }, i * 10000);
      manta.setOnCollideWith(this.hook.body, (c) => {
        console.log(c)
        manta.health--;
        if (manta.health === 0) { manta.removeAllListeners(); manta.destroy(); this.mantas.splice(i, 1); }
      })
    }

    this.trash = [
      new Trash(this, 'bottle1', 0, 1),
      new Trash(this, 'tire1', 0, 1),
      new Trash(this, 'bag1', null, 1),
      new Trash(this, 'bag2', null, 1),
      // new Trash(this, 'bag3', null, 1),
      // new Trash(this, 'bag4', null, 1),
    ]


    this.playerBoats = [ // top,right,bottom,left
      new Boat(this, 'boat', SquareSideEnum.up),
      new Boat(this, 'boat', SquareSideEnum.right),
      new Boat(this, 'boat', SquareSideEnum.down),
      new Boat(this, 'boat', SquareSideEnum.left),
    ]
    for (let boat of this.playerBoats) {
      this.hook.addBoat(boat);
    }


    for (let m of this.trash) {
      m.setOnCollideActive((c) => {
        if (c.bodyA.label == 'hook' || c.bodyB.label == 'hook') this.catchTrash(m)
        else if (c.collision) {
          console.log(new Phaser.Math.Vector2(c.collision.penetration).scale(0.001))
          m.addCollisionForce(new Phaser.Math.Vector2(c.collision.penetration).scale(-0.0001))
          // m.addCollisionForce(new Phaser.Math.Vector2(1, 1))
        }
      })
    }

    let wave_splash_height = 8;
    let wave_half_splash = 4;

    let gradient = this.add.image(borderPadding, borderPadding, 'oceangradient').setAlpha(0.3).setOrigin(0, 0);;
    gradient.setX(borderPadding)
    gradient.setY(borderPadding)
    gradient.setScale(scaleFactor, scaleFactor);

    this.waves = [ // top,right,bottom,left
      this.add.tileSprite(
        borderPadding, borderPadding - wave_half_splash, gameSize - (borderPadding * 2), wave_splash_height, 'waves'
      ).setOrigin(0, 0),
      this.add.tileSprite(
        gameSize - borderPadding + wave_half_splash, borderPadding, gameSize - (borderPadding * 2), wave_splash_height, 'waves'
      ).setOrigin(0, 0).setAngle(90),
      this.add.tileSprite(
        borderPadding, gameSize - borderPadding - wave_half_splash, gameSize - (borderPadding * 2), wave_splash_height, 'waves'
      ).setOrigin(0, 0),
      this.add.tileSprite(
        borderPadding + wave_half_splash, borderPadding, gameSize - (borderPadding * 2), wave_splash_height, 'waves'
      ).setOrigin(0, 0).setAngle(90)
    ]

    // 60-second play clock
    scoreConfig.fixedWidth = 0;
    // this.clock = this.time.delayedCall(80000, () => {
    //   this.add.text(width / 2, height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5);
    //   this.add.text(width / 2, height / 2 + 64, '(R)estart', scoreConfig).setOrigin(0.5);
    //   this.gameOver = true;
    // }, null, this);
    top_layer.bringToTop();
  }
  update() {
    this.starfield.tilePositionX -= 1;
    this.waves[0].tilePositionX -= 65;
    this.waves[1].tilePositionX -= 65;
    this.waves[2].tilePositionX += 65;
    this.waves[3].tilePositionX += 65;

    if (this.gameOver) {
      if (Phaser.Input.Keyboard.JustDown(window.keyR)) this.scene.restart();
      return;
    }
    this.hook.update();

    for (let boat of this.playerBoats) {
      boat.update();
    }

    for (let m of this.mantas) {
      m.update();
    }

    for (let m of this.trash) {
      m.update();
    }
  }

  catchTrash(trashItem) {
    if (trashItem.direction == null) return;
    trashItem.alpha = 0;
    trashItem.direction = null;
    let boom = this.add.sprite(trashItem.x, trashItem.y, 'explosion');
    boom.anims.play('explode');
    boom.on('animationcomplete', () => {
      trashItem.reset();
      trashItem.alpha = 1;
      boom.destroy();
    });
    this.score += trashItem.pointValue;
    this.scoreLeft.setText(this.score);
  }
}
