const dateElement = document.getElementById('date');

class Clock {
    constructor(hours, minutes, seconds) {
        hours < 10 ? this.hours = `0${hours}` : this.hours = hours;
        minutes < 10 ? this.minutes = `0${minutes}` : this.minutes = minutes;
        seconds < 10 ? this.seconds = `0${seconds}` : this.seconds = seconds;
        this.now = `${this.hours}:${this.minutes}:${this.seconds}`;
    }

    update() {
        const clock = new Clock(new Date().getHours(), new Date().getMinutes(), new Date().getSeconds());

        dateElement.innerHTML = clock.now;

        return setTimeout(clock.update, 1000);
    }
}

const clock = new Clock();
clock.update();
