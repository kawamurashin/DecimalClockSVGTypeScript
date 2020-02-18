namespace hands {
    export class Hand {
        protected _centerX: number = 110;
        protected _centerY: number = 110;
        protected _path;
        protected _radius: number;
        protected _theta: number;
        constructor(svg: HTMLElement) {
            this._path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            svg.appendChild(this._path);
        }

        public enterFrame(): void {

        }

        public draw(): void {
            const startX: number = this._centerX + this._radius * Math.cos(this._theta);
            const startY: number = this._centerY + this._radius * Math.sin(this._theta);
            const endX: number = this._centerX;
            const endY: number = this._centerY;
            const value: string = "M " + startX + "," + startY + " L " + endX + "," + endY + " Z";
            this._path.setAttribute("d", value);
        }
    }
}
