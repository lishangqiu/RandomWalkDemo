import {SCREEN_HEIGHT, SCREEN_WIDTH, MIN_ZOOM, MAX_ZOOM} from "./config.js"
import SpectrumUtil from "./spectrum_pixels.js"

var SIDE_BORDER_WIDTH = 2;
var MIDDLE_LINES_WIDTH = 0.6;
const NUM_WIDTH = 24*12;
const NUM_HEIGHT = 15*12;
var UNIT_SIDE_WHITE_BORDER = 0.7;

var INSIDE_WIDTH = SCREEN_WIDTH*2 - (SIDE_BORDER_WIDTH*2);
var INSIDE_HEIGHT = SCREEN_HEIGHT*2 - (SIDE_BORDER_WIDTH*2);

var unitWidth = INSIDE_WIDTH/NUM_WIDTH-UNIT_SIDE_WHITE_BORDER;
var unitHeight = INSIDE_HEIGHT/NUM_HEIGHT-UNIT_SIDE_WHITE_BORDER;

export {NUM_WIDTH, NUM_HEIGHT, INSIDE_HEIGHT, INSIDE_WIDTH, UNIT_SIDE_WHITE_BORDER, unitWidth, unitHeight};

export default class PixelManager{
    constructor(scene, scene2){
        this.sceneObj = scene;
        this.sceneObj2 = scene2;
        console.log(this.sceneObj2);
        this.linesContainer = this.sceneObj.add.container(0, 0);

        this.createUnits();
        this.createBorder();
        this.spectrumColors = new SpectrumUtil();

        //this.leader = this.sceneObj.add.circle(INSIDE_WIDTH/2+(unitWidth/2), INSIDE_HEIGHT/2+(unitWidth/2), 10, 0xff00ff);
    }

    createBorder(){
        //var leftBorder = this.sceneObj.add.line(BORDER_WIDTH, SCREEN_HEIGHT/2, 0, 0, 0, SCREEN_HEIGHT-BORDER_WIDTH, 0x000000).setLineWidth(BORDER_WIDTH);
        this.createVerticalLine(SIDE_BORDER_WIDTH, INSIDE_HEIGHT, SIDE_BORDER_WIDTH, 0x000000, this.sceneObj2);
        this.createVerticalLine(INSIDE_WIDTH, INSIDE_HEIGHT, SIDE_BORDER_WIDTH, 0x000000, this.sceneObj2);

        this.createHorizontalLine(SIDE_BORDER_WIDTH, INSIDE_WIDTH, SIDE_BORDER_WIDTH, 0x000000, this.sceneObj2);
        this.createHorizontalLine(INSIDE_HEIGHT, INSIDE_WIDTH, SIDE_BORDER_WIDTH, 0x000000, this.sceneObj2);
    }

    createUnits(){
        this.createPixels();

    }
    
    convertToPixelCoord(unitCoordX_, unitCoordY_){

        return [(INSIDE_WIDTH/NUM_WIDTH*unitCoordX_ + MIDDLE_LINES_WIDTH)+(unitWidth/2), 
            (INSIDE_HEIGHT/NUM_HEIGHT*unitCoordY_ + MIDDLE_LINES_WIDTH)+(unitHeight/2)];
    }

    createVerticalLine(x_coord, height, border_width, color, sceneObj){
        return sceneObj.add.line(x_coord, height/2, 0, 0, 0, height, color).setLineWidth(border_width);
    }

    createHorizontalLine(y_coord, width, border_width, color, sceneObj){
        console.log(border_width*10)
        return sceneObj.add.line(width/2, y_coord, 0, 0, width, 0, color).setLineWidth(border_width);
    }

    createPixels(){

        this.unitsArray = Array(NUM_WIDTH);
        for (let i = 0; i < this.unitsArray.length; i++) {
            this.unitsArray[i] = new Array(NUM_HEIGHT);
        }

        for (let i=0; i<NUM_WIDTH; i++){
            for (let j=0; j<NUM_HEIGHT; j++){
                this.unitsArray[i][j] = this.sceneObj.add.rectangle((INSIDE_WIDTH/NUM_WIDTH*i + MIDDLE_LINES_WIDTH)+(unitWidth/2), 
                (INSIDE_HEIGHT/NUM_HEIGHT*j + MIDDLE_LINES_WIDTH)+(unitHeight/2), 
                unitWidth, unitHeight, 0x000000);
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
