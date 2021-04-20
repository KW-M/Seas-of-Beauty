import Phaser from 'phaser'
import BootScene from "./scenes/BootScene"
import EndScene from './scenes/EndScene';
import MenuScene from "./scenes/MenuScene"
import PlayScene from "./scenes/PlayScene"
import Lockr from "lockr"

// The Seas of Beauty - Kyle Worcester-Moore
// Things I did: (About 18 Hrs to finish)
// Add a loading screen
// Add nice CC background music - https://www.jamendo.com/track/970793/oceanforms by the THE SPYPROBE (CC)
// Made a different game - Redesign the game's artwork, UI, and sound to change its theme/aesthetic
// Create new animated sprites for the "Spaceship enemies" & "Rocket" - Manta Ray & Fishing Boats.
// Simultaneous 4 player mode.
// Randomize each "spaceship's" (Manta/Trash) movement direction/position/orientation at the start of each play & resets
// Smooth colision physics with the trash - kinda gives the "ocean currents" effect.
// Rope physics using Matter js & a spline curve
// Create a new spaceship type (Manta Ray) that's smaller (Bigger), moves faster (Slower), and is worth more points (negative points)

// Tried to implement networked multiplayer w gunDB, but didn't have the time.
// However GunDB looks like an awesome way to hide a lot of the complexity of networked multiplayer.

// import Gun from "gun"
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

window.SquareSideEnum = Object.freeze({
    'left': 0,
    'right': 1,
    'up': 2,
    'down': 3
})

window.targetFPS = 10
window.gameSize = 600;
let gameConfig = {
    type: Phaser.AUTO,
    width: gameSize,
    height: gameSize,
    autoCenter: Phaser.Scale.Center.CENTER_BOTH,
    autoRound: true,
    fps: {
        target: targetFPS,
        forceSetTimeOut: true,
    },
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
let game;

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

if (module.hot) {
    module.hot.dispose(destroyGame);
    module.hot.accept(newGame);
}
window.onload = () => {
if (!game) newGame();
}
function adjustCanvasSize(canvas) {
    let size = Math.min(window.innerWidth, window.innerHeight) - 10
    canvas.style.width = size + "px";
    canvas.style.height = size + "px";
}

