function initTimer() {

    var timer = document.getElementById('timerPerAttendee'),
        timerTotal = document.getElementById('timerTotal'),
        agile = new Agile(),
        isCounting = false,
        sbDuration = document.getElementById('duration'),
        sbParticipants = document.getElementById('participants'),
        actionButton = document.getElementById('action'),
        viewParticipantsElement = document.getElementById('numParticipants'),
        counterFlipbox = document.getElementById('counterBox'),
        cancelTimerButton = document.getElementById('cancelTimer');

    sbDuration.onchange = sbParticipants.onchange = function() {
        if (!isCounting) {
            setTimer();
        }
    };

    cancelTimerButton.onclick = function() {
        timer.stop();
        timerTotal.stop();
        counterFlipbox.toggle();
        isCounting = false;
    };

    actionButton.onclick = function() {
        counterFlipbox.toggle();
        timer.start();
        timerTotal.start();
        isCounting = true;
    };

    function setTimer() {

        var totalTime = sbDuration.value;

        agile.setNumParticipants(sbParticipants.value);
        agile.setDuration(totalTime);

        var timePerSpeaker = Math.ceil(agile.calculateSpeakingTime());

        timer.setCountdown(timePerSpeaker);
        timerTotal.setCountdown(totalTime);

        viewParticipantsElement.innerHTML = sbParticipants.value;
    }

}
