function initTimer() {

    var timer = document.getElementById('timerPerAttendee'),
        timerTotal = document.getElementById('timerTotal'),
        agile = new Agile(),
        sbDuration = document.getElementById('duration'),
        sbParticipants = document.getElementById('participants'),
        actionButton = document.getElementById('action'),
        viewParticipantsElement = document.getElementById('numParticipants');

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
    }

}
