(function(global) {

    var numParticipants,
        meetingDuration;

    function Agile() {
        numParticipants = 1;
        meetingDuration = 30;
    }

    Agile.prototype.setNumParticipants = function(participants) {
        console.log(participants);
        numParticipants = participants || 1;
    };

    Agile.prototype.getParticipants = function() {
        return numParticipants;
    };

    Agile.prototype.getDuration = function() {
        return meetingDuration;
    };

    Agile.prototype.setDuration = function(duration) {
        meetingDuration = duration || 30;
    };

    Agile.prototype.calculateSpeakingTime = function() {
        if (numParticipants < 1 || meetingDuration < 1) {
            return 0;
        }

        return (meetingDuration/numParticipants);
    };

    global.Agile = Agile;

})(window);
