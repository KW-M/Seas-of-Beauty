/*
Title: Seas of Beauty - Kyle Worcester-Moore - 2021/4/19

Things I did to the original "Rocket Patrol" example: (About 20 hrs to finish)
- (5) Add nice background music - https://www.jamendo.com/track/970793/oceanforms by the THE SPYPROBE (CC)
- (60) Made a different game - Redesign the game's artwork, UI, and sound to change its theme/aesthetic
- (5) Create new animated sprites for the "Spaceship enemies" & "Rocket" - Manta Ray & Fishing Boats.
- (30) Simultaneous 4 player mode.
- (5) Randomize each "spaceship's" (Manta/Trash) movement direction/position/orientation at the start of each play & resets
- (5) Create a new spaceship type (Manta Ray) that's smaller (Bigger), moves faster (Slower), and is worth more points (negative points)
- Smooth colision physics with the trash - kinda gives the "ocean currents" effect.
- Rope physics using Matter js & a spline curve

- Tried to implement networked multiplayer w gunDB, but didn't have the time.
    - However GunDB looks like an awesome way to hide a lot of the complexity of networked multiplayer for other 120 teams.

Credits to other folks work that was used in this game can be found in the readme. */

import Phaser from 'phaser'
import BootScene from "./scenes/BootScene"
import EndScene from './scenes/EndScene';
import MenuScene from "./scenes/MenuScene"
import PlayScene from "./scenes/PlayScene"

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

