import {SCREEN_HEIGHT, SCREEN_WIDTH, MIN_ZOOM, MAX_ZOOM} from "./config.js"
import {NUM_WIDTH, NUM_HEIGHT} from "./pixels_manager.js"
import PixelManager from "./pixels_manager.js";

const TOTAL_STEPS = 10000;
export {TOTAL_STEPS};

function copy(aObject) {
    if (!aObject) {
      return aObject;
    }
  
    let v;
    let bObject = Array.isArray(aObject) ? [] : {};
    for (const k in aObject) {
      v = aObject[k];
      bObject[k] = (typeof v === "object") ? copy(v) : v;
    }
  
    return bObject;
  }

export default class RandomWalkAgent{
    currX = 0;
    currY = 0;
    currMax = 1;
    constructor(startingX, startingY){
        this.currX = startingX;
        this.currY = startingY;

        this.timesArray = Array(NUM_WIDTH);
        for (let i = 0; i < this.timesArray.length; i++) {
            this.timesArray[i] = new Array(NUM_HEIGHT);
            for (let j = 0; j < NUM_HEIGHT; j++){
                this.timesArray[i][j] = 0;
            }
        }

        this.coordsHistoryArray = Array(TOTAL_STEPS);
        this.maxsHistory = Array(TOTAL_STEPS);
    }

    // this is the number of steps backwards
    getArrayHistory(numStepBack){
        var newTimesArray = copy(this.timesArray);
        for (var i=TOTAL_STEPS-1; i>(TOTAL_STEPS-1-numStepBack); i--){
            if (this.coordsHistoryArray[i] == undefined){
                currCoord = undefined;
                continue;
            }
            var currCoord = PixelManager.convertLeftTopCoord(this.coordsHistoryArray[i][0], this.coordsHistoryArray[i][1]);
            newTimesArray[currCoord[0]][currCoord[1]]--;
        }

        return [newTimesArray, this.maxsHistory[TOTAL_STEPS-numStepBack], currCoord];
    }

    doAllSteps(){
        for (let i=0; i<TOTAL_STEPS; i++){
            var coords_temp = this.nextMove();
            var coords = PixelManager.convertLeftTopCoord(coords_temp[0], coords_temp[1]);

            if (coords[0] < 0 || coords[0] >= NUM_WIDTH || coords[1] < 0 || coords[1] >= NUM_HEIGHT){
                this.maxsHistory[i] = this.currMax;
                this.coordsHistoryArray[i] = undefined;
                continue;
            }
            this.coordsHistoryArray[i] = [this.currX, this.currY];
            this.timesArray[coords[0]][coords[1]]++;

            this.currMax = Math.max(this.currMax, this.timesArray[coords[0]][coords[1]]);
            this.maxsHistory[i] = this.currMax;
        }
    }


    // Calculate the next coordinate
    nextMove(){
        var index = Math.floor(Math.random() * 4);
        switch(index){
            case 0:
                this.currX+=1;
                break;
            case 1:
                this.currY+=1;
                break;
            case 2:
                this.currX-=1;
                break;
            case 3:
                this.currY-=1;
                break;
        }
        
        return [this.currX, this.currY];
        //return [1, 0];
    }
}