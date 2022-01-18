const SPECTRUM_BLUE = [0xffffff, 0xfffdd8, 0xedf8b1, 0xc7e9b4, 0x4ab6c4, 0x3891bf, 0x215ea7, 0x253394, 0x061d58];

export {SPECTRUM_BLUE};

export default class SpectrumUtil{
    constructor(){

    }

    getColorTimes(times, maxTimes){
        if (maxTimes <= SPECTRUM_BLUE.length){
            return SPECTRUM_BLUE[times];
        }
        else{
            return SPECTRUM_BLUE[Math.round(times/(maxTimes/SPECTRUM_BLUE.length))]
        }
    }
}