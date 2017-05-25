export default class Clock {
    constructor() {
    }

    update() {
        const clock = new Clock(new Date().getHours(), new Date().getMinutes(), new Date().getSeconds());
        const dateElement = document.getElementById('date');
        const options = {
            month: 'long',
            day: 'numeric',
            weekday: 'long',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };
        const date = new Date().toLocaleString("en-US", options);
        dateElement.innerHTML = date;
        return setTimeout(clock.update, 1000);
    }
}
