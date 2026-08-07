import { createPortal } from "react-dom";

function TaskInfo({task, exit}) {
    return createPortal( 
        <div className="task-info">

            <section className="task-info-body"
            style={{
                borderColor: task.color
            }}>
                <i className="bi bi-x-square-fill exit-editor" onClick={exit}></i>
                {task.name}
            </section>
        
        </div>, document.getElementById("modal-root")
    );
}

export default TaskInfo;