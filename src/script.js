import Phaser from 'phaser'
import BootScene from "./scenes/BootScene"
import EndScene from './scenes/EndScene';
import MenuScene from "./scenes/MenuScene"
import PlayScene from "./scenes/PlayScene"
import Lockr from "lockr"

window.SquareSideEnum = Object.freeze({
    'left':0,
    'right':1,
    'up':2,
    'down':3
})

// import  from "gun"
// let gameState = {}
// window.GunDB = Gun(['https://kwm-120-gun-server.herokuapp.com/']).get('mantaGame')
// window.GunDB.synchronous(gameState);

// let playerId = Lockr.get('player_id');
// if(playerId === undefined) {
//     playerId = Gun.text.random(3, 'abcdefghijklmno');
//     Lockr.set(playerId);
//     Gun.get("players").set("player_id")
//     // game.me = game.ships[id] = {data: d = {id: id, t: game.now}};
// }

window.gameSize = 600;
let gameConfig = {
    type: Phaser.AUTO,
    width: gameSize,
    height: gameSize,
    autoCenter: Phaser.Scale.Center.CENTER_BOTH,
    autoRound: true,
    physics: {
        default: 'matter',
        matter: {
            enableSleeping: true,
            gravity: {
                y: 0
            },
            // debug: {
            //     showBody: true,
            //     showStaticBody: true
            // }
        }
    },

    banner: { text: 'white', background: ['#FD7400', '#FFE11A', '#BEDB39', '#1F8A70', '#004358'] },
    scene: [BootScene, MenuScene, PlayScene, EndScene]
};

function newGame() {
    if (game) return;
    game = new Phaser.Game(gameConfig);
    adjustCanvasSize(game.canvas)
    window.addEventListener('resize', () => { adjustCanvasSize(game.canvas) });

}

function destroyGame() {
    if (!game) return;
    game.destroy(true);
    game.runDestroy();
    game = null;
}

let game;

if (module.hot) {
    module.hot.dispose(destroyGame);
    module.hot.accept(newGame);
}
window.onload = () => {
if (!game) newGame();
}
function adjustCanvasSize(canvas) {
    let size = Math.min(window.innerWidth, window.innerHeight)
    canvas.style.width = size + "px";
    canvas.style.height = size + "px";
}

