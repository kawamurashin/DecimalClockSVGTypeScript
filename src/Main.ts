///<reference path="digital/DigitalClock.ts"/>
///<reference path="decimal/DecimalTime.ts"/>
///<reference path="analog/AnalogClock.ts"/>
import DigitalClock = digital.DigitalClock;
import DecimalTime = decimal.DecimalTime;
import AnalogClock = analog.AnalogClock;
let main: Main;
class Main {

    private _digitalClock:DigitalClock;
    private _analogClock:AnalogClock;
    constructor() {
        const interval = () => {
            this.enterFrame();
        };
        DecimalTime.getInstance();
        DecimalTime.enterFrame();

        let svg:HTMLElement = document.getElementById("svg");
        this._digitalClock = new DigitalClock(svg);
        this._analogClock = new AnalogClock(svg);

        let fps = 60 / 1000;
        setInterval(interval, fps);
    }
    private enterFrame() {
        DecimalTime.enterFrame();

        this._digitalClock.enterFrame();
        this._analogClock.enterFrame();
    }
}


window.addEventListener("load", () => {
    main = new Main();
});