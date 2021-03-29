function timer(id,deadline){

    //create a time difference
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()), //получаем милисекунды в конечном времени
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);
        return {
            'total': t,
            'days': days,
            'minutes': minutes,
            'hours': hours,
            'seconds': seconds
        };
    }

    function Getzero(num) {
        if (num >= 0 && num <= 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timerInterval = setInterval(updateClock, 1000);
        updateClock(); //fix bag flicker

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = Getzero(t.days);
            hours.innerHTML = Getzero(t.hours);
            minutes.innerHTML = Getzero(t.minutes);
            seconds.innerHTML = Getzero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timerInterval);
            }
        }
    }
    setClock(id, deadline);
}
export default timer;