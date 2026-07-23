import {useContext, useState} from "react";
import TaskEditor from "./TaskEditor.jsx"
import { TaskContext } from "../js files/contexts.js";
import { saveTaskList } from "../js files/Storage.js";

function Task({taskInfo}) {

    const {taskList, setTaskList} = useContext(TaskContext);

    const [editing, setEditing] = useState(false);


    return ( 
        <div className={`task ${taskInfo.completed ? 'text-white' : ''}`} style={{
            backgroundColor: taskInfo.completed ? `${taskInfo.color ? taskInfo.color : 'var(--accent)'}` : ''
        }}>
            
            <section className="task-labels">
                <div className="emoji-box">{taskInfo.emoji}</div>
                <p>{taskInfo.name}</p>
            </section>
            
            <section className="task-updates">
                <i className={`bi bi-pencil ${taskInfo.completed ? 'text-white hover:text-[var(--accent)]' : ''}`} title="Edit" onClick={() => setEditing(true)}></i>
            
                <i className={`bi bi-star-fill ${taskInfo.priority ? 'text-[var(--yellow)]' : ''}`} title="Prioritize" onClick={() => {
                    
                    const editedTaskList = taskList.map(e => e.uniqueId === taskInfo.uniqueId ? {
                        ...taskInfo,
                        priority: !e.priority
                    } : e);

                    setTaskList(editedTaskList);
                    saveTaskList(editedTaskList);

                }}></i>

                <input type="checkbox" title="Complete" checked={taskInfo.completed} onChange={() => {
                    
                    const editedTaskList = taskList.map(e => e.uniqueId === taskInfo.uniqueId ? {
                        ...taskInfo,
                        completed: !e.completed
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