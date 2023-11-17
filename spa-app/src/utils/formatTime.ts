export function convertTimeToMinutes(time: string) {
    const [hours, minutes, _seconds] = time.split(':');
    const totalMinutes = parseInt(hours, 10) * 60 + parseInt(minutes, 10);
    return totalMinutes;
}

export function formatTime(value: number) {
    const minute = Math.floor(value / 60);
    const seconds = value - minute * 60;
    const formattedSeconds = seconds.toFixed(2).split(".")[1]; // Keep two digits after the decimal point
    return `${minute}:${formattedSeconds}`;
}