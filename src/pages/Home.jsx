import { useContext, useState, useEffect } from "react";
import TaskEditor from "../utilities jsx/TaskEditor.jsx";
import Task from "../utilities jsx/Task.jsx";
import { TaskContext } from "../js files/contexts.js";
import dayjs from "../js files/DayJs.js";
import { getDates } from "../js files/Utilities.js";

function Home() {

    const {taskList} = useContext(TaskContext);

    const now = dayjs();
    const [chosenDate, setChosenDate] = useState(now);
    const [visibleDates, setVisibleDates] = useState([]);

    const [taskCategory, setTaskCategory] = useState('');
    const [visibleTasks, setVisibileTasks] = useState([]);

    useEffect(() => {

        const end = chosenDate.add(6, 'day');

        const days = getDates(chosenDate, end);

        setVisibleDates(days);

    }, [chosenDate])

    useEffect(() => {

        if(taskCategory === 'All') {
            
            setVisibileTasks(taskList);

        } else if (taskCategory === 'Met') {
            
            const met = taskList.filter(t => t.completed);
            setVisibileTasks(met);

        } else if (taskCategory === 'Unmet') {

            const unmet = taskList.filter(t => !t.completed);
            setVisibileTasks(unmet);

        } else if (taskCategory === 'Priorities') {

            const priorities = taskList.filter(t => t.priority);
            setVisibileTasks(priorities);

        } else {

            setVisibileTasks(taskList);

        }

    }, [taskCategory, taskList]);

    const [showEditor, setShowEditor] = useState(false);
    
    return ( 
        <div className="home">
            <section className="header">
                
                <select name="task-groups" id="" className="task-groups" onChange={e => setTaskCategory(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Met">Met</option>
                    <option value="Unmet">Unmet</option>
                    <option value="Priorities">Priorities</option>
                </select>

                <p className="current-date" onClick={() => setChosenDate(now)}>
                    {`${chosenDate.format('MMMM DD, YYYY')}`}
                </p>

                <i className="bi bi-clipboard-plus-fill" onClick={(() => setShowEditor(true))}></i>

            </section>
            <section className="date-slider-cont">

                <div className="date-slider">

                    {visibleDates.map(d => {
                        return <span className={`date ${d.date.isSame(chosenDate) ? 'bg-[var(--muted-accent)]' : ''}`} key={d.key} onClick={() => setChosenDate(d.date)}>
                            <p className={`date-day ${d.date.isToday() ? 'text-[var(--accent)]' : ''}`} >{d.day.toUpperCase()}</p>
                            <div className="date-num-cont">
                                <p className={`date-num ${d.date.isToday() ? 'bg-[var(--accent)] text-white' : ''}`}>{d.dayNumber}</p>
                            </div>
                        </span>
                    })}

                </div>
           
            </section>

            <section className="task-display">
                {visibleTasks.length === 0 && <p>No tasks</p>}
                {visibleTasks.map(e => {
                    return <Task
                        key={e.uniqueId}
                        taskInfo={e} />;
                })}
            </section>

            {showEditor && <TaskEditor
                exit={() => setShowEditor(false)}
            />}
            
        </div>
    );
}

export default Home;