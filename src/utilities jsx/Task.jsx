import {useContext, useState} from "react";
import TaskEditor from "./TaskEditor.jsx"
import { TaskContext } from "../js files/contexts.js";
import { saveTaskList } from "../js files/Storage.js";

function Task({taskInfo}) {

    const {taskList, setTaskList} = useContext(TaskContext);

    const [editing, setEditing] = useState(false);
    const [priority, setPriority] = useState(taskInfo.priority);
    const [completed, setCompleted] = useState(taskInfo.completed);


    return ( 
        <div className={`task ${completed ? 'text-white' : ''}`} style={{
            backgroundColor: completed ? taskInfo.color : ''
        }}>
            
            <section className="task-labels">
                <div className="emoji-box">{taskInfo.emoji}</div>
                <p>{taskInfo.name}</p>
            </section>
            
            <section className="task-updates">
                <i className={`bi bi-pencil ${completed ? 'text-white hover:text-[var(--light-accent)]' : ''}`} title="Edit" onClick={() => setEditing(true)}></i>
            
                <i className={`bi bi-star-fill ${priority ? 'text-[var(--yellow)]' : ''}`} title="Prioritize" onClick={() => {
                    
                    setPriority(!priority);
                    
                    const editedTaskList = taskList.map(e => e.uniqueId === taskInfo.uniqueId ? {
                        ...taskInfo,
                        priority: !priority
                    } : e);

                    setTaskList(editedTaskList);
                    saveTaskList(editedTaskList);

                }}></i>

                <input type="checkbox" title="Complete" checked={completed} onChange={() => {
                    
                    setCompleted(!completed);
                    
                    const editedTaskList = taskList.map(e => e.uniqueId === taskInfo.uniqueId ? {
                        ...taskInfo,
                        completed: !completed
                    } : e);

                    setTaskList(editedTaskList);
                    saveTaskList(editedTaskList);

                }}/>
            
            </section>

            {editing && <TaskEditor
            
                exit={() => setEditing(false)}
                task={taskInfo}

            />}

        </div>
    );
}

export default Task;