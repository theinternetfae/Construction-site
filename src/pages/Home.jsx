import { useContext, useState, useEffect, useMemo } from "react";
import TaskEditor from "../utilities jsx/TaskEditor.jsx";
import Task from "../utilities jsx/Task.jsx";
import { TaskContext } from "../js files/contexts.js";
import dayjs from "../js files/DayJs.js";   
import { calculateTimeToMidnight, getDates } from "../js files/Utilities.js";

function Home() {

    const {taskList} = useContext(TaskContext);
    
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

    const [chosenDate, setChosenDate] = useState(today);
    const [weekStart, setWeekStart] = useState(
        today.startOf('week')
    );

    useEffect(() => {

        function handleArrowClicks(e) {

            if(e.key === 'ArrowRight') {
             
                setWeekStart(prev => prev.add(7, 'day'));
                setChosenDate(prev => prev.add(7, 'day'));
            
            } 
            
            if(e.key === 'ArrowLeft') {
            
                setWeekStart(prev => prev.subtract(7, 'day'));
                setChosenDate(prev => prev.subtract(7, 'day'));
            
            }

        }

        document.addEventListener('keydown', handleArrowClicks);

        return () => {
            document.removeEventListener('keydown', handleArrowClicks);
        }

    }, [])

    
    const visibleDates = getDates(weekStart, weekStart.add(6, 'day'));

    


    const [taskCategory, setTaskCategory] = useState('');
    const [visibleTasks, setVisibileTasks] = useState([]);
    

    const todaysTasks = useMemo(() => {

        const todaysTasksStorage = taskList.filter(t => t.scheduledDate === chosenDate.format('YYYY-MM-DD'))
        return todaysTasksStorage;

    }, [chosenDate, taskList]);


    useEffect(() => {

        if(taskCategory === 'All') {
            
            setVisibileTasks(todaysTasks);

        } else if (taskCategory === 'Met') {
            
            const met = todaysTasks.filter(t => t.completed);
            setVisibileTasks(met);

        } else if (taskCategory === 'Unmet') {

            const unmet = todaysTasks.filter(t => !t.completed);
            setVisibileTasks(unmet);

        } else {

            setVisibileTasks(todaysTasks);

        }

    }, [taskCategory, todaysTasks]);

    const [showEditor, setShowEditor] = useState(false);
    
    return ( 
        <div className="home">
            <section className="header">
                
                <select name="task-groups" id="" className="task-groups" onChange={e => setTaskCategory(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Met">Met</option>
                    <option value="Unmet">Unmet</option>
                </select>

                <p className="current-date" onClick={() => {
                    setChosenDate(today);
                    setWeekStart(today.startOf('week'));
                }}>
                    {`${chosenDate.format('MMMM DD, YYYY')}`}
                </p>

                <i className="bi bi-clipboard-plus-fill" onClick={(() => setShowEditor(true))}></i>

            </section>
            <section className="date-slider-cont">

                <div className="date-slider">

                    {visibleDates.map(d => {
                        
                        const isChosen = d.date.format('YYYY-MM-DD') === chosenDate.format('YYYY-MM-DD');

                        let counter = 100;

                        const tasksForDay = taskList.filter(t => t.scheduledDate === d.date.format('YYYY-MM-DD'));
                        const completed = tasksForDay.filter(t => t.completed).length;

                        const progress = tasksForDay.length === 0 ? 0 : completed / tasksForDay.length * 100;
                        
                        counter = counter - progress;

                        return <span className={`date ${isChosen ? 'bg-[var(--muted-accent)]' : ''}`} key={d.key} onClick={() => setChosenDate(d.date)}>
                            <p className={`date-day ${d.date.isToday() ? 'text-[var(--accent)]' : ''}`} >{d.day.toUpperCase()}</p>
                            <div className="date-num-cont">
                                <svg className="progress-ring" viewBox="0 0 40 40">

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
                                        strokeDashoffset={counter}
                                    />

                                </svg>

                                <p className={`date-num ${d.date.isToday() ? 'bg-[var(--accent)] text-white' : ''}`}>
                                    {counter === 0 ? <i className="bi bi-trophy-fill"></i> : d.dayNumber}
                                </p>
                            </div>
                        </span>
                    })}

                </div>
           
            </section>

            <section className="task-display">
                <div className="task-slider">
                    
                    {visibleTasks.length === 0 && <p>No tasks</p>}
                    {visibleTasks.map(e => {
                        return <Task
                            key={e.uniqueId}
                            taskInfo={e} />;
                    })}

                </div>
            </section>

            {showEditor && <TaskEditor
                exit={() => setShowEditor(false)}
            />}
            
        </div>
    );
}

export default Home;