const TIMER_DELAY = 1000;// update each second

export default class CountDown extends PIXI.Container {
    constructor(ticksCount) {
        super();
        this.ticksCount = ticksCount || 5;// 5 seconds by default

        this.countText = new PIXI.Text('---', {
            // fontWeight: 'bold',
            fontSize: 28,
            fontFamily: 'Arial',
            fill: '#ffffff',
            align: 'center',
            // stroke: '#FFFFFF',
            // strokeThickness: 6
        });
        this.addChild(this.countText);

        this._reset();
    }

    start() {
        this._reset();
        this._startTimer();
    }

    stop() {
        this._stopTimer();
    }

    _startTimer() {
        if (this.timerId >= 0) this._stopTimer();

        this._updateTimerText(this.ticksCount);
        this.countDown = this.ticksCount;
        this.timerId = setInterval(this._timerUpdate.bind(this), TIMER_DELAY);
    }

    _stopTimer() {
        if (this.timerId >= 0) {
            clearInterval(this.timerId);
            this.timerId = -1;
        }
    }

    _timerUpdate() {
        this.countDown--;

        if (this.countDown > 0) {
            this._updateTimerText(this.countDown);
        } else {
            this.emit('timeIsUpEvent');
        }
    }

    _updateTimerText(time) {
        // console.log('Time left: ', time);
        this.countText.text = 'Time left: ' + time;
    }

    _reset() {
        this.timerId = -1;
        this.countDown = 0;
        this._updateTimerText(this.countDown);
    }
}    