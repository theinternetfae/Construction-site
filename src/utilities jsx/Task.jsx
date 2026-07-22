import {useState} from "react";
import TaskEditor from "./TaskEditor.jsx"

function Task({taskInfo}) {

    const [editing, setEditing] = useState(false);

    return ( 
        <div className="task">
            
            <section className="task-labels">
                <div className="emoji-box">{taskInfo.emoji}</div>
                <p>{taskInfo.name}</p>
            </section>
            
            <section className="task-updates">
                <i className="bi bi-pencil" onClick={() => setEditing(true)}></i>
                <i className="bi bi-star-fill"></i>
                <input type="checkbox" />
            </section>

            {editing && <TaskEditor
            
                exit={() => setEditing(false)}
                task={taskInfo}

            />}

        </div>
    );
}

export default Task;