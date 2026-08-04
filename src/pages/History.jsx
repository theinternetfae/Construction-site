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

        return tasks;

    }, [selectedDate, taskList])



    //STATS CALCULATIONS
    const [chosenTask, setChosenTask] = useState(null);

    const specificTodayStatus = useMemo(() => {

        if(!chosenTask) return;

        const todaysTask = taskList.find(t => dayjs(t.scheduledDate).isSame(dayjs(chosenTask.scheduledDate), "day"));

        return todaysTask ? `${todaysTask.completed ? 'Completed' : 'Pending'}` : 'None Today';

    }, [chosenTask, taskList]);


    const specificActiveStatus = useMemo(() => {

        if(!chosenTask) return;

        const reversedTaskList = taskList.toReversed();
        const eligible = taskList.find(t => t.parentId === chosenTask.parentId);

        const eligibleStatus = dayjs(eligible?.endDate).isAfter(dayjs(), "day");

        return eligibleStatus ? 'Active' : 'Pending'; 

    }, [chosenTask])

    useEffect(() => {
        console.log(specificActiveStatus);
        console.log(taskList);
    }, [chosenTask])

    // const specificTopStreak = useMemo(() => {        

    //     let count = 0;        

    //     const streakList = statsStopperList(chosenTasks).reduce((acc, t) => {
            
    //         if(t.complete === true) {
    //             count++  
    //         } else {
    //             acc.push(count);
    //             count = 0;
    //         }

    //         return acc;

    //     }, [])

    //     if(specificTodayStatus.toLowerCase() === "completed") {
    //         count++
    //     }

    //     if (count > 0) {
                
    //         streakList.push(count);
        
    //     }

    //     return Math.max(...streakList, 0);
        
    // }, [chosenTaskId]);


    // const specificCurrentStreak = useMemo(() => {        

    //     let count = 0;

    //     for (const task of statsStopperList(chosenTasks)) {
    //         count = task.complete ? count + 1 : 0
    //     }

    //     if(specificTodayStatus.toLowerCase() === 'completed') {
    //         count++
    //     }

    //     return count;
        
    // }, [chosenTaskId]);


    return ( 
        <div className="history">
            <section className="history-finder">
                <div className="input-date">
                    <input type="number" value={month} placeholder="MM" id="month" onChange={(e) => setMonth(e.target.value)}/>
                    <input type="number" value={date} placeholder="DD" id="date" onChange={(e) => setDate(e.target.value)}/>
                    <input type="number" value={year} placeholder="YYYY" id="year" onChange={(e) => setYear(e.target.value)}/>
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
                            <div
                                key={t.uniqueId}
                                onClick={() => {
                                    setChosenTask(t)
                                    console.log("Clicked");
                                }}
                            >
                                <Task                                
                                    taskInfo={t}
                                    noShow={true}
                                />
                            </div>
                        )
                    }
                </div>
                
                <div className="history-result">
                    <div className="result-cont" 
                        style={{
                            borderColor: chosenTask?.color || 'var(--accent)' 
                        }}
                    >

                        <i className="bi bi-stars"
                            style={{
                                borderColor: chosenTask?.color || 'var(--accent)' 
                            }}
                        ></i>
                        
                        <p className="result-counter">NIL</p>
                        <p className="title">Top streak</p>
                    </div>
                    

                    <div className="result-cont" 
                        style={{
                            borderColor: chosenTask?.color || 'var(--accent)' 
                        }}
                    >
                    
                        <i className="bi bi-fire"
                            style={{
                              borderColor: chosenTask?.color || 'var(--accent)' 
                            }}
                        ></i>
                    
                        <p className="result-counter">NIL</p>
                        {/* 0 days */}
                        <p className="title">Current streak</p>
                    </div>


                    <div className="result-cont" 
                        style={{
                            borderColor: chosenTask?.color || 'var(--accent)' 
                        }}
                    >
                        
                        <i className="bi bi-check-circle"
                            style={{
                                borderColor: chosenTask?.color || 'var(--accent)' 
                            }}
                        ></i>

                        <p className="result-counter">{chosenTask ? specificTodayStatus : 'NIL'}</p>
                        {/* 0 */}
                        <p className="title">Todays Status</p>
                    </div>
                    


                    <div className="result-cont" 
                        style={{
                            borderColor: chosenTask?.color || 'var(--accent)' 
                        }}
                    >
                    
                        <i className="bi bi-info-circle"
                            style={{
                              borderColor: chosenTask?.color || 'var(--accent)' 
                            }}
                        ></i>
                    
                        <p className="result-counter">{chosenTask ? specificActiveStatus : 'NIL'}</p>
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