import { createPortal } from "react-dom";

function TaskEditor({exit}) {
    return createPortal( 
        <div className="task-editor">

            <i class="bi bi-x-square-fill" onClick={exit}></i>

            <div className="editor-cont">

                <p>TASK EDITOR</p>

            </div>
        
        </div>,
        document.getElementById("modal-root")
    );
}

export default TaskEditor;