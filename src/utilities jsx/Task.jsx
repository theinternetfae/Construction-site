import {useContext, useEffect, useState} from "react";
import TaskEditor from "./TaskEditor.jsx"
import { TaskContext } from "../js files/contexts.js";
import dayjs from "../js files/dayJs.js";
import TaskInfo from "./TaskInfo.jsx";
import db from "../appwrite files/databases.js";

function Task({taskInfo, noShow, oneOff}) {

    const now = dayjs();
    const notCreatedToday = !dayjs(taskInfo.scheduledDate).isToday();

    const {taskList, setTaskList} = useContext(TaskContext);

    const [info, setInfo] = useState(false);

    const [editing, setEditing] = useState(false);

    async function setCompleted() {

        try {

            await db.tasks.update(taskInfo.$id, {completed: !taskInfo.completed});
            
            const editedTaskList = taskList.map(e => e.$id === taskInfo.$id ? {
                ...taskInfo,
                completed: !e.completed
            } : e);
    
            setTaskList(editedTaskList);

        } catch (error) {
            
            console.log(error);

        }

    }

    return ( 
        <div className={`task ${taskInfo.completed ? 'text-white' : ''}`} style={{
            backgroundColor: taskInfo.completed ? `${taskInfo.color ? taskInfo.color : 'var(--accent)'}` : ''
        }}>
            
            <section className="task-labels">
                <div className="emoji-box">{taskInfo.emoji}</div>
                <p>{taskInfo.name}</p>
            </section>
            
            <section className="task-updates">
                <i className={`bi bi-pencil ${noShow ? 'hidden' : ''} ${notCreatedToday ? 'cursor-not-allowed hover:text-[var(--muted-text)]' : ''} ${taskInfo.completed ? 'text-white hover:text-[var(--accent)]' : ''}`} title="Edit" onClick={() => {
                    if(notCreatedToday) return;
                    setEditing(true)
                }}></i>

                <input type="checkbox" title="Complete" hidden={noShow} checked={taskInfo.completed} onChange={() => {
                   
                   if(notCreatedToday) return;

                    setCompleted();

                }}
                
                disabled={notCreatedToday}/>

                <i className={`bi bi-eye ${noShow ? 'block' : 'hidden'}`}
                onClick={() => setInfo(true)}></i>
            
            </section>

            {editing && <TaskEditor
            
                exit={() => setEditing(false)}
                task={taskInfo}

            />}

            {info && <TaskInfo
                task={taskInfo}
                exit={() => setInfo(false)}
                oneOff={oneOff}
            />}
        </div>
    );
}

export default Task;