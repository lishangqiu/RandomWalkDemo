import {SCREEN_HEIGHT, SCREEN_WIDTH, MIN_ZOOM, MAX_ZOOM} from "./config.js"
import SpectrumUtil from "./spectrum_pixels.js"

var SIDE_BORDER_WIDTH = 2;
var MIDDLE_LINES_WIDTH = 0.6;
const NUM_WIDTH = 24*4;
const NUM_HEIGHT = 15*4;
var UNIT_SIDE_WHITE_BORDER = 1;

var INSIDE_WIDTH = SCREEN_WIDTH - (SIDE_BORDER_WIDTH*2);
var INSIDE_HEIGHT = SCREEN_HEIGHT - (SIDE_BORDER_WIDTH*2);

export {NUM_WIDTH, NUM_HEIGHT};

export default class PixelManager{
    constructor(scene){
        this.sceneObj = scene;
        this.linesContainer = this.sceneObj.add.container(0, 0);

        this.createUnits();
        this.createBorder();
        this.spectrumColors = new SpectrumUtil();
    }

    createBorder(){
        //var leftBorder = this.sceneObj.add.line(BORDER_WIDTH, SCREEN_HEIGHT/2, 0, 0, 0, SCREEN_HEIGHT-BORDER_WIDTH, 0x000000).setLineWidth(BORDER_WIDTH);
        this.createHorizontalLine(SIDE_BORDER_WIDTH, SIDE_BORDER_WIDTH, 0x000000);
        this.createHorizontalLine(SCREEN_WIDTH-SIDE_BORDER_WIDTH, SIDE_BORDER_WIDTH, 0x000000);

        this.createVerticalLine(SIDE_BORDER_WIDTH, SIDE_BORDER_WIDTH, 0x000000);
        this.createVerticalLine(SCREEN_HEIGHT-SIDE_BORDER_WIDTH, SIDE_BORDER_WIDTH, 0x000000);
    }

    createUnits(){
        this.createPixels();

        for(let i=0; i < NUM_WIDTH; i++){
            this.linesContainer.add(this.createHorizontalLine(INSIDE_WIDTH/NUM_WIDTH*i  + SIDE_BORDER_WIDTH, MIDDLE_LINES_WIDTH, 0x4e4e4e));
        }

        for(let i=0; i < NUM_HEIGHT; i++){
            this.linesContainer.add(this.createVerticalLine(INSIDE_HEIGHT/NUM_HEIGHT*i + SIDE_BORDER_WIDTH, MIDDLE_LINES_WIDTH, 0x4e4e4e));
        }
    }

    createHorizontalLine(x_coord, border_width, color){
        return this.sceneObj.add.line(x_coord, SCREEN_HEIGHT/2, 0, 0, 0, SCREEN_HEIGHT-border_width, color).setLineWidth(border_width);
    }

    createVerticalLine(y_coord, border_width, color){
        return this.sceneObj.add.line(SCREEN_WIDTH/2, y_coord, 0, 0, SCREEN_WIDTH-border_width, 0, color).setLineWidth(border_width);
    }

    createPixels(){
        var unitWidth = INSIDE_WIDTH/NUM_WIDTH-UNIT_SIDE_WHITE_BORDER;
        var unitHeight = INSIDE_HEIGHT/NUM_HEIGHT-UNIT_SIDE_WHITE_BORDER;

        this.unitsArray = Array(NUM_WIDTH);
        for (let i = 0; i < this.unitsArray.length; i++) {
            this.unitsArray[i] = new Array(NUM_HEIGHT);
        }

        for (let i=0; i<NUM_WIDTH; i++){
            for (let j=0; j<NUM_HEIGHT; j++){
                this.unitsArray[i][j] = this.sceneObj.add.rectangle((INSIDE_WIDTH/NUM_WIDTH*i + SIDE_BORDER_WIDTH)+(unitWidth/2), 
                (INSIDE_HEIGHT/NUM_HEIGHT*j + SIDE_BORDER_WIDTH)+(unitHeight/2), 
                unitWidth, unitHeight, 0xffffff);
            }
        }
    }

    setPixelsTimes(timesArrayAndMaxSize){
        var timesArray = timesArrayAndMaxSize[0];
        var maxSize = timesArrayAndMaxSize[1];
        for (let i=0; i<NUM_WIDTH; i++){
            for (let j=0; j<NUM_HEIGHT; j++){
                this.setPixelColor(i, j, this.spectrumColors.getColorTimes(timesArray[i][j], maxSize));
            }
        }
        if (timesArrayAndMaxSize[2] != undefined){
            this.setPixelColor(timesArrayAndMaxSize[2][0], timesArrayAndMaxSize[2][1], 0x00ff00);
        }
    }


    // input top left coordinate system
    setPixelColor(coord_x, coord_y, color){
        if (coord_x < 0 || coord_y >= NUM_WIDTH){
            return;
        }

        if (coord_x < 0 || coord_y >= NUM_HEIGHT){
            return;
        }
        this.unitsArray[coord_x][coord_y].fillColor = color;
    }

    static convertLeftTopCoord(x_coord, y_coord){
        return [x_coord+(NUM_WIDTH/2), y_coord+(NUM_HEIGHT/2)];
    }
}
