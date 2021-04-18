import Phaser from 'phaser';

export default class Manta extends Phaser.GameObjects.Sprite {
    constructor(scene, texture, frame, pointValue, direction) {
        super(scene, 0, 0, texture, frame);
        scene.add.existing(this);
        this.setOrigin(0, 0)
        window.gameSize = this.scene.game.config.width;
        this.pointValue = pointValue;
        this.direction = null;
        this.anims.play('mantaAnim');
        setTimeout(() => { this.reset() }, Math.random() * 1000);
    }

    get_random() {
        return Math.random() * (window.gameSize - (2 * window.borderPadding) - 8) + window.borderPadding + 16
    }

    reset() {
        this.direction = directionOptions[Math.floor(Math.random() * 3.9)]
        if (this.direction === window.SquareSideEnum.left) {
            this.setAngle(-90)
            this.x = window.gameSize + 20;
            this.y = this.get_random();
        } else if (this.direction === window.SquareSideEnum.right) {
            this.setAngle(90)
            this.x = -this.width;
            this.y = this.get_random();
        } else if (this.direction === window.SquareSideEnum.up) {
            this.setAngle(0)
            this.x = this.get_random()
            this.y = window.gameSize + 20;
        } else if (this.direction === window.SquareSideEnum.down) {
            this.setAngle(180)
            this.x = this.get_random();
            this.y = -this.width;
        }
    }

    update() {
        if (this.direction === window.SquareSideEnum.left) {
            this.x -= 3;
            if (this.x < 0 - this.width) {
                this.direction = null;
                setTimeout(this.reset(), Math.random() * 300);
            }
        } else if (this.direction === window.SquareSideEnum.right) {
            this.x += 3;
            if (this.x > window.gameSize) {
                this.direction = null;
                setTimeout(this.reset(), Math.random() * 300);
            }
        } else if (this.direction === window.SquareSideEnum.up) {
            this.y -= 3;
            if (this.y < -this.width) {
                this.direction = null;
                setTimeout(this.reset(), Math.random() * 300);
            }
        } else if (this.direction === window.SquareSideEnum.down) {
            this.y += 3;
            if (this.y > window.gameSize + this.width) {
                this.direction = null;
                setTimeout(this.reset(), Math.random() * 300);
            }
        }

    }
}