import {useContext, useState} from "react";
import TaskEditor from "./TaskEditor.jsx"
import { TaskContext } from "../js files/contexts.js";
import { saveTaskList } from "../js files/Storage.js";

function Task({taskInfo}) {

    const {taskList, setTaskList} = useContext(TaskContext);

    const [editing, setEditing] = useState(false);
    const [priority, setpriority] = useState(taskInfo.priority);


    return ( 
        <div className="task">
            
            <section className="task-labels">
                <div className="emoji-box">{taskInfo.emoji}</div>
                <p>{taskInfo.name}</p>
            </section>
            
            <section className="task-updates">
                <i className="bi bi-pencil" title="Edit" onClick={() => setEditing(true)}></i>
                <i className={`bi bi-star-fill ${priority ? 'text-[var(--yellow)]' : ''}`} title="Prioritize" onClick={() => {
                    
                    setpriority(!priority);
                    
                    const editedTaskList = taskList.map(e => e.uniqueId === taskInfo.uniqueId ? {
                        ...taskInfo,
                        priority: !priority
                    } : e);

                    setTaskList(editedTaskList);
                    saveTaskList(editedTaskList);

                }}></i>
                <input type="checkbox" title="Complete" />
            </section>

            {editing && <TaskEditor
            
                exit={() => setEditing(false)}
                task={taskInfo}

            />}

        </div>
    );
}

export default Task;