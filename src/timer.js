(function() {

    var timer,
        runs = false,
        countDown,
        counter,
        timerElement,
        initialCountDown;

    function Timer(countTo, renderTime) {

        countDown = countTo || 15;
        counter = countDown;
        initialCountDown = countDown;
        this.renderTime = renderTime || false;
    }

    Timer.prototype.restart = function(newStartValue) {
        newStartValue = newStartValue || initialCountDown;
        this.start(newStartValue);
    };

    Timer.prototype.stop = function() {
        runs = false;
    };

    Timer.prototype.start = function(startValue) {

        startValue = startValue || counter;
        timer = Date.now();
        runs = true;
        countDown = startValue;
        loop.call(this);
    };

    Timer.prototype.setCountdown = function(countTo) {
        countDown = countTo;
    };

    Timer.prototype.setTimerElement = function(elementToRender) {
        timerElement = elementToRender;
    };

    function renderTime() {
        timerElement.innerHTML = counter;
    }

    function updateTimer() {

        var newTime = Date.now(),
            delta   = parseInt((newTime - timer)/1000);

        counter = countDown - delta;

        if (this.renderTime) {
            renderTime();
        }
    }

    function loop() {

        if (runs && counter > 0) {
            window.requestAnimationFrame(loop.bind(this));
            updateTimer.call(this);
        } else {
            runs = false;
            console.log("Stopped");
        }
    }

    window.Timer = Timer;
})();