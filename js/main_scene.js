import PixelManager, { NUM_HEIGHT, NUM_WIDTH, INSIDE_WIDTH, INSIDE_HEIGHT, unitWidth, unitHeight} from "./pixels_manager.js";
import {MIN_ZOOM, MAX_ZOOM} from "./config.js"
import RandomWalkAgent from "./random_walk.js"
import { TOTAL_STEPS } from "./random_walk.js";
import {SPECTRUM_BLUE} from "./spectrum_pixels.js"
import {game} from "./main.js";

var STARTING_X = 0;
var STARTING_Y = 0;

export default class Game extends Phaser.Scene{
    startX = null;
    startY = null;

    constructor(){
        super('game');
    }

    create(){
        this.scene.launch('game2');
        this.cameras.main.setZoom(1);
        this.cameras.main.centerOn(INSIDE_WIDTH/2, INSIDE_HEIGHT/2);
        Game.currZoom = 1;

        this.player_thing = this.add.circle(0, 0, 5, 0x00ff00);
        this.player_thing.depth = 10;


        this.pixelManager = new PixelManager(this, this);
        this.randomWalk = new RandomWalkAgent(STARTING_X, STARTING_Y);
        this.randomWalk.doAllSteps();
        this.setColor(0);
        //this.pixelManager.setPixelColor(this.randomWalk.currX, this.randomWalk.currY, 0x00ff00);

        this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
            const camera = this.cameras.main;
            const newZoom = Math.min(Math.max(camera.zoom - deltaY * 0.0007, MIN_ZOOM), MAX_ZOOM);
            console.log((unitWidth * newZoom));
            if ((unitWidth * newZoom) < 5.1){
                this.pixelManager.linesContainer.setVisible(false);
            }
            else{
                this.pixelManager.linesContainer.setVisible(true);
            }
            camera.setZoom(newZoom);
            Game.currZoom = newZoom;
        });

        document.getElementById("stepsSlider").oninput = () => {
            this.setColor(document.getElementById("stepsSlider").value);
            document.getElementById('sliderVal').innerHTML = document.getElementById("stepsSlider").value; //displays this value to the html page
        };
        this.input.on('pointermove', this.onPointerMove, this);

    }

    setColor(steps){
        var arrHistory = this.randomWalk.getArrayHistory(TOTAL_STEPS-steps);
        this.pixelManager.setPixelsTimes(arrHistory);
        this.pixelManager.setPixelColor(NUM_WIDTH/2, NUM_HEIGHT/2, 0xff0000);
        this.pixelManager.spectrumColors.updateRange();

        if (arrHistory[2] != undefined){
            this.player_thing.setVisible(true);
            var position = this.pixelManager.convertToPixelCoord(arrHistory[2][0], arrHistory[2][1]);
            this.player_thing.setPosition(position[0], position[1]);
        }
        else{
            this.player_thing.setVisible(false);
        }
    }

    onPointerMove(pointer){
        if (pointer.isDown && pointer.x>100 && pointer.x<1500)
        {
            if (this.startX == null){
                this.startX = pointer.x;
                this.startY = pointer.y;
            }
            this.cameras.main.setScroll(this.startScrollX - (pointer.x-this.startX) / Game.currZoom, this.startScrollY - (pointer.y-this.startY) / Game.currZoom);
        }
        else{
            if (this.startX != null){
                this.startX = null;
                this.startY = null;
            }
            this.startScrollX = this.cameras.main.scrollX;
            this.startScrollY = this.cameras.main.scrollY;
        }
    }
}