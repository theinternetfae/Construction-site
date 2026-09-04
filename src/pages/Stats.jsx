import { useContext, useEffect, useState, useMemo } from "react";
import { TaskContext, UserContext } from "../js files/contexts.js";
import dayjs from "dayjs";
import { calculateTimeToMidnight, getDates, statsStopperList } from "../js files/utilities.js"
import Alert from "../utilities jsx/Alert.jsx";
import TaskEditor from "../utilities jsx/TaskEditor.jsx";

function Stats() {

    const { taskList, generalCirlceProgress } = useContext(TaskContext);
    const { userProfile } = useContext(UserContext);

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
            completed: t.completed
        }));

        return chosenScheduled|| [];
    }, [chosenTaskId])

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










    //1. GENERAL STATS


    const generalTodayStatus = useMemo(() => {

        const total = taskList.filter(t => dayjs(t.scheduledDate).isSame(today, "day"));
        const completedList = total.filter(t => t.completed).length;

        return {
            todayComplete: total.length === completedList,
            result: `${completedList}/${total.length}`
        };

    }, [taskList]);

    const generalActiveStatus = useMemo(() => {

        const totalActive = uniqueTasks.filter(t => dayjs(t.end).isAfter(today));

        return totalActive.length;

    }, [uniqueTasks])


    const generalTopStreak = useMemo(() => {        
        if(taskList.length === 0) return 0;

        let count = 0;

        const streakList = statsStopperList(taskList).reduce((acc, t) => {
            
            if(t.complete === true) {
              count++  
            } else {
                acc.push(count);
                count = 0;
            }

            return acc;

        }, [])

        if(generalTodayStatus.todayComplete) {
            count++
        }

        if (count > 0) {
                
            streakList.push(count);
        
        }

        return Math.max(...streakList, 0);
    
    }, [chosenTaskId, taskList]);


    const generalCurrentStreak = useMemo(() => {
        
        if(taskList.length === 0) return 0;

        let count = 0;

        for (const task of statsStopperList(taskList)) {
            count = task.complete ? count + 1 : 0
        }

        if(generalTodayStatus.todayComplete) {
            count++
        }

        return count;
    
    }, [chosenTaskId, taskList, generalTodayStatus]);
    















    //2.SPECIFIC STATS
    const specificCirlceProgress = useMemo(() => {

        let counter = 100;

        const completed = chosenTasks.filter(t => t.completed).length;

        const progress = chosenTasks.length === 0 ? 0 : completed / chosenTasks.length * 100;
        
        counter = counter - progress;

        return {
            counter,
            progress: progress.toFixed(2)
        };
    
    }, [chosenTaskId])


    const specificTodayStatus = useMemo(() => {

        const todaysTask = chosenTasks.find(t => dayjs(t.scheduledDate).isSame(today, "day"));

        return todaysTask ? `${todaysTask.completed ? 'Completed' : 'Pending'}` : 'None Today';

    }, [chosenTaskId]);


    const specificActiveStatus = useMemo(() => {

        const eligible = uniqueTasks.find(t => t.parentId === chosenTaskId);

        const eligibleStatus = dayjs(eligible?.endDate).isAfter(today, "day");

        return eligibleStatus ? "Active" : "Inactive";

    }, [uniqueTasks, chosenTaskId])


    const specificTopStreak = useMemo(() => {        

        let count = 0;        

        const streakList = statsStopperList(chosenTasks).reduce((acc, t) => {
            
            if(t.complete === true) {
              count++  
            } else {
                acc.push(count);
                count = 0;
            }

            return acc;

        }, [])

        if(specificTodayStatus.toLowerCase() === "completed") {
            count++
        }

        if (count > 0) {
                
            streakList.push(count);
        
        }

        return Math.max(...streakList, 0);
        
    }, [chosenTaskId]);


    const specificCurrentStreak = useMemo(() => {        

        let count = 0;

        for (const task of statsStopperList(chosenTasks)) {
            count = task.complete ? count + 1 : 0
        }

        if(specificTodayStatus.toLowerCase() === 'completed') {
            count++
        }

        return count;
        
    }, [chosenTaskId]);


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

                    <i className="bi bi-caret-left" onClick={() => setChosenMonth(prev => prev.subtract(1, 'month'))}></i>
                    
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
                                        const isCompleted = chosenTasks.some(t => t.scheduledDate === day.date.format('YYYY-MM-DD') && t.completed);

                                        const taskExists = taskList.some(t => t.scheduledDate === day.date.format('YYYY-MM-DD'));

                                        const existingTasks = taskList.filter(t => t.scheduledDate === day.date.format('YYYY-MM-DD'));

                                        let existingTasksComplete = false; 

                                        if(existingTasks.length > 0) {

                                            const checkComplete = existingTasks.every(t => t.completed === true);

                                            existingTasksComplete = checkComplete;

                                        }

                                        return (
                                            <p key={i} className={`dates 
                                                ${isToday ? 'bg-[var(--accent)] text-white' : ''} 
                                            `}
                                            style={{
                                                borderColor: !chosenTaskId && taskExists ? 'var(--accent)' : (isScheduled ? chosenColor : '')
                                            }}
                                            >{!chosenTaskId ? (existingTasksComplete ? <i className="bi bi-trophy-fill"></i> : day.dayNumber) : (isCompleted ? <i className="bi bi-trophy-fill"></i> : day.dayNumber)}</p>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    
                    <i className="bi bi-caret-right" onClick={() => setChosenMonth(prev => prev.add(1, 'month'))}></i>
                
                </div>
            </section>

            <section className={`stats-calculator-cont ${userProfile?.prefs.streak ? '' : 'hidden'}`}>

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
                            strokeDashoffset={`${!chosenTaskId ? generalCirlceProgress.counter : specificCirlceProgress.counter}`}
                            style={{
                                stroke: !chosenTasks.length ? 'var(--accent)' : chosenTasks[0].color 
                            }}
                        />

                    </svg>

                    <div className="calculator-circle">
                        <div className="calculator-cirlce-inner">
                        
                            <p> {`${!chosenTaskId ? generalCirlceProgress.progress : specificCirlceProgress.progress}`}%</p>
                        
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

                        <p className="result-counter">{`${!chosenTaskId ? generalTopStreak : specificTopStreak}`} days</p>
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
                        
                        <p className="result-counter">{`${!chosenTaskId ? generalCurrentStreak : specificCurrentStreak}`} days</p>
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
                        
                        <p className="result-counter">{`${!chosenTaskId ? generalTodayStatus.result : specificTodayStatus}`}</p>
                        <p className="title">Todays Status</p>

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
                        
                        <p className="result-counter">{`${!chosenTaskId ? generalActiveStatus : specificActiveStatus}`} <span className={specificActiveStatus === 'Active' ? "hidden" : ''}>Active</span></p>
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