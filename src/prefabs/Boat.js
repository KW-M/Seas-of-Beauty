import Phaser from 'phaser';

export default class Boat extends Phaser.Physics.Matter.Sprite {
    constructor(scene, texture, side) {
        // super(scene, x, y, texture)
        // how to disable physics?????????????????
        super(scene.matter.world, 0, 0, texture, null, { mass: Infinity });
        scene.add.existing(this);
        this.movementSpeed = 4;
        this.squareSide = side;
        this.anims.play('boatAnim');
        this.setStatic(true)
        this.setSensor(true)
        if (this.squareSide === SquareSideEnum.left) {
            this.setAngle(90)
            this.x = window.borderPadding;
            this.y = window.gameSize / 2;
        } else if (this.squareSide === SquareSideEnum.right) {
            this.setAngle(-90)
            this.x = window.gameSize - window.borderPadding;
            this.y = window.gameSize / 2;
        } else if (this.squareSide === SquareSideEnum.up) {
            this.setAngle(180)
            this.x = window.gameSize / 2;
            this.y = window.borderPadding;
        } else if (this.squareSide === SquareSideEnum.down) {
            this.setAngle(0)
            this.x = window.gameSize / 2;
            this.y = window.gameSize - window.borderPadding;
        }
    }

    update() {
        if (this.squareSide === SquareSideEnum.left) {
            if (keyW.isDown) {
                this.y -= this.movementSpeed;
            }
            if (keyS.isDown) {
                this.y += this.movementSpeed;
            }
            this.y = Phaser.Math.Clamp(this.y, borderPadding, gameSize - borderPadding);
        } else if (this.squareSide === SquareSideEnum.right) {
            if (keyUP.isDown) {
                this.y -= this.movementSpeed;
            }
            if (keyDOWN.isDown) {
                this.y += this.movementSpeed;
            }
            this.y = Phaser.Math.Clamp(this.y, borderPadding, gameSize - borderPadding);
        } else if (this.squareSide === SquareSideEnum.up) {
            if (keyA.isDown) {
                this.x -= this.movementSpeed;
            }
            if (keyD.isDown) {
                this.x += this.movementSpeed;
            }
            this.x = Phaser.Math.Clamp(this.x, borderPadding, gameSize - borderPadding);
        } else if (this.squareSide === SquareSideEnum.down) {
            if (keyLEFT.isDown) {
                this.x -= this.movementSpeed;
            }
            if (keyRIGHT.isDown) {
                this.x += this.movementSpeed;
            }
            this.x = Phaser.Math.Clamp(this.x, borderPadding, gameSize - borderPadding);
        }
    }

    reset() {
        this.y = this.y = this.scene.game.config.height - borderPadding;
        this.isFiring = false;
    }
}