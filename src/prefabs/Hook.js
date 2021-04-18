import Phaser from 'phaser';

export default class Hook extends Phaser.Physics.Matter.Image {
    constructor(scene, x, y, texture) {
        super(scene.matter.world, x, y, texture, null, {shape: 'circle', mass:0.2});
        scene.add.existing(this);

        // this.setScale(0.2)
        this.boats = [];
        this.chains = [];
    }

    addBoat(newBoat) {
        let chainLinks = []
        let prev = newBoat;
        let x = newBoat.x;
        let y = newBoat.y;
        for (var i = 0; i < 12; i++)
        {
            var chainLink = this.scene.matter.add.rectangle(x + i + 1,y + i + 1,1,1,{ mass: 0.1 });
            this.scene.matter.add.joint(prev, chainLink,20, 0.9);
            chainLinks.push(chainLink)
            prev = chainLink;
            // y += 18;
        }
        this.scene.matter.add.joint(prev, this, 35, 0.4);
        this.chains.push(chainLinks)
        this.boats.push(newBoat);
    }

    update() {
        this.body.force = { x: 0 , y: -5 }
    }

    reset() {
        this.y = this.y = this.scene.game.config.height - borderPadding;
        this.isFiring = false;
    }
}