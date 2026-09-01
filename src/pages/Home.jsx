import { useContext, useState, useEffect, useMemo } from "react";
import TaskEditor from "../utilities jsx/TaskEditor.jsx";
import Task from "../utilities jsx/Task.jsx";
import { TaskContext, UserContext } from "../js files/contexts.js";
import dayjs from "../js files/dayJs.js";   
import { calculateTimeToMidnight, getDates } from "../js files/utilities.js";
import Alert from "../utilities jsx/Alert.jsx";

function Home() {

    const {taskList, level, generalCirlceProgress} = useContext(TaskContext);
    const {userProfile} = useContext(UserContext);

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

    useEffect(() => {

        function handleArrowClicks(e) {

            if(e.key === 'ArrowRight') {
             
                setChosenDate(prev => prev.add(7, 'day'));
            
            } 
            
            if(e.key === 'ArrowLeft') {
            
                setChosenDate(prev => prev.subtract(7, 'day'));
            
            }

        }

        document.addEventListener('keydown', handleArrowClicks);

        return () => {
            document.removeEventListener('keydown', handleArrowClicks);
        }

    }, [])
     
    const visibleDates = useMemo(() => {
        
        const weekStart = chosenDate.startOf('week');
        const dates = getDates(weekStart, weekStart.add(6, 'day'));

        return dates
    
    }, [chosenDate])

    

    const [taskCategory, setTaskCategory] = useState('');
    const [visibleTasks, setVisibileTasks] = useState([]);
    

    const chosenDayTasks = useMemo(() => {

        const chosenDayTasksStorage = taskList.filter(t => t.scheduledDate === chosenDate.format('YYYY-MM-DD'))
        return chosenDayTasksStorage;

    }, [chosenDate, taskList]);

    const [stopAlert, setStopAlert] = useState(false);
    const todaysTasks = useMemo(() => {

        const limit = level === 1 ? 4 : level === 2 ? 8 : level === 3 ? 10 : '';
        const todaysTasksStorage = taskList.filter(t => t.scheduledDate === today.format('YYYY-MM-DD'))
        
        return {
            tTasks: todaysTasksStorage,
            limit
        };

    }, [today, taskList, generalCirlceProgress]);


    useEffect(() => {

        if(taskCategory === 'All') {
            
            setVisibileTasks(chosenDayTasks);

        } else if (taskCategory === 'Met') {
            
            const met = chosenDayTasks.filter(t => t.completed);
            setVisibileTasks(met);

        } else if (taskCategory === 'Unmet') {

            const unmet = chosenDayTasks.filter(t => !t.completed);
            setVisibileTasks(unmet);

        } else {

            setVisibileTasks(chosenDayTasks);

        }

    }, [taskCategory, chosenDayTasks]);

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
                }}>
                    {chosenDate.format('MMMM DD, YYYY').toUpperCase()}
                </p>

                <i className="bi bi-clipboard-plus-fill" onClick={(() => todaysTasks.tTasks.length >= todaysTasks.limit && userProfile.prefs.quirk ? setStopAlert(true) : setShowEditor(true))}></i>

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
                            key={e.$id}
                            taskInfo={e} />;
                    })}

                </div>
            </section>

            {showEditor && <TaskEditor
                exit={() => setShowEditor(false)}
            />}

            {stopAlert && <Alert
                text={"You've reached your daily task limit. Take it easy."}
                buttonActionOne={() => setStopAlert(false)} 
            />}
            
        </div>
    );
}

export default Home;