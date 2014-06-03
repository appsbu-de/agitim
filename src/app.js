function initTimer() {

    var timer = new Timer(),
        timerTotal = new Timer(),
        agile = new Agile(),
        isRunning = false,
        sbDuration = document.getElementById('duration'),
        sbParticipants = document.getElementById('participants'),
        actionButton = document.getElementById('action'),
        formattedTime = timer.getFormatedTime(0),
        timerElement = document.getElementById('counter'),
        timerTotalElement = document.getElementById('counterTotal'),
        viewParticipantsElement = document.getElementById('numParticipants');

    timerElement.innerHTML = formattedTime;
    timerTotalElement.innerHTML = formattedTime;

    timer.renderTime = true;
    timer.setTimerElement(timerElement);

    timerTotal.renderTime = true;
    timerTotal.setTimerElement(timerTotalElement);

    sbDuration.onchange = sbParticipants.onchange = function() {
        setTimer();
    };

    actionButton.onclick = function() {
        timer.start();
        timerTotal.start();
    };

    function setTimer() {

        var totalTime = sbDuration.value;

        agile.setNumParticipants(sbParticipants.value);
        agile.setDuration(totalTime);

        var timePerSpeaker = Math.ceil(agile.calculateSpeakingTime());

        timer.setCountdown(timePerSpeaker);
        timerTotal.setCountdown(totalTime);

        viewParticipantsElement.innerHTML = sbParticipants.value;
        renderTimerElement(timePerSpeaker, totalTime);
    }

    function renderTimerElement(timeToSpeak, total) {
        timerElement.innerHTML = timer.getFormatedTime(timeToSpeak);
        timerTotalElement.innerHTML = timerTotal.getFormatedTime(total);
    }
}
