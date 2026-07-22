import { createPortal } from "react-dom";
import EmojiPicker from "./Emoji.jsx";
import ColorPicker from "./Colors.jsx";
import { useContext, useState } from "react";
import { formatDate, lessThanTen } from "../js files/Utilities.js";
import { TaskContext } from "../js files/contexts.js";
import { saveTaskList } from "../js files/Storage.js";
import Alert from "./Alert.jsx";

function TaskEditor({exit}) {

    const {taskList, setTaskList} = useContext(TaskContext);

    const today = formatDate(Date.now());

    const minutes = () => Array.from({ length: 60 }, (_, i) => i);
    const hours = () => Array.from({length: 13}, (_, i) => i);

    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [openColorPicker, setOpenColorPicker] = useState(false);

    const [emoji, setEmoji] = useState('');
    const [name, setName] = useState('');
    const [color, setColor] = useState('#2563EB');
    const [days, setDays] = useState([]);
    const [endDate, setEndDate] = useState(null);
    const [reminder, setReminder] = useState(false);
    
    const [reminderHour, setReminderHour] = useState('00');
    const [reminderMinutes, setReminderMinutes] = useState('00');
    const [meridiem, setMeridiem] = useState('AM');
    
    const [priority, setPriority] = useState(false);
    const [completed, setCompleted] = useState(false);

    const [alert, setAlert] = useState(false);

    function createTask() {

        if(!emoji || !name) {
            setAlert(true);
            return;
        };

        const reminderTime = !reminder ? null : `${reminderHour}:${reminderMinutes} ${meridiem}`

        const task = {
            emoji,
            name,
            color,
            days,
            startDate: days.length === 0 ? null : today,
            endDate,
            reminderTime,
            priority,
            completed
        }

        const newTaskList = [...taskList, task];
        setTaskList(newTaskList);
        saveTaskList(newTaskList);
        exit();
        console.log(task);

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

                    <input type="text" placeholder="What to do?" onChange={(n) => setName(n.target.value)}/>
                
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
                        
                        <span 
                            onClick={() => {

                                if(days.includes('Mon')) {

                                    const cleanDays = days.filter(d => d !== 'Mon')

                                    setDays(cleanDays);

                                } else {

                                    setDays([...days, "Mon"]);

                                }

                            }} 
                            
                            className={`${days.includes('Mon') ? 'border-[var(--light-accent)]' : ""}`}
                        >Mon</span>
                        
                        <span 
                            onClick={() => {

                                if(days.includes('Tue')) {

                                    const cleanDays = days.filter(d => d !== 'Tue')

                                    setDays(cleanDays);
                                    
                                } else {

                                    setDays([...days, "Tue"]);

                                };

                            }}
                            
                            className={`${days.includes('Tue') ? 'border-[var(--light-accent)]' : ""}`}
                        >Tue</span>

                        <span 
                            onClick={() => {

                                if(days.includes('Wed')) {

                                    const cleanDays = days.filter(d => d !== 'Wed')

                                    setDays(cleanDays);

                                } else {

                                    setDays([...days, "Wed"]);

                                };

                            }}
                            
                            className={`${days.includes('Wed') ? 'border-[var(--light-accent)]' : ""}`}
                        >Wed</span>

                        <span 
                        
                            onClick={() => {

                                if(days.includes('Thur')) {
                                    
                                    const cleanDays = days.filter(d => d !== 'Thur')

                                    setDays(cleanDays);
                                
                                } else {

                                    setDays([...days, "Thur"]);

                                };

                            }}
                        
                            className={`${days.includes('Thur') ? 'border-[var(--light-accent)]' : ""}`}
                        >Thur</span>

                        <span 
                        
                            onClick={() => {

                                if(days.includes('Fri')) {
                                    
                                    const cleanDays = days.filter(d => d !== 'Fri')

                                    setDays(cleanDays);
                                
                                } else {

                                    setDays([...days, "Fri"]);

                                };

                            }}
                        
                            className={`${days.includes('Fri') ? 'border-[var(--light-accent)]' : ""}`}
                        >Fri</span>

                        <span 
                        
                            onClick={() => {

                                if(days.includes('Sat')) {
                                    
                                    const cleanDays = days.filter(d => d !== 'Sat')

                                    setDays(cleanDays);
                                
                                } else {

                                    setDays([...days, "Sat"]);

                                };

                            }}
                        
                            className={`${days.includes('Sat') ? 'border-[var(--light-accent)]' : ""}`}
                        >Sat</span>

                        <span 
                        
                            onClick={() => {

                                if(days.includes('Sun')) {
                                    
                                    const cleanDays = days.filter(d => d !== 'Sun')
                                
                                    setDays(cleanDays);
                                
                                } else {

                                    setDays([...days, "Sun"]);

                                };

                            }}
                        
                            className={`${days.includes('Sun') ? 'border-[var(--light-accent)]' : ""}`}
                        >Sun</span>

                    </div>
                </section>
                
                <section className={`start-end-section ${days.length === 0 && "hidden"}`}>
                    <input type="date" value={today} className="when-to-when text-[#5F5F5F]" disabled/>
                    <i className="bi bi-caret-right"></i>
                    <input type="date" className="when-to-when" min={today} onChange={(e) => setEndDate(e.target.value)}/>
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