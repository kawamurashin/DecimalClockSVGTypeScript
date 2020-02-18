namespace decimal {
    export class DecimalTime {
        static get decimalMilliSecond(): number {
            return this._decimalMilliSecond;
        }

        static get decimalSecond(): number {
            return this._decimalSecond;
        }

        static get decimalMinute(): number {
            return this._decimalMinute;
        }

        static get decimalHour(): number {
            return this._decimalHour;
        }

        private static _decimalHour: number;
        private static _decimalMinute: number;
        private static _decimalSecond: number;
        private static _decimalMilliSecond: number;
        private static _instance: DecimalTime;

        public static getInstance(): DecimalTime {
            if (this._instance == null) {
                this._instance = new DecimalTime(new SingletonBlock());
            }
            return this._instance;
        }

        constructor(block: SingletonBlock) {
            block = null;
        }

        public static enterFrame(): void {
            let now = new Date();
            let time: number = (now.getHours() * 60 * 60 * 1000) + (now.getMinutes() * 60 * 1000) + (now.getSeconds() * 1000) + now.getMilliseconds();
            let decimal = Math.floor((10 * 100 * 100 * 1000) * (time / (24 * 60 * 60 * 1000)));
            this._decimalHour = Math.floor(decimal / (100 * 100 * 1000));
            this._decimalMinute = Math.floor((decimal - (this._decimalHour * 100 * 100 * 1000)) / (100 * 1000));
            this._decimalSecond = Math.floor((decimal - (this._decimalHour * 100 * 100 * 1000) - (this._decimalMinute * 100 * 1000)) / 1000);
            this._decimalMilliSecond = decimal - (this._decimalHour * 100 * 100 * 1000) - (this._decimalMinute * 100 * 1000) - (this._decimalSecond * 1000);
        }
    }

    class SingletonBlock {

    }
}
