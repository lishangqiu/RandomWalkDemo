import PixelManager, { NUM_HEIGHT, NUM_WIDTH } from "./pixels_manager.js";
import {SCREEN_HEIGHT, SCREEN_WIDTH, MIN_ZOOM, MAX_ZOOM} from "./config.js"
import RandomWalkAgent from "./random_walk.js"
import { TOTAL_STEPS } from "./random_walk.js";
import {SPECTRUM_BLUE} from "./spectrum_pixels.js"

var STARTING_X = 0;
var STARTING_Y = 0;

export default class Game extends Phaser.Scene{
    startX = null;
    startY = null;

    constructor(){
        super('game');
    }

    create(){
        console.log('hi');

        this.cameras.main.setZoom(1);
        this.cameras.main.centerOn(SCREEN_WIDTH/2, SCREEN_HEIGHT/2);
        Game.currZoom = 1;

        this.input.on('wheel', function (pointer, gameObjects, deltaX, deltaY, deltaZ) {
            const camera = this.cameras.main;
            const newZoom = Math.min(Math.max(camera.zoom - deltaY * 0.0007, MIN_ZOOM), MAX_ZOOM);
            
            camera.setZoom(newZoom);
            Game.currZoom = newZoom;
        });

        this.pixelManager = new PixelManager(this);
        this.randomWalk = new RandomWalkAgent(STARTING_X, STARTING_Y);
        this.randomWalk.doAllSteps();
        this.setColor(TOTAL_STEPS-1);
        //this.pixelManager.setPixelColor(this.randomWalk.currX, this.randomWalk.currY, 0x00ff00);

        document.getElementById("stepsSlider").oninput = () => {
            this.setColor(document.getElementById("stepsSlider").value);
        };
    }

    setColor(steps){
        this.pixelManager.setPixelsTimes(this.randomWalk.getArrayHistory(TOTAL_STEPS-steps));
        this.pixelManager.setPixelColor(NUM_WIDTH/2, NUM_HEIGHT/2, 0xff0000);
    }
}