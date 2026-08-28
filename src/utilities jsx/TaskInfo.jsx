import { createPortal } from "react-dom";
import dayjs from "../js files/dayJs.js";
import { useContext, useEffect, useMemo } from "react";
import { TaskContext } from "../js files/contexts.js";

function TaskInfo({task, exit, oneOff}) {

    const {taskList} = useContext(TaskContext);

    const matchingTasks = taskList.filter(t => t.parentId === task.parentId);
    const completed = matchingTasks.filter(t => t.completed);

    const active = dayjs(task.endDate).isAfter(dayjs());

    const formatedTask = useMemo(() => {

        const obj = {
            emoji: task.emoji,
            name: task.name,
            color: task.color === 'var(--accent)' ? 'None' : task.color,
            created: dayjs(task.createdAt).format('MMMM D, YYYY'),
            scheduled: task.days.length !== 0 ? task.days.join(", ") : 'None',
            start: dayjs(task.startDate).format('MMM D, YYYY'),
            end: dayjs(task.endDate).format('MMM D, YYYY'),
            reminderTime: task.reminderTime ? task.reminderTime : 'None',
            completed: oneOff ? (task.completed ? "True" : "False") : `${completed.length}/${matchingTasks.length}`,
            status: active ? 'Active' : 'Inactive'
        };

        return obj;

    }, [task, oneOff])

    return createPortal( 
        <div className="task-info">

            <section className="task-info-body"
            style={{
                borderColor: task.color
            }}>
                <i className="bi bi-x-square-fill exit" onClick={exit}></i>

                <div className="initial-info">

                    <div className="emoji">
                        {formatedTask.emoji}
                    </div>

                    <div className="tags">
                        <span>
                            Name: {formatedTask.name}
                        </span>
                        
                        <span>
                            Color: {formatedTask.color}                            
                        </span>
                    </div>

                </div>

                <div className="further-info">

                    <div className="f-info">Created: <span>{formatedTask.created}</span> </div>

                    <div className="f-info">Scheduled days: <span>{oneOff ? <i className="bi bi-dash-lg" style={{color: task.color}}></i> : formatedTask.scheduled}</span></ div>

                    <div className="f-info">Time span:

                        <span>

                            {oneOff ? <i className="bi bi-dash-lg" style={{color: task.color}}></i> : 
                                <> 
                                    {formatedTask.start} 
                                    <i className="bi bi-arrow-right" style={{color: task.color}}></i>
                                    {formatedTask.end}
                                </>
                            }

                        </span>   

                    </div>

                    <div className="f-info">Reminder time:<span>{oneOff ? <i className="bi bi-dash-lg" style={{color: task.color}}></i> : formatedTask.reminderTime}</span></div>

                    <div className="f-info">Completed: <span>{formatedTask.completed}</span></div>

                    {!oneOff && <div className="f-info">Status: <span className="font-bold" style={{color: task.color}}>{formatedTask.status}</span></div>}

                </div>

            </section>
        
        </div>, document.getElementById("modal-root")
    );
}

export default TaskInfo;