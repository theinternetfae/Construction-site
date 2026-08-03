import { useContext, useEffect, useState, useMemo } from "react";
import { TaskContext } from "../js files/contexts";
import dayjs from "dayjs";
import { calculateTimeToMidnight, getDates } from "../js files/Utilities.js"
import Alert from "../utilities jsx/Alert.jsx";
import TaskEditor from "../utilities jsx/TaskEditor.jsx";

function Stats() {

    const { taskList } = useContext(TaskContext);

    const [today, setToday] = useState(dayjs());

    useEffect(() => {

        function rescheduleToday() {
            
            const changeDay = setTimeout(() => {

                setToday(dayjs);

                rescheduleToday();

            }, calculateTimeToMidnight()) 
        
            return changeDay;
        }

        const timeout = rescheduleToday();

        return () => clearTimeout(timeout);

    }, []);



    const [chosenMonth, setChosenMonth] = useState(today);
        
    const visibleMonth = useMemo(() => {

        const monthStart = chosenMonth.startOf('month');
        const monthEnd = chosenMonth.endOf('month');

        const month = getDates(monthStart, monthEnd);
        return month;

    }, [chosenMonth])


    const [chosenTaskId, setchosenTaskId] = useState('');

    const chosenTasks = useMemo(() => {
        const chosen = taskList.filter(t => t.parentId === chosenTaskId);
        
        const chosenScheduled = chosen.map(t => ({
            scheduledDate: t.scheduledDate,
            color: t.color,
            complete: t.completed
        }));

        return chosenScheduled|| [];
    }, [chosenTaskId])

    useEffect(() => {
        console.log(chosenTasks);
    }, [chosenTasks])

    const [aboutPage, setAboutPage] = useState(false);
    const [taskEditor, setTaskEditor] = useState(false);



    const uniqueTasks = useMemo(() => {
        
        const uniqueTasksMap = new Map();

        for (const task of taskList) {
            if (task.days.length > 0) {
                uniqueTasksMap.set(task.parentId, task);
            }
        }

        const uniqueTasks = [...uniqueTasksMap.values()];
        
        return uniqueTasks;

    }, [taskList, today]);



















    //STATS CALCULATIONS

    const stopperList = useMemo(() => {

        const sortedTaskList = [...taskList].sort((a, b) => dayjs(a.scheduledDate) - dayjs(b.scheduledDate))

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

    }) 

    
    //1. GENERAL STATS

    const generalCirlceProgress = useMemo(() => {

        let counter = 100;

        const completed = taskList.filter(t => t.completed).length;


        const progress = taskList.length === 0 ? 0 : completed / taskList.length * 100;
        
        counter = counter - progress;

        return {
            counter,
            progress: progress.toFixed(2)
        };
    
    }, [taskList])


    const generalTodayStatus = useMemo(() => {

        const total = taskList.filter(t => dayjs(t.scheduledDate).isSame(today, "day"));
        const completedList = total.filter(t => t.completed).length;

        return {
            todayComplete: total.length === completedList,
            result: `${completedList}/${total.length}`
        };

    }, [taskList]);


    const generalTopStreak = useMemo(() => {        

        let count = 0;

        const streakList = stopperList.reduce((acc, t) => {
            
            if(t.complete === true) {
              count++  
            } else {
                acc.push(count);
                count = 0;
            }

            return acc;

        }, [])

        if (count > 0) {
            
            if(generalTodayStatus.todayComplete) {
                count++
            }
            
            streakList.push(count);
        
        }

        return Math.max(...streakList, 0);
    
    }, [stopperList]);


    const generalCurrentStreak = useMemo(() => {
        
        let count = 0;

        for (const task of stopperList) {
            count = task.complete ? count + 1 : 0
        }

        if(generalTodayStatus.todayComplete) {
            count++
        }

        return count;
    
    }, [stopperList, taskList]);

    
    const generalTotalActive = useMemo(() => {

        const totalActive = uniqueTasks.filter(t => dayjs(t.end).isAfter(today));

        return totalActive.length;

    }, [uniqueTasks])
    
    useEffect(() => {
        console.log(generalTotalActive);
    }, [])



    return ( 
        <div className="stats">
            
            <section className="stats-header">

                <i className="bi bi-lightbulb-fill" 
                onClick={() => setAboutPage(true)}></i>

                <select id="unique-tasks" value={chosenTaskId}    
                    onChange={(e) => setchosenTaskId(e.target.value)}>

                    <option value="">📈 Overall</option>

                    {uniqueTasks.map(t => {
                        return <option 
                            value={t.parentId} 
                            key={t.parentId} 
                        >
                            {`${t.emoji} ${t.name}`}
                        </option>
                    })}

                </select>

                <i className="bi bi-clipboard-plus-fill" 
                onClick={() => setTaskEditor(true)}></i>

            </section>
            
            <section className="stats-tasks-cont">
                    
                <p className="stats-task"
                    onClick={() => setchosenTaskId('')}
                    style={{
                        borderColor: !chosenTaskId ? 'var(--accent)' : "transparent"
                    }} 
                >📈 <span className={`stats-task-title ${!chosenTaskId ? `block` : ''}`}>Overall</span></p>

                {uniqueTasks.map(t => {
                    return <p className="stats-task"
                        style={{
                            borderColor: chosenTaskId === t.parentId ? t.color : "transparent"
                        }} 
                        key={t.parentId}
                        onClick={() => setchosenTaskId(t.parentId)}
                    >
                        {`${t.emoji}`}<span className={`stats-task-title ${chosenTaskId === t.parentId ? `block` : ''}`}>{`${t.name}`}</span>
                    </p>
                })}
            
            </section>
            
            <section className="stats-calendar">
                <div className="calendar-outer">

                    <i className="bi bi-chevron-left" onClick={() => setChosenMonth(prev => prev.subtract(1, 'month'))}></i>
                    
                    <div className="calendar-inner">
                        <p className="calendar-month" onClick={() => setChosenMonth(today)}>{chosenMonth.format('MMMM YYYY')}</p>
                        <div className="calender">

                            <div className="calendar-header">

                                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                                    <p key={i}>{d}</p>
                                ))}                            

                            </div>


                            <div className="calendar-dates">
                                {
                                    visibleMonth.length > 0 &&
                                    Array(visibleMonth[0].date.day()).fill(null).map((_, i) => (
                                        <div key={"blank" + i} className="blank"></div>
                                    ))
                                }

                                {

                                    visibleMonth.map((day, i) => {
                                        const isToday = day.date.isToday();

                                        const color = chosenTasks.map(t => t.color);
                                        const chosenColor = color[0];
                                        
                                        const isScheduled = chosenTasks.some(t => t.scheduledDate === day.date.format('YYYY-MM-DD'));
                                        const isCompleted = chosenTasks.some(t => t.scheduledDate === day.date.format('YYYY-MM-DD') && t.complete);

                                        return (
                                            <p key={i} className={`dates 
                                                ${isToday ? 'bg-[var(--accent)] text-white' : ''} 
                                            `}
                                            style={{
                                                borderColor: isScheduled ? chosenColor : ''
                                            }}
                                            >{isCompleted ? <i className="bi bi-trophy-fill"></i> : day.dayNumber}</p>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    
                    <i className="bi bi-chevron-right" onClick={() => setChosenMonth(prev => prev.add(1, 'month'))}></i>
                
                </div>
            </section>

            <section className="stats-calculator-cont">

                <div className="stats-calculator cont-main">

                    <svg className="progress-ring" viewBox="0 0 40 40" >

                        <circle
                            className="progress-bg"
                            cx="20"
                            cy="20"
                            r="16"
                            strokeDasharray={100}
                            strokeDashoffset={0}
                        />

                        <circle
                            className="progress"
                            cx="20"
                            cy="20"
                            r="16"
                            strokeDasharray={100}
                            strokeDashoffset={`${!chosenTaskId ? generalCirlceProgress.counter : 100}`}
                            style={{
                                stroke: !chosenTasks.length ? 'var(--accent)' : chosenTasks[0].color 
                            }}
                        />

                    </svg>

                    <div className="calculator-circle">
                        <div className="calculator-cirlce-inner">
                        
                            <p> {`${!chosenTaskId ? generalCirlceProgress.progress : 0}`}%</p>
                        
                        </div>
                    </div>

                </div>
                
                <div className="stats-results cont-main">
                    
                    <div className="result-cont"
                        style={{
                            borderColor: !chosenTasks.length ? 'var(--accent)' : chosenTasks[0].color 
                        }}    
                    >

                        <i className="bi bi-stars"
                        style={{
                            color: !chosenTasks.length ? 'var(--accent)' : chosenTasks[0].color 
                        }}></i>

                        <p className="result-counter">{`${!chosenTaskId ? generalTopStreak : 0}`} days</p>
                        <p className="title">Top streak</p>
                    </div>
                    
                    
                    
                    <div className="result-cont"
                        style={{
                            borderColor: !chosenTasks.length ? 'var(--accent)' : chosenTasks[0].color 
                        }}    
                    >
                        
                        <i className="bi bi-fire"
                        style={{
                            color: !chosenTasks.length ? 'var(--accent)' : chosenTasks[0].color 
                        }}></i>
                        
                        <p className="result-counter">{`${!chosenTaskId ? generalCurrentStreak : 0}`} days</p>
                        <p className="title">Current streak</p>
                    </div>

                    
                    
                    <div className="result-cont"
                        style={{
                            borderColor: !chosenTasks.length ? 'var(--accent)' : chosenTasks[0].color 
                        }}    
                    >
                        
                        <i className="bi bi-check-circle"
                        style={{
                            color: !chosenTasks.length ? 'var(--accent)' : chosenTasks[0].color 
                        }}></i>
                        
                        <p className="result-counter">{`${!chosenTaskId ? generalTodayStatus.result : 0}`}</p>
                        <p className="title">Today's Status</p>

                    </div>
                    
                    
                    
                    <div className="result-cont"
                        style={{
                            borderColor: !chosenTasks.length ? 'var(--accent)' : chosenTasks[0].color 
                        }}    
                    >
                        
                        <i className="bi bi-info-circle"
                        style={{
                            color: !chosenTasks.length ? 'var(--accent)' : chosenTasks[0].color 
                        }}></i>
                        
                        <p className="result-counter">{`${!chosenTaskId ? generalTotalActive : 0}`} Active</p>
                        <p className="title">Active Status</p>
                    </div>
                </div>
            
            </section>
        
            {aboutPage && <Alert
                text={'Only reoccuring tasks are displayed here and calculated to determine your stats.'}
                buttonTextOne={'Okay'}
                buttonActionOne={() => setAboutPage(false)}
            />}

            {taskEditor && <TaskEditor
                exit={() => setTaskEditor(false)}
            />}

        </div>
    );
}

export default Stats;