import { useContext, useEffect, useState, useMemo } from "react";
import { TaskContext } from "../js files/contexts";
import dayjs from "dayjs";
import { calculateTimeToMidnight } from "../js files/Utilities.js"
import Alert from "../utilities jsx/Alert.jsx";
import TaskEditor from "../utilities jsx/TaskEditor.jsx";

function Stats() {

    const { taskList } = useContext(TaskContext);

    const [today, setToday] = useState(dayjs());

    const [chosenTask, setChosenTask] = useState('');

    const [aboutPage, setAboutPage] = useState(false);
    const [taskEditor, setTaskEditor] = useState(false);

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

                <i className="bi bi-lightbulb-fill" 
                onClick={() => setAboutPage(true)}></i>

                <select name="" id="" value={chosenTask}    
                    onChange={(e) => setChosenTask(e.target.value)}>

                    <option value="">📈 Overall</option>

                    {uniqueTasks.map(t => {
                        return <option 
                            value={t.parentId} 
                            key={t.parentId} 
                        >
                            {`${t.emoji} ${t.name}`}
                        </option>
                    })}

                </select>

                <i className="bi bi-clipboard-plus-fill" 
                onClick={() => setTaskEditor(true)}></i>

            </section>
            
            <section className="stats-tasks-cont">
            
                <div className="stats-tasks">
                    
                    <p className="stats-task"
                        onClick={() => setChosenTask('')}
                        style={{
                            borderColor: !chosenTask ? 'var(--accent)' : "transparent"
                        }} 
                    >📈 <span className={`stats-task-title ${!chosenTask ? `block` : ''}`}>Overall</span></p>
    
                    {uniqueTasks.map(t => {
                        return <p className="stats-task"
                            style={{
                                borderColor: chosenTask === t.parentId ? t.color : "transparent"
                            }} 
                            key={t.parentId}
                            onClick={() => setChosenTask(t.parentId)}
                        >
                            {`${t.emoji}`}<span className={`stats-task-title ${chosenTask === t.parentId ? `block` : ''}`}>{`${t.name}`}</span>
                        </p>
                    })}

                </div>

            
            </section>
            
            <section>BODY 2</section>

            <section>BODY 3</section>
        
            {aboutPage && <Alert
                text={'Only reoccuring tasks are displayed here and calculated to determine your stats.'}
                buttonTextOne={'Okay'}
                buttonActionOne={() => setAboutPage(false)}
            />}

            {taskEditor && <TaskEditor
                exit={() => setTaskEditor(false)}
            />}

        </div>
    );
}

export default Stats;