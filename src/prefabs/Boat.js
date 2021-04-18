import Phaser from 'phaser';

export default class Boat extends Phaser.Physics.Matter.Sprite {
    constructor(scene, side, texture) {
        // super(scene, x, y, texture)
        // how to disable physics?????????????????
        super(scene.matter.world, 0, 0, texture, null, { mass: Infinity});
        scene.add.existing(this);
        this.movementSpeed = 2;
        this.squareSide = side;
        this.anims.play('boatAnim');
        this.setStatic(true)
        this.setSensor(true)
        if (this.squareSide === SquareSide.left) {
            this.setAngle(-90)
            this.x = window.gameSize / 2;
        } else if (this.squareSide === SquareSide.right) {
            this.setAngle(90)
            this.x = -this.width;
            this.y = this.get_random();
        } else if (this.squareSide === SquareSide.up) {
            this.setAngle(0)
            this.x = this.get_random()
            this.y = window.gameSize + 20;
        } else if (this.squareSide === SquareSide.down) {
            this.setAngle(180)
            this.x = this.get_random();
            this.y = -this.width;
        }
    }

    update() {
        // this.setFixedRotation(0);
        // this.setVelocity(0,0);
            if (keyLEFT.isDown) {
                this.x -= this.movementSpeed;
            }
            if (keyRIGHT.isDown) {
                this.x += this.movementSpeed;
            }

            this.x = Phaser.Math.Clamp(this.x,borderPadding, this.scene.game.config.width - borderPadding);
    }

    reset() {
        this.y = this.y = this.scene.game.config.height - borderPadding;
        this.isFiring = false;
    }
}