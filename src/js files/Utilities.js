import dayjs from "./DayJs.js";

export function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    return regex.test(email);
}

export function isStrongPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]{8,}$/;

    return regex.test(password);
}

export function formatDate(date) {
    const theDate = new Date(date);

    const year = theDate.getFullYear();
    const month = theDate.getMonth() + 1;
    const day = theDate.getDate();

    return `${year}-${lessThanTen(month)}-${lessThanTen(day)}`;
}

export function lessThanTen(less) {
    return less < 10 ? `0${less}` : less;
}

export function getDates(start, end) {
    
    const visibleDates = [];

    for (let i = start; i.isSameOrBefore(end); i = i.add(1, "day")) {
        
        visibleDates.push({
            date: i,
            key: i.format("YYYY-MM-DD"),
            day: i.format("ddd"),
            dayNumber: i.date(),
            month: i.format("MMM"),
            year: i.format('YYYY'),
            isToday: i.isToday(),
        });
    
    }

    return visibleDates;
}

export function calculateTimeToMidnight() {

    const now = dayjs();

    const toNextMidnight = now
    .add(1, 'day')
    .startOf('day')
    .diff(now);

    return toNextMidnight;

}