import { createPortal } from "react-dom";
import dayjs from "../js files/DayJs.js";

function TaskInfo({task, exit}) {
    
    return createPortal( 
        <div className="task-info">

            <section className="task-info-body"
            style={{
                borderColor: task.color
            }}>
                <i className="bi bi-x-square-fill exit-editor" onClick={exit}></i>

                <div className="initial-info">

                    <div className="emoji">
                        {task.emoji}
                    </div>

                    <div className="tags">
                        <span>
                            Name: {task.name}
                        </span>
                        
                        <span>
                            Color: {task.color === 'var(--accent)' ? 'None' : task.color}                            
                        </span>
                    </div>

                </div>

                <div className="further-info">

                    <div className="f-info">Created: <span>{dayjs(task.createdAt).format('MMMM D, YYYY')}</span> </div>

                    <div className="f-info">Scheduled days: <span>{task.days.length !== 0 ? task.days.join(", ") : 'None'}</span></ div>

                    {/* "bi bi-dash-lg" */}
                    <div className="f-info">Time span: <span>
                        {dayjs(task.startDate).format('MMMM D, YYYY')}
                        <i class="bi bi-arrow-right" style={{color: task.color}}></i>
                        {dayjs(task.endDate).format('MMMM D, YYYY')}</span>
                    </div>

                    <div className="f-info">Reminder time:<span>{task.reminderTime ? task.reminderTime : 'None'}</span></div>

                    <div className="f-info">Total completed: <span>{task.completed ? "True" : "False"}</span></div>

                    <div className="f-info">Status: <span>Active</span></div>

                </div>

            </section>
        
        </div>, document.getElementById("modal-root")
    );
}

export default TaskInfo;