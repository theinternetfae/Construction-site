import { useContext, useState, useEffect } from "react";
import TaskEditor from "../utilities jsx/TaskEditor.jsx";
import Task from "../utilities jsx/Task.jsx";
import { TaskContext } from "../js files/contexts.js";

function Home() {

    const {taskList} = useContext(TaskContext);

    const [taskCategory, setTaskCategory] = useState('');
    const [visibleTasks, setVisibileTasks] = useState([]);

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

                <p className="current-date">
                    July 10th, 2026
                </p>

                <i className="bi bi-clipboard-plus-fill" onClick={(() => setShowEditor(true))}></i>

            </section>
            <section className="date-slider-cont">

                <div className="date-slider">

                    <span className="date">
                        <p className="date-day first">SUN</p>
                        <div className="date-num-cont">
                            <p className="date-num first">1</p>
                        </div>
                    </span>

                    <span className="date">
                        <p className="date-day">MON</p>
                        <div className="date-num-cont">
                            <p className="date-num">2</p>
                        </div>
                    </span>

                    <span className="date">
                        <p className="date-day">TUE</p>
                        <div className="date-num-cont">
                            <p className="date-num">3</p>
                        </div>
                    </span>

                    <span className="date">
                        <p className="date-day">WED</p>
                        <div className="date-num-cont">
                            <p className="date-num">4</p>
                        </div>
                    </span>

                    <span className="date">
                        <p className="date-day">THUR</p>
                        <div className="date-num-cont">
                            <p className="date-num">5</p>
                        </div>
                    </span>

                    <span className="date">
                        <p className="date-day">FRI</p>
                        <div className="date-num-cont">
                            <p className="date-num">6</p>
                        </div>      
                    </span>

                    <span className="date">
                        <p className="date-day">SAT</p>
                        <div className="date-num-cont">
                            <p className="date-num">7</p>
                        </div>
                    </span>

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