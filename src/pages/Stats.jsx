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

        
        console.log("Month start:", monthStart.format('YYYY-MM-DD'));
        console.log("Month end:", monthEnd.format('YYYY-MM-DD'));

        const month = getDates(monthStart, monthEnd);
        return month;

    }, [chosenMonth])
    
    useEffect(() => {
        console.log("Month dates", visibleMonth);
    }, [])
    









    const [chosenTask, setChosenTask] = useState('');

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

    return ( 
        <div className="stats">
            
            <section className="stats-header">

                <i className="bi bi-lightbulb-fill" 
                onClick={() => setAboutPage(true)}></i>

                <select name="" id="" value={chosenTask}    
                    onChange={(e) => setChosenTask(e.target.value)}>

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
            
                <div className="stats-tasks">
                    
                    <p className="stats-task"
                        onClick={() => setChosenTask('')}
                        style={{
                            borderColor: !chosenTask ? 'var(--accent)' : "transparent"
                        }} 
                    >📈 <span className={`stats-task-title ${!chosenTask ? `block` : ''}`}>Overall</span></p>
    
                    {uniqueTasks.map(t => {
                        return <p className="stats-task"
                            style={{
                                borderColor: chosenTask === t.parentId ? t.color : "transparent"
                            }} 
                            key={t.parentId}
                            onClick={() => setChosenTask(t.parentId)}
                        >
                            {`${t.emoji}`}<span className={`stats-task-title ${chosenTask === t.parentId ? `block` : ''}`}>{`${t.name}`}</span>
                        </p>
                    })}

                </div>

            
            </section>
            
            <section className="stats-calendar">
                <div className="calendar-outer">

                    <i className="bi bi-caret-left-square"></i>
                    
                    <div className="calendar-inner">
                        <p className="calendar-month">JULY 2026</p>
                        <div className="calender">

                            <div className="calendar-header">

                                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                                    <p key={i}>{d}</p>
                                ))}                            

                            </div>
                            
                            <div className="calendar-dates">
                                <p className="dates">1</p>
                                <p className="dates">1</p>
                                <p className="dates">1</p>
                                <p className="dates">1</p>
                                <p className="dates">1</p>
                                <p className="dates">1</p>
                                <p className="dates">1</p>
                                <p className="dates">1</p>
                                <p className="dates">1</p>
                                <p className="dates">1</p>
                                <p className="dates">1</p>
                                <p className="dates">1</p>
                                <p className="dates">1</p>
                                <p className="dates">1</p>
                                <p className="dates">1</p>
                                <p className="dates">1</p>
                                <p className="dates">1</p>
                                <p className="dates">1</p>
                                <p className="dates">1</p>
                                <p className="dates">1</p>
                                <p className="dates">1</p>
                                <p className="dates">1</p>
                                <p className="dates">1</p>
                                <p className="dates">1</p>
                                <p className="dates">1</p>
                                <p className="dates">1</p>
                                <p className="dates">1</p>
                                <p className="dates">1</p>
                                <p className="dates">1</p>
                                <p className="dates">1</p>
                                <p className="dates">1</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* <div className="calendar-grid">

                        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                            <div key={i} className="day-label">{d}</div>
                        ))}

                        {
                            monthDays.length > 0 &&
                            Array(monthDays[0].getDay()).fill(null).map((_, i) => (
                                <div key={"blank"+ i} className="blank"></div>
                            ))
                        }

                        {
                            monthDays.map((day, i) => {
                                const isToday = day.toDateString() === today.toDateString();
                                const isMatch = matchingBorderDay.some(border => border.toDateString() === day.toDateString());

                                const borderStyle = !selectedTask
                                ? {}
                                : isMatch
                                    ? {border: `2px solid ${selectedTask.color}`}
                                    : {border: 'grey'};

                                return (
                                    <div key={i} title={day.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })} className="date-cell" style={borderStyle}>
                                        {isToday ? <i className="bi bi-geo-alt text-bluelight"></i> : day.getDate()}
                                    </div>
                                )
                            })
                        }

                    </div> */}

                    <i className="bi bi-caret-right-square"></i>
                
                </div>
            </section>

            <section>BODY 3</section>
        
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