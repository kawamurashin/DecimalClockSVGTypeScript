///<reference path="../../decimal/DecimalTime.ts"/>
namespace hands {
    import DecimalTime = decimal.DecimalTime;
    export class SecondHand extends Hand {
        constructor(svg: HTMLElement) {
            super(svg);
            this._radius = 100;
            this._path.setAttribute("stroke", "#333");
            this._path.setAttribute("fill", "none");
            this._path.setAttribute("stroke-width", "2");
            this._path.setAttribute("stroke-linejoin", "round");
            this.enterFrame();
        }

        enterFrame(): void {
            super.enterFrame();
            //let theta:number = 2*Math.PI *((DecimalTime.decimalSecond + (DecimalTime.decimalMilliSecond/1000)) / 100) - Math.PI*0.5;
            this._theta = 2 * Math.PI * ((DecimalTime.decimalSecond + (DecimalTime.decimalMilliSecond / 1000)) / 100) - Math.PI * 0.5;
            this.draw();
        }
    }
}