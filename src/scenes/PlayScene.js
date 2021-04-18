import Phaser from 'phaser';
import Hook from '../prefabs/Hook';
import Boat from '../prefabs/Boat';
import Manta from '../prefabs/Manta';

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
    window.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    window.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
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

    this.p1Score = 0;

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

    // this.anims.create({
    //   key: 'wavesAnim',
    //   frames: this.anims.generateFrameNumbers('waves', { start: 0, end: 9, first: 0 }),
    //   frameRate: 3
    // });

    this.anims.create({
      key: 'boatAnim',
      frames: this.anims.generateFrameNumbers('boat', { start: 0, end: 9, first: 0 }),
      frameRate: 10,
      repeat: Infinity
    });

    this.starfield = this.add.tileSprite(
      0, 0, window.gameSize, window.gameSize, 'starfield'
    ).setOrigin(0, 0);

    let scaleFactor = (window.gameSize - borderPadding * 2) / gradientA.width;
    let gradientA = this.add.image(borderPadding, borderPadding, 'oceangradient').setAlpha(0.5).setOrigin(0, 0);;
    gradientA.setX(borderPadding)
    gradientA.setY(borderPadding)
    gradientA.setScale(scaleFactor, scaleFactor);
        // var graphics = this.add.graphics();
    // graphics.fillGradientStyle(0x196f8d, 0x0C3C45, 0x76dae1, 0x196f8d, 1);
    // graphics.fillRect(borderPadding, borderPadding, width - (borderPadding * 2), height - (borderPadding * 2));

    this.p1Rocket = new Boat(
      this,
      window.gameSize / 2 - 10,
      window.gameSize - borderPadding + 5,
      'boat'
    ).setOrigin(0.5, 0.5);
    let r = this.p1Rocket;

    this.hook = new Hook(this, window.gameSize / 2, window.gameSize / 2, 'hook')
    this.hook.addBoat(r);

    let wave_splash_height = 8;
    let wave_half_splash = 4;

    this.ship1 = new Manta(this, 'manta', 0, 1, 'left').setOrigin(0, 0);
    this.ship2 = new Manta(this, 'manta', 0, 1, 'right').setOrigin(0, 0);
    this.ship3 = new Manta(this, 'manta', 0, 1, 'up').setOrigin(0, 0);
    this.ship4 = new Manta(this, 'manta', 0, 1, 'down').setOrigin(0, 0);

    let gradient = this.add.image(borderPadding, borderPadding, 'oceangradient').setAlpha(0.3).setOrigin(0, 0);;
    gradient.setX(borderPadding)
    gradient.setY(borderPadding)
    gradient.setScale(scaleFactor, scaleFactor);

    this.waves = [ // top,right,bottom,left
      this.add.tileSprite(
        borderPadding, borderPadding - wave_half_splash, window.gameSize - (borderPadding * 2), wave_splash_height, 'waves'
      ).setOrigin(0, 0),
      this.add.tileSprite(
        window.gameSize - borderPadding + wave_half_splash, borderPadding, window.gameSize - (borderPadding * 2), wave_splash_height, 'waves'
      ).setOrigin(0, 0).setAngle(90),
      this.add.tileSprite(
        borderPadding, window.gameSize - borderPadding - wave_half_splash, window.gameSize - (borderPadding * 2), wave_splash_height, 'waves'
      ).setOrigin(0, 0),
      this.add.tileSprite(
        borderPadding + wave_half_splash, borderPadding, window.gameSize - (borderPadding * 2), wave_splash_height, 'waves'
      ).setOrigin(0, 0).setAngle(90)
    ]


    // this.p1debugRect = this.add.rectangle(r.x, r.y, r.width * r.scaleX, r.height * r.scaleY, 0xFF66FF).setOrigin(0.5, 0.5).setBlendMode(Phaser.BlendModes.SCREEN);

    // this.p1Rocket = new Rocket(
    //   this,
    //   width / 2 + 10,
    //   height - borderUISize - borderPadding,
    //   'rocket'
    // ).setOrigin(0.5, 0.5);
    // let r = this.p1Rocket;
    // this.p1debugRect = this.add.rectangle(r.x, r.y, r.width * r.scaleX, r.height * r.scaleY, 0xFF66FF).setOrigin(0.5, 0.5).setBlendMode(Phaser.BlendModes.SCREEN);


    // this.input.keyboard
    //   .on('keydown-R', function () {
    //     this.scene.restart();
    //   }, this)
    //   .on('keydown-Q', function () {
    //     this.scene.stop().run('menu');
    //   }, this)
    //   .on('keydown-K', function () {
    //     this.scene.stop().run('end');
    //   }, this);

    // this.add.rectangle(
    //   0,
    //   borderUISize + borderPadding,
    //   width,
    //   borderUISize * 2,
    //   0x00FF00,
    // ).setOrigin(0, 0);
    // // white borders
    // this.add.rectangle(0, 0, width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
    // this.add.rectangle(0, height - borderUISize, width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
    // this.add.rectangle(0, 0, borderUISize, height, 0xFFFFFF).setOrigin(0, 0);
    // this.add.rectangle(width - borderUISize, 0, borderUISize, height, 0xFFFFFF).setOrigin(0, 0);

    // score
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

    this.scoreLeft = this.add.text(0, 0, this.p1Score, scoreConfig);

    // 60-second play clock
    scoreConfig.fixedWidth = 0;
    // this.clock = this.time.delayedCall(80000, () => {
    //   this.add.text(width / 2, height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5);
    //   this.add.text(width / 2, height / 2 + 64, '(R)estart', scoreConfig).setOrigin(0.5);
    //   this.gameOver = true;
    // }, null, this);

  }
  update() {
    this.starfield.tilePositionX -= 1;
    this.waves[0].tilePositionX -= 65;
    this.waves[1].tilePositionX -= 65;
    this.waves[2].tilePositionX += 65;
    this.waves[3].tilePositionX += 65;

    if (!this.gameOver) {
      this.p1Rocket.update();
      this.ship1.update();
      this.ship2.update();
      this.ship3.update();
    }
    if (this.gameOver && Phaser.Input.Keyboard.JustDown(window.keyR)) {
      this.scene.restart();
    }

    // this.debugRect.setAngle(this.debugRect.angle + 4)
    // this.p1Rocket.setAngle(this.p1Rocket.angle - 4)
    // this.debugRect.x = this.p1Rocket.x;
    // this.debugRect.y = this.p1Rocket.y;
    let r = this.hook;
    let rWidth = r.width * r.scaleX;
    let rHeight = r.height * r.scaleY;
    for (let s of [this.ship1, this.ship2, this.ship3]) {
      if (s.direction != null && r.x < s.x + s.width &&
        r.x + rWidth > s.x &&
        r.y < s.y + s.height &&
        r.y + rHeight > s.y) {
        this.destroyShip(s);
      }
    }
  }

  destroyShip(ship) {
    ship.alpha = 0;
    let boom = this.add.sprite(ship.x, ship.y, 'explosion');
    boom.anims.play('explode');
    boom.on('animationcomplete', () => {
      ship.reset();
      ship.alpha = 1;
      boom.destroy();
    });
    this.p1Score += ship.pointValue;
    this.scoreLeft.setText(this.p1Score);
  }
}
