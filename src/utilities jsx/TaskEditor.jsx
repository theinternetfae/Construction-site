import { createPortal } from "react-dom";
import EmojiPicker from "./Emoji.jsx";
import ColorPicker from "./Colors.jsx";
import { useContext, useState } from "react";
import { formatDate, lessThanTen } from "../js files/Utilities.js";
import { TaskContext } from "../js files/contexts.js";
import { saveTaskList } from "../js files/Storage.js";
import Alert from "./Alert.jsx";

function TaskEditor({exit, task}) {

    const {taskList, setTaskList} = useContext(TaskContext);

    const today = formatDate(Date.now());

    const minutes = () => Array.from({ length: 60 }, (_, i) => i);
    const hours = () => Array.from({length: 13}, (_, i) => i);
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [openColorPicker, setOpenColorPicker] = useState(false);

    const [emoji, setEmoji] = useState(task ? task.emoji : '');
    const [name, setName] = useState(task ? task.name : '');
    const [color, setColor] = useState(task ? task.color : '');
    
    const [days, setDays] = useState(task ? task.days : []);
    const [endDate, setEndDate] = useState(task ? task.endDate : null);
    const [startDate, setStartDate] = useState(task ? task.startDate : today)

    const [reminder, setReminder] = useState(task ? task.reminder : false);
    

    const [reminderHour, setReminderHour] = useState('00');
    const [reminderMinutes, setReminderMinutes] = useState('00');
    const [meridiem, setMeridiem] = useState('AM');
    
    const [priority, setPriority] = useState(task ? task.priority : false);
    const [completed, setCompleted] = useState(task ? task.completed : false);

    const [alert, setAlert] = useState(false);

    function createTask() {

        if(!emoji || !name) {
            setAlert(true);
            return;
        };

        const reminderTime = !reminder ? null : `${reminderHour}:${reminderMinutes} ${meridiem}`

        const newTask = {
            emoji,
            name,
            color,
            days,
            startDate: days.length === 0 ? null : startDate,
            endDate,
            reminderTime,
            priority,
            completed
        }

        const newTaskList = [...taskList, newTask];
        setTaskList(newTaskList);
        saveTaskList(newTaskList);
        exit();
        console.log(newTask);

    }

    return createPortal( 

        <div className="task-editor"> 

            <div className="editor-cont">

                <i className="bi bi-x-square-fill exit-editor" onClick={exit}></i>
                
                <section className="emoji-section">
                    
                    <div className="emoji-box" onClick={() => {
                        setOpenEmojiPicker(!openEmojiPicker)
                        setOpenColorPicker(false);
                    }}>
                        {emoji ? emoji : <i className="bi bi-plus"></i>}
                    </div>

                    {openEmojiPicker && <EmojiPicker
                        pickEmoji={(e) => setEmoji(e)}
                        close={() => setOpenEmojiPicker(false)}
                    />}

                    <input type="text" placeholder="What to do?" value={name} onChange={(n) => setName(n.target.value)}/>
                </section>
                
                <section className="color-section">

                    <div className="color-controls">
                        <p>Color</p>
                        <div className="color-box" onClick={() => {
                            setOpenColorPicker(!openColorPicker)
                            setOpenEmojiPicker(false)
                        }} 
                        
                        style={{
                            backgroundColor: `${color}`
                        }}></div>
                    </div>

                    {openColorPicker && <ColorPicker
                        pickColor={(c) => setColor(c)}
                        color={color}
                        close={() => setOpenColorPicker(false)}
                    />}

                </section>

                <section className="days-section">
                    <p>Repeat</p>
                    <div className="days-of-week">

                        {
                            daysOfWeek.map((e, i) => {
                                return   <span 
                                    onClick={() => {

                                        if(days.includes(e)) {

                                            const cleanDays = days.filter(d => d !== e)

                                            setDays(cleanDays);

                                        } else {

                                            setDays([...days, e]);

                                        }

                                    }} 
                                    
                                    className={`${days.includes(e) ? 'border-[var(--light-accent)]' : ""}`}
                                >{e}
                                </span>
                            })
                        
                        }                        
                        
                    </div>
                </section>
                
                <section className={`start-end-section ${days.length === 0 && "hidden"}`}>
                    <input type="date" value={today} className="when-to-when text-[#5F5F5F]" disabled/>
                    <i className="bi bi-caret-right"></i>
                    <input type="date" className="when-to-when" value={endDate} min={today} onChange={(e) => setEndDate(e.target.value)}/>
                </section>

                <section className="reminder-section">
                    <p>On Reminder?</p>
                    <div className="reminder-toggle" onClick={() => setReminder(!reminder)} >
                        <div className={`reminder-toggle-slider ${reminder ? "translate-x-13" : ""}`}></div>
                    </div>
                </section>
                
                <section className={`reminder-time-section ${!reminder && 'hidden'}`}>
                    <p>Set reminder</p>
                    <div className="reminder-time">

                        <select name="" id="" onClick={e => setReminderHour(e.target.value)}>

                            {
                                hours().map(h => (
                                    <option key={h} value={h} hidden={h === 0}>{lessThanTen(h)}</option>
                                ))
                            }

                        </select>
                    
                        <select name="" id="" onClick={e => setReminderMinutes(e.target.value)}>
                            
                            {
                                minutes().map(m => (
                                    <option key={m} value={m} hidden={m === 0}>{lessThanTen(m)}</option>
                                ))
                            }
                            
                        </select>
                    
                        <select name="" id="" onClick={e => setMeridiem(e.target.value)}>
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                        </select>
                    
                    </div>
                </section>
                
                <button className="add-task" onClick={() => createTask()}>Add Task</button>

            </div>
        
            {alert && <Alert
                text={'Please fill in required fields; Name & Emoji'}
                buttonActionOne={() => setAlert(false)}
                buttonTextOne={'Okay'}
            />}
        </div>,
        document.getElementById("modal-root")
    
    );
}

export default TaskEditor;