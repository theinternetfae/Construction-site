import {useContext, useEffect, useState} from "react";
import TaskEditor from "./TaskEditor.jsx"
import { TaskContext } from "../js files/contexts.js";
import { saveTaskList } from "../js files/appStorage.js";
import dayjs from "../js files/DayJs.js";
import TaskInfo from "./TaskInfo.jsx";

function Task({taskInfo, noShow, oneOff}) {

    const now = dayjs();
    const createdToday = !dayjs(taskInfo.scheduledDate).isToday();

    const {taskList, setTaskList} = useContext(TaskContext);

    const [info, setInfo] = useState(false);

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
                <i className={`bi bi-pencil ${noShow ? 'hidden' : ''} ${createdToday ? 'cursor-not-allowed hover:text-[var(--muted-text)]' : ''} ${taskInfo.completed ? 'text-white hover:text-[var(--accent)]' : ''}`} title="Edit" onClick={() => {
                    if(createdToday) return;
                    setEditing(true)
                }}></i>

                <input type="checkbox" title="Complete" hidden={noShow} checked={taskInfo.completed} onChange={() => {
                   
                   if(createdToday) return;

                    const editedTaskList = taskList.map(e => e.uniqueId === taskInfo.uniqueId ? {
                        ...taskInfo,
                        completed: !e.completed
                    } : e);

                    setTaskList(editedTaskList);
                    saveTaskList(editedTaskList);

                }}
                
                disabled={createdToday}/>

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