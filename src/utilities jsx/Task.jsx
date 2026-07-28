import {useContext, useEffect, useState} from "react";
import TaskEditor from "./TaskEditor.jsx"
import { TaskContext } from "../js files/contexts.js";
import { saveTaskList } from "../js files/Storage.js";
import dayjs from "../js files/DayJs.js";

function Task({taskInfo}) {

    const now = dayjs();
    const createdToday = !dayjs(taskInfo.scheduledDate).isToday();

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
                <i className={`bi bi-pencil ${createdToday ? 'cursor-not-allowed hover:text-[var(--muted-text)]' : ''} ${taskInfo.completed ? 'text-white hover:text-[var(--accent)]' : ''}`} title="Edit" onClick={() => {
                    if(createdToday) return;
                    setEditing(true)
                }}></i>
            
                <i className={`bi bi-star-fill ${createdToday ? 'cursor-not-allowed hover:text-[var(--muted-text)]' : ''} ${taskInfo.priority ? 'text-[var(--yellow)]' : ''}`} title="Prioritize" onClick={() => {
                    
                    if(createdToday) return;

                    const editedTaskList = taskList.map(e => e.uniqueId === taskInfo.uniqueId ? {
                        ...taskInfo,
                        priority: !e.priority
                    } : e);

                    setTaskList(editedTaskList);
                    saveTaskList(editedTaskList);

                }}></i>

                <input type="checkbox" title="Complete" checked={taskInfo.completed} onChange={() => {
                   
                   if(createdToday) return;

                    const editedTaskList = taskList.map(e => e.uniqueId === taskInfo.uniqueId ? {
                        ...taskInfo,
                        completed: !e.completed
                    } : e);

                    setTaskList(editedTaskList);
                    saveTaskList(editedTaskList);

                }}
                
                disabled={createdToday}/>
            
            </section>

            {editing && <TaskEditor
            
                exit={() => setEditing(false)}
                task={taskInfo}

            />}

        </div>
    );
}

export default Task;