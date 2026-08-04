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

export function generateTaskDuplicates(task) {

    if(!task.startDate || !task.endDate) return;   

    const start = dayjs(task.startDate).add(1, 'day');
    const end = dayjs(task.endDate);

    const newTasksArray = [];

    for(let i = start; i.isSameOrBefore(end); i = i.add(1, "day")) {
        
        const uniqueId = crypto.randomUUID();

        if (task.days.includes(i.format('ddd'))) {
            const newTask = {
                ...task, 
                uniqueId,
                scheduledDate: i.format('YYYY-MM-DD'),
                completed: false    
            }
            
            newTasksArray.push(newTask);
        }
    }

    return newTasksArray;
}

export function statsStopperList(list, today) {

    const sortedTaskList = [...list].sort((a, b) => dayjs(a.scheduledDate) - dayjs(b.scheduledDate))

    const grouped = sortedTaskList.reduce((acc, task) => {
        
        const date = task.scheduledDate;

        if(!acc[date]) {
            acc[date] = [];
        }

        acc[date].push(task.completed);

        return acc;

    }, {})

    const theList = Object.entries(grouped).map(([date, completedStat]) => ({
        date,
        complete: completedStat.every(Boolean)
    }));

    const stopperList = theList.filter(t => dayjs(t.date).isBefore(today, "day"));

    return stopperList;

}