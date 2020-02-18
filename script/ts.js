var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var decimal;
(function (decimal_1) {
    var DecimalTime = (function () {
        function DecimalTime(block) {
            block = null;
        }
        Object.defineProperty(DecimalTime, "decimalMilliSecond", {
            get: function () {
                return this._decimalMilliSecond;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DecimalTime, "decimalSecond", {
            get: function () {
                return this._decimalSecond;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DecimalTime, "decimalMinute", {
            get: function () {
                return this._decimalMinute;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DecimalTime, "decimalHour", {
            get: function () {
                return this._decimalHour;
            },
            enumerable: true,
            configurable: true
        });
        DecimalTime.getInstance = function () {
            if (this._instance == null) {
                this._instance = new DecimalTime(new SingletonBlock());
            }
            return this._instance;
        };
        DecimalTime.enterFrame = function () {
            var now = new Date();
            var time = (now.getHours() * 60 * 60 * 1000) + (now.getMinutes() * 60 * 1000) + (now.getSeconds() * 1000) + now.getMilliseconds();
            var decimal = Math.floor((10 * 100 * 100 * 1000) * (time / (24 * 60 * 60 * 1000)));
            this._decimalHour = Math.floor(decimal / (100 * 100 * 1000));
            this._decimalMinute = Math.floor((decimal - (this._decimalHour * 100 * 100 * 1000)) / (100 * 1000));
            this._decimalSecond = Math.floor((decimal - (this._decimalHour * 100 * 100 * 1000) - (this._decimalMinute * 100 * 1000)) / 1000);
            this._decimalMilliSecond = decimal - (this._decimalHour * 100 * 100 * 1000) - (this._decimalMinute * 100 * 1000) - (this._decimalSecond * 1000);
        };
        return DecimalTime;
    }());
    decimal_1.DecimalTime = DecimalTime;
    var SingletonBlock = (function () {
        function SingletonBlock() {
        }
        return SingletonBlock;
    }());
})(decimal || (decimal = {}));
var digital;
(function (digital) {
    var DecimalTime = decimal.DecimalTime;
    var DigitalClock = (function () {
        function DigitalClock(svg) {
            this._positionX = 110;
            this._positionY = 160;
            this._text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            this._text.setAttribute("id", "digital_clock");
            this._text.setAttribute('x', this._positionX.toString());
            this._text.setAttribute('y', this._positionY.toString());
            svg.appendChild(this._text);
            this.enterFrame();
        }
        DigitalClock.prototype.enterFrame = function () {
            var hour = (DecimalTime.decimalHour).toString();
            var minute = digital.DigitalClock.plusZero(DecimalTime.decimalMinute);
            var second = digital.DigitalClock.plusZero(DecimalTime.decimalSecond);
            this._text.textContent = hour + ":" + minute + ":" + second;
        };
        DigitalClock.plusZero = function (value) {
            return (value + 100).toString().substr(1);
        };
        return DigitalClock;
    }());
    digital.DigitalClock = DigitalClock;
})(digital || (digital = {}));
var hands;
(function (hands) {
    var Hand = (function () {
        function Hand(svg) {
            this._centerX = 110;
            this._centerY = 110;
            this._path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            svg.appendChild(this._path);
        }
        Hand.prototype.enterFrame = function () {
        };
        Hand.prototype.draw = function () {
            var startX = this._centerX + this._radius * Math.cos(this._theta);
            var startY = this._centerY + this._radius * Math.sin(this._theta);
            var endX = this._centerX;
            var endY = this._centerY;
            var value = "M " + startX + "," + startY + " L " + endX + "," + endY + " Z";
            this._path.setAttribute("d", value);
        };
        return Hand;
    }());
    hands.Hand = Hand;
})(hands || (hands = {}));
var hands;
(function (hands) {
    var DecimalTime = decimal.DecimalTime;
    var SecondHand = (function (_super) {
        __extends(SecondHand, _super);
        function SecondHand(svg) {
            var _this = _super.call(this, svg) || this;
            _this._radius = 100;
            _this._path.setAttribute("stroke", "#333");
            _this._path.setAttribute("fill", "none");
            _this._path.setAttribute("stroke-width", "2");
            _this._path.setAttribute("stroke-linejoin", "round");
            _this.enterFrame();
            return _this;
        }
        SecondHand.prototype.enterFrame = function () {
            _super.prototype.enterFrame.call(this);
            this._theta = 2 * Math.PI * ((DecimalTime.decimalSecond + (DecimalTime.decimalMilliSecond / 1000)) / 100) - Math.PI * 0.5;
            this.draw();
        };
        return SecondHand;
    }(hands.Hand));
    hands.SecondHand = SecondHand;
})(hands || (hands = {}));
var hands;
(function (hands) {
    var DecimalTime = decimal.DecimalTime;
    var ShortHand = (function (_super) {
        __extends(ShortHand, _super);
        function ShortHand(svg) {
            var _this = _super.call(this, svg) || this;
            _this._radius = 75;
            _this._path.setAttribute("stroke", "#333");
            _this._path.setAttribute("fill", "none");
            _this._path.setAttribute("stroke-width", "6");
            _this._path.setAttribute("stroke-linejoin", "round");
            _this.enterFrame();
            return _this;
        }
        ShortHand.prototype.enterFrame = function () {
            _super.prototype.enterFrame.call(this);
            this._theta = 2 * Math.PI * ((DecimalTime.decimalHour + (DecimalTime.decimalMinute / 100)) / 10) - Math.PI * 0.5;
            this.draw();
        };
        return ShortHand;
    }(hands.Hand));
    hands.ShortHand = ShortHand;
})(hands || (hands = {}));
var hands;
(function (hands) {
    var DecimalTime = decimal.DecimalTime;
    var LongHand = (function (_super) {
        __extends(LongHand, _super);
        function LongHand(svg) {
            var _this = _super.call(this, svg) || this;
            _this._radius = 90;
            _this._path.setAttribute("stroke", "#333");
            _this._path.setAttribute("fill", "none");
            _this._path.setAttribute("stroke-width", "3");
            _this._path.setAttribute("stroke-linejoin", "round");
            _this.enterFrame();
            return _this;
        }
        LongHand.prototype.enterFrame = function () {
            _super.prototype.enterFrame.call(this);
            this._theta = 2 * Math.PI * (DecimalTime.decimalMinute / 100) - Math.PI * 0.5;
            this.draw();
        };
        return LongHand;
    }(hands.Hand));
    hands.LongHand = LongHand;
})(hands || (hands = {}));
var analog;
(function (analog) {
    var SecondHand = hands.SecondHand;
    var ShortHand = hands.ShortHand;
    var LongHand = hands.LongHand;
    var AnalogClock = (function () {
        function AnalogClock(svg) {
            this._centerX = 110;
            this._centerY = 110;
            var n = 10;
            for (var i = 0; i < n; i++) {
                var value = i;
                var radius = 85;
                var theta = 2 * Math.PI * (i / n) - 0.5 * Math.PI;
                var rotate = 360 * (i / n);
                var x = (radius * Math.cos(theta) + this._centerX).toString();
                var y = (radius * Math.sin(theta) + this._centerY).toString();
                var dial = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                dial.setAttribute("class", "analog_dial");
                dial.setAttribute("transform", "translate(" + x + " " + y + ") rotate(" + rotate + ")");
                dial.textContent = value.toString();
                svg.appendChild(dial);
            }
            this._hands = [];
            var hand;
            hand = new SecondHand(svg);
            this._hands.push(hand);
            hand = new ShortHand(svg);
            this._hands.push(hand);
            hand = new LongHand(svg);
            this._hands.push(hand);
        }
        AnalogClock.prototype.enterFrame = function () {
            var n = this._hands.length;
            for (var i = 0; i < n; i++) {
                var hand = this._hands[i];
                hand.enterFrame();
            }
        };
        return AnalogClock;
    }());
    analog.AnalogClock = AnalogClock;
})(analog || (analog = {}));
var DigitalClock = digital.DigitalClock;
var DecimalTime = decimal.DecimalTime;
var AnalogClock = analog.AnalogClock;
var main;
var Main = (function () {
    function Main() {
        var _this = this;
        var interval = function () {
            _this.enterFrame();
        };
        DecimalTime.getInstance();
        DecimalTime.enterFrame();
        var svg = document.getElementById("svg");
        this._digitalClock = new DigitalClock(svg);
        this._analogClock = new AnalogClock(svg);
        var fps = 60 / 1000;
        setInterval(interval, fps);
    }
    Main.prototype.enterFrame = function () {
        DecimalTime.enterFrame();
        this._digitalClock.enterFrame();
        this._analogClock.enterFrame();
    };
    return Main;
}());
window.addEventListener("load", function () {
    main = new Main();
});
//# sourceMappingURL=ts.js.map