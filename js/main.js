
import Game from './main_scene.js'
import Game2 from './main_scene2.js';
// Aspect Ratio 16:9 - Portrait
import { SCREEN_WIDTH, SCREEN_HEIGHT } from './config.js';


const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.NONE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'game',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    },
    dom: {
        createContainer: true
    },
    backgroundColor: '#d0d0d0',
    scene: [Game, Game2],
    mipmapFilter: "LINEAR_MIPMAP_LINEAR"

}

const game = new Phaser.Game(config)
export {game};