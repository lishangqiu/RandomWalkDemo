const SPECTRUM_BLUE = [0xffffff, 0xfffdd8, 0xedf8b1, 0xc7e9b4, 0x4ab6c4, 0x3891bf, 0x215ea7, 0x253394, 0x061d58];

export {SPECTRUM_BLUE};

export default class SpectrumUtil{
    maximumRange = 9;
    constructor(){

    } 

    getColorTimes(times, maxTimes){
        if (maxTimes <= SPECTRUM_BLUE.length){
            this.maximumRange = 9;
            return SPECTRUM_BLUE[times];
        }
        else{
            this.maximumRange = this.getNiceRoundedNumber(maxTimes);
            return SPECTRUM_BLUE[this.convertToColor(times)];
        }
    }

    updateRange(){
        document.getElementById("max-thing").innerText = this.maximumRange;
    }


    convertToColor(times){
        return Math.round(times/(this.maximumRange/SPECTRUM_BLUE.length));
    }

    getNiceRoundedNumber(inNumber){
        return Math.ceil(inNumber/5)*5;
    }
}