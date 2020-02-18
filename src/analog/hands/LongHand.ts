///<reference path="../../decimal/DecimalTime.ts"/>
namespace hands {
    import DecimalTime = decimal.DecimalTime;
    export class LongHand extends Hand {
        constructor(svg: HTMLElement) {
            super(svg);
            this._radius = 90;
            this._path.setAttribute("stroke", "#333");
            this._path.setAttribute("fill", "none");
            this._path.setAttribute("stroke-width", "3");
            this._path.setAttribute("stroke-linejoin", "round");
            this.enterFrame();
        }

        enterFrame(): void {
            super.enterFrame();
            this._theta = 2 * Math.PI * (DecimalTime.decimalMinute / 100) - Math.PI * 0.5;
            this.draw();
        }
    }
}