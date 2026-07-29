import { useContext, useEffect, useState, useMemo } from "react";
import { TaskContext } from "../js files/contexts";
import dayjs from "dayjs";
import { calculateTimeToMidnight } from "../js files/Utilities.js"

function Stats() {

    const { taskList } = useContext(TaskContext);

    const [today, setToday] = useState(dayjs());

    useEffect(() => {

        function rescheduleToday() {
            
            const changeDay = setTimeout(() => {

                setToday(dayjs);

                rescheduleToday();

            }, calculateTimeToMidnight()) 
        
            return changeDay;
        }

        const timeout = rescheduleToday();

        return () => clearTimeout(timeout);

    }, []);

    const uniqueTasks = useMemo(() => {
        
        const uniqueTasksMap = new Map();

        for (const task of taskList) {
            if (task.days.length > 0) {
                uniqueTasksMap.set(task.parentId, task);
            }
        }

        const uniqueTasks = [...uniqueTasksMap.values()];
        
        console.log(uniqueTasks)
        return uniqueTasks;

    }, [taskList, today]);

    return ( 
        <div className="stats">
            
            <section className="stats-header">

                <i className="bi bi-lightbulb-fill"></i>
                <select name="" id="">

                    <option value="">📈 Overall</option>

                    {uniqueTasks.map(t => {
                        return <option value={t.parentId} key={t.parentId}>{`${t.emoji} ${t.name}`}</option>
                    })}

                </select>
                <i className="bi bi-clipboard-plus-fill"></i>

            </section>
            
            <section className="stats-tasks-cont">
            
                <div className="stats-tasks">
                    
                    <p className="stats-task">📈 <span className="stats-task-title block">Overall</span></p>
    
                    {uniqueTasks.map(t => {
                        return <p className="stats-task" key={t.parentId}>{`${t.emoji}`}<span className="stats-task-title">${`${t.name}`}</span></p>
                    })}

                </div>

            
            </section>
            
            <section>BODY 2</section>

            <section>BODY 3</section>
        
        </div>
    );
}

export default Stats;