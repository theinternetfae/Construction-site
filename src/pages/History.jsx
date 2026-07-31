import { TaskContext } from "../js files/contexts";
import dayjs from "../js files/DayJs";
import { useContext, useEffect, useState, useMemo } from "react";
import Task from "../utilities jsx/Task";
import Alert from "../utilities jsx/Alert";

function History() {

    const {taskList} = useContext(TaskContext);

    const [error, setError] = useState(false);

    const [month, setMonth] = useState('');
    const [date, setDate] = useState('');
    const [year, setYear] = useState('');

    const [selectedDate, setSelectedDate] = useState(dayjs());
    
    function searchDate() {

        const d = `${year}-${month.padStart(2, "0")}-${date.padStart(2, "0")}`;        

        if(!dayjs(d, 'YYYY-MM-DD', true).isValid()) {
            setError(true);
            return;
        }

        setDate('');
        setMonth('');
        setYear('');
        
        setSelectedDate(dayjs(d));

    }

    const todaysTasks = useMemo(() => {
        
        const tasks = taskList.filter(t => selectedDate.isSame(dayjs(t.scheduledDate), "day"));
        
        console.log(tasks);

        return tasks;

    }, [selectedDate, taskList])

    useEffect(() => {
        console.log(todaysTasks);
    }, [])

    return ( 
        <div className="history">
            <section className="history-finder">
                <div className="input-date">
                    <input type="number" value={month} placeholder="MM" onChange={(e) => setMonth(e.target.value)}/>
                    <input type="number" value={date} placeholder="DD" onChange={(e) => setDate(e.target.value)}/>
                    <input type="number" value={year} placeholder="YYYY" onChange={(e) => setYear(e.target.value)}/>
                    <i className="bi bi-search" onClick={(() => searchDate())}></i>
                </div>
                
                <p className="quick-info" onClick={(() => setSelectedDate(dayjs()))}>
                    {selectedDate.format('MMM DD, YYYY').toUpperCase()} ({`${todaysTasks.length} ${todaysTasks.length === 1 ? 'TASK' : 'TASKS'}`})
                </p>
            </section>

            <section className="info-on-date">
                
                <div className="history-tasks">
                    {todaysTasks.length === 0 && 'No tasks'}
                    {
                        todaysTasks.map(t => 
                            <Task
                                key={t.uniqueId}
                                taskInfo={t}
                                noShow={true}
                            />
                        )
                    }
                </div>
                
                <div className="history-result">
                    <div className="result-cont">
                        <i className="bi bi-stars"></i>
                        <p className="result-counter">0 days</p>
                        <p className="title">Top streak</p>
                    </div>
                    
                    <div className="result-cont">
                        <i className="bi bi-fire"></i>
                        <p className="result-counter">0 days</p>
                        <p className="title">Current streak</p>
                    </div>

                    <div className="result-cont">
                        <i className="bi bi-check-circle"></i>
                        <p className="result-counter">0</p>
                        <p className="title">Top streak</p>
                    </div>
                    
                    <div className="result-cont">
                        <i className="bi bi-info-circle"></i>
                        <p className="result-counter">0 Active</p>
                        <p className="title">Status</p>
                    </div>
                </div>
            </section>

            {error && <Alert
                text={'Please input a valid date'}
                buttonTextOne={'Okay'}
                buttonActionOne={() => setError(false)}
            />}
        </div>
    );
}

export default History;