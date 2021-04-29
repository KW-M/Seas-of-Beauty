import Phaser from 'phaser';

export default class Trash extends Phaser.Physics.Matter.Sprite {
    constructor(scene, texture, frame, pointValue) {
        super(scene.matter.world, 0, 0, texture, frame, { mass: 0 });
        scene.add.existing(this);
        this.setOrigin(.5, .5);
        this.pointValue = pointValue;
        this.direction = null;
        this.setSensor(true);
        this.setFriction(0, 0)
        this.collisionVector = new Phaser.Math.Vector2(0, 0)
        setTimeout(() => { this.reset() }, Math.random() * 2000);
    }

    get_random() {
        return Math.random() * (window.gameSize - (2 * window.borderPadding) - this.width * 2) + window.borderPadding + this.width * 1
    }

    addCollisionForce(vector) {
        this.collisionVector = vector;
    }

    reset() {
        let speed = 0
        let offset = 2;
        this.setAngularVelocity(0)
        this.setVelocity(0, 0)
        this.direction = Math.floor(Math.random() * 3.9)
        if (this.direction === window.SquareSideEnum.left) {
            this.setPosition(window.gameSize + offset + Math.random() * offset, this.get_random());
            this.setVelocity(-speed, Math.random() * 2 - 1)
        } else if (this.direction === window.SquareSideEnum.right) {
            // this.setPosition(window.gameSize + offset + Math.random() * offset, this.get_random());
            this.setPosition(-this.width - Math.random() * offset, this.get_random());
            this.setVelocity(speed, Math.random() * 2 - 1)
        } else if (this.direction === window.SquareSideEnum.up) {
            this.setPosition(this.get_random(), window.gameSize + offset + Math.random() * offset);
            this.setVelocity(Math.random() * 2 - 1, -speed)
        } else if (this.direction === window.SquareSideEnum.down) {
            this.setPosition(this.get_random(), -this.width - Math.random() * offset);
            this.setVelocity(Math.random() * 2 - 1, speed)
        }
    }

    constrainVelocity(maxVelocity) {
        let clamppedVelocity = new Phaser.Math.Vector2(this.body.velocity).normalize().scale(maxVelocity)
        this.setVelocity(clamppedVelocity.x, clamppedVelocity.y)
    };

    update() {
        let bound = 4;
        // if ((this.x < -this.width - bound || this.x > window.gameSize + bound || this.y < -this.width - bound || this.y > window.gameSize + bound)) {
        //     // this.direction = null;
        //     this.applyForce(new Phaser.Math.Vector2)
        //     // setTimeout(this.reset(), Math.random() * 300);
        // }
        let inset = 0 + borderPadding
        let forceAmt = 0.003
        this.applyForce(this.collisionVector);
        this.collisionVector.set(0, 0)
        if (this.x < inset) {
            this.applyForce(new Phaser.Math.Vector2(forceAmt, 0))
        } if (this.x > window.gameSize - inset) {
            this.applyForce(new Phaser.Math.Vector2(-forceAmt, 0))
        } if (this.y < inset) {
            this.applyForce(new Phaser.Math.Vector2(0, forceAmt))
        } if (this.y > window.gameSize - inset) {
            this.applyForce(new Phaser.Math.Vector2(0, -forceAmt))
        }
        this.constrainVelocity(5)
    }
}