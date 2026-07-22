import { useContext, useState } from "react";
import TaskEditor from "../utilities jsx/TaskEditor.jsx";
import Task from "../utilities jsx/Task.jsx";
import { TaskContext } from "../js files/contexts.js";

function Home() {

    const {taskList} = useContext(TaskContext);

    const [showEditor, setShowEditor] = useState(false);
    
    return ( 
        <div className="home">
            <section className="header">
                
                <select name="task-groups" id="" className="task-groups">
                    <option value="All">All</option>
                    <option value="Met">Met</option>
                    <option value="Unmet">Unmet</option>
                    <option value="Commitments">Commitments</option>
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
                {taskList.length === 0 && <p>No tasks</p>}
                {taskList.map((e, i) => {
                    return <Task
                        key={i}
                        taskInfo={e}
                    />
                })}
            </section>

            {showEditor && <TaskEditor
                exit={() => setShowEditor(false)}
            />}
            
        </div>
    );
}

export default Home;