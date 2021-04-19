import Phaser from 'phaser';

export default class Hook extends Phaser.Physics.Matter.Image {
    constructor(scene, x, y, texture) {
        super(scene.matter.world, x, y, texture, null, {shape: 'circle', mass:0.2});
        scene.add.existing(this);
        this.boats = [];
        this.joints = [];
        this.curves = [];
        this.body.label = "hook";
        this.graphics = this.scene.add.graphics();
    }

    addBoat(newBoat) {
        let chainJoints = []
        let prev, chainLink, boatOffset;

        if (newBoat.squareSide === SquareSideEnum.left) {
            boatOffset = { x: 0, y: -12 }
        } else if (newBoat.squareSide === SquareSideEnum.right) {
            boatOffset = { x: 0, y: 12 }
        } else if (newBoat.squareSide === SquareSideEnum.up) {
            boatOffset = { x: 12, y: 0 }
        } else if (newBoat.squareSide === SquareSideEnum.down) {
            boatOffset = { x: -12, y: 0 }
        }

        let x = newBoat.x;
        let y = newBoat.y;
        let spring_stiffness = 0.1, segment_count = 10;

        prev = this.scene.matter.add.rectangle(x + 1, y + 1, 1, 1, { mass: 0.1, isSensor: true })
        chainJoints.push(this.scene.matter.add.joint(newBoat, prev, 0, 1, { pointA: boatOffset }));
        for (var i = 0; i < segment_count; i++)
        {
            chainLink = this.scene.matter.add.rectangle(x + i + 1, y + i + 1, 1, 1, { mass: 0.1, isSensor: true })
            chainJoints.push(this.scene.matter.add.joint(prev, chainLink, 2, spring_stiffness));
            prev = chainLink;
        }
        chainJoints.push(this.scene.matter.add.joint(prev, this, 2, 1, { pointB: { x: 12, y: -10 } }));

        this.joints.push(chainJoints)
        this.boats.push(newBoat);
        this.curves.push(new Phaser.Curves.Spline(new Array((segment_count + 2) * 2).fill(0)))
    }

    updateRopes() {
        this.graphics.clear();
        this.graphics.lineStyle(2, 0xffffff, 1);

        for (let curvIdx = 0; curvIdx < this.curves.length; curvIdx++) {
            const curve = this.curves[curvIdx];
            // console.log(curve.points);
            let jointIndx = 0
            for (; jointIndx < this.joints[curvIdx].length; jointIndx++) {
                const joint = this.joints[curvIdx][jointIndx];
                // console.log(joint)

                curve.points[jointIndx] = new Phaser.Math.Vector2((joint.bodyA.position.x || 0) + (joint.pointA.x || 0), (joint.bodyA.position.y || 0) + (joint.pointA.y || 0))//.add(new Phaser.Math.Vector2(joint.pointA.x || 0, joint.pointA.y || 0));
                // console.log(curve.points);
            }
            curve.draw(this.graphics, 64);
            const joint = this.joints[curvIdx][jointIndx - 1];
            curve.points[jointIndx] = new Phaser.Math.Vector2((joint.bodyB.position.x || 0) + (joint.pointB.x || 0), (joint.bodyB.position.y || 0) + (joint.pointB.y || 0))//.add(new Phaser.Math.Vector2(, joint.pointB.y || 0));
        }

    }

    update() {
        // this.body.force = { x: 0 , y: -5 }
        this.updateRopes()
    }
}