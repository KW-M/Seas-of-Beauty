export default class KeyTut extends Phaser.GameObjects.GameObject {
    constructor(scene, texture, key, frame, pointValue) {
        super(scene);
        scene.add.existing(this);
    }

    create() {
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '38px',
            color: '#C6C6C6',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 50
        };
        let x, y;
        x = gameWidth / 2 - 10;
        y = borderPadding / 2;
        this.scoreLeft = this.add.text(x, y, "a", scoreConfig).setOrigin(0.5, 0.5);

        graphics = this.add.graphics();

        graphics.fillStyle(0xffff00, 1);

        //  32px radius on the corners
        graphics.fillRoundedRect(32, 32, 300, 200, 32);

        graphics.fillStyle(0xff00ff, 1);

        //  Using an object to define a different radius per corner
        graphics.fillRoundedRect(360, 240, 400, 300, { tl: 64, tr: 22, bl: 12, br: 0 });
    }
}