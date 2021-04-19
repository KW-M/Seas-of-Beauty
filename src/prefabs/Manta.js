import Phaser from 'phaser';
let speed = 3;
export default class Manta extends Phaser.Physics.Matter.Sprite {
    constructor(scene, texture, frame, pointValue) {
        super(scene.matter.world, 0, 0, texture, frame, { mass: 200 });
        scene.add.existing(this);
        this.setOrigin(.5, .5);
        this.pointValue = pointValue;
        this.health = 4;
        this.direction = null;
        // this.setStatic(true);
        // this.setSensor(true);
        this.anims.play('mantaAnim');
    }

    get_random() {
        return Math.random() * (window.gameSize - (2 * window.borderPadding) - this.width * 2) + window.borderPadding + this.width * 1
    }

    reset() {
        this.direction = Math.floor(Math.random() * 3.9)
        this.setVelocity(0, 0);
        this.setAngularVelocity(0);
        if (this.direction === window.SquareSideEnum.left) {
            this.setAngle(-90)
            this.setVelocityX(-speed);
            this.x = window.gameSize + 20 + Math.random() * 20;
            this.y = this.get_random();
        } else if (this.direction === window.SquareSideEnum.right) {
            this.setAngle(90);
            this.setVelocityX(speed);
            this.x = -this.width - Math.random() * 20;
            this.y = this.get_random();
        } else if (this.direction === window.SquareSideEnum.up) {
            this.setAngle(0);
            this.setVelocityY(-speed);
            this.x = this.get_random()
            this.y = window.gameSize + 20 + Math.random() * 20;
        } else if (this.direction === window.SquareSideEnum.down) {
            this.setAngle(180)
            this.setVelocityY(speed);
            this.x = this.get_random();
            this.y = -this.width - Math.random() * 20;
        }
    }

    update() {
        this.setAlpha(this.health / 5)
        if (this.direction === window.SquareSideEnum.left) {
            this.setVelocityX(-speed);
            if (this.x < 0 - this.width) {
                this.direction = null;
                setTimeout(this.reset(), Math.random() * 300);
            }
        } else if (this.direction === window.SquareSideEnum.right) {
            // this.x += 3;
            this.setVelocityX(speed);
            if (this.x > window.gameSize) {
                this.direction = null;
                setTimeout(this.reset(), Math.random() * 300);
            }
        } else if (this.direction === window.SquareSideEnum.up) {
            // this.y -= 3;
            this.setVelocityY(-speed);
            if (this.y < -this.width) {
                this.direction = null;
                setTimeout(this.reset(), Math.random() * 300);
            }
        } else if (this.direction === window.SquareSideEnum.down) {
            // this.y += 3;
            this.setVelocityY(speed);
            if (this.y > window.gameSize + this.width) {
                this.direction = null;
                setTimeout(this.reset(), Math.random() * 300);
            }
        }

    }
}