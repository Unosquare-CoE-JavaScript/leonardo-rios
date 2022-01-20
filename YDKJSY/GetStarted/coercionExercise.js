const dayStart="07:30";
const dayEnd="17:45";

function scheduleMeeting(startTime, durationMinutes) {
    const toSeconds = function (time) {
        const colonI = time.indexOf(':');
        const hours = time.substring(0, colonI);
        const minutes = time.substring(colonI+1, time.length);

        // Coercion happening: string to number,
        // First string uses implicit coercion ( * ), second string needs explicit coercion
        return hours * 60  + Number(minutes);
    }

    const start = toSeconds (dayStart);
    const end = toSeconds (dayEnd);
    const meetingStart =  toSeconds(startTime);
    // Coercion not happening, but variables are of the same type
    const meetingEnd = meetingStart + durationMinutes;

    // Coercion not happening, rules of inequalities apply
    return start <= meetingStart && meetingEnd <= end;
}

console.log(scheduleMeeting("7:00",15));  // false
console.log(scheduleMeeting("07:15",30)); // false
console.log(scheduleMeeting("7:30",30));  // true
console.log(scheduleMeeting("11:30",60)); // true
console.log(scheduleMeeting("17:00",45)); // true
console.log(scheduleMeeting("17:30",30)); // false
console.log(scheduleMeeting("18:00",15)); // false
