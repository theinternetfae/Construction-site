import { useContext, useEffect, useMemo } from "react";
import { TaskContext } from "../js files/contexts";
import dayjs from "../js files/DayJs.js";
import Task from "../utilities jsx/Task";

function History() {
    
    const {taskList} = useContext(TaskContext);

    const today = dayjs();

    const reOccuringTasks = useMemo(() => {
        
        const uniqueTasksMap = new Map();

        for (const task of taskList) {
            if (task.days.length > 0) {
                uniqueTasksMap.set(task.parentId, task);
            }
        }

        const uniqueTasks = [...uniqueTasksMap.values()];
        
        return uniqueTasks;

    }, [taskList, today]);

    const oneOffTasks = useMemo(() => {
        
        const uniqueTasksMap = new Map();

        for (const task of taskList) {
            if (task.days.length === 0) {
                uniqueTasksMap.set(task.parentId, task);
            }
        }

        const uniqueTasks = [...uniqueTasksMap.values()];
        
        return uniqueTasks;

    }, [taskList, today]);

    return ( 
        <div className="history">
            <i className="bi bi-lightbulb-fill"></i>
            <section className="tasks-holder">
                <div className="task-sections">
                    <p className="label">Re-occuring</p>
                    {reOccuringTasks.length === 0 && <p className="filler">No Tasks</p>}
                    {reOccuringTasks.map((t, i) => <Task
                        key={t.uniqueId}
                        taskInfo={t}    
                        noShow={true}
                    />)}

                </div>
                <div className="task-sections">
                    <p className="label">One-off</p>
                    {oneOffTasks.length === 0 && <p className="filler">No Tasks</p>}
                    {oneOffTasks.map((t, i) => <Task
                        key={t.uniqueId}
                        taskInfo={t}
                        noShow={true}
                        oneOff={true}
                    />)}
                </div>

            </section>
        </div>
    );
}

export default History;