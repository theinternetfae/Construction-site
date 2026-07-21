import { createPortal } from "react-dom";
import EmojiPicker from "./Emoji.jsx";
import ColorPicker from "./Colors.jsx";
import { useState } from "react";

function TaskEditor({exit}) {

    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [openColorPicker, setOpenColorPicker] = useState(false);

    const [emoji, setEmoji] = useState('');
    const [name, setName] = useState('');
    const [color, setColor] = useState('');
    const [days, setDays] = useState([]);
    // const [startDate, setStartDate] = useState(null);
    // const [endDate, setEndDate] = useState(null);
    const [reminder, setReminder] = useState(false);
    // const [reminderTime, setReminderTime] = useState(null);
    // const [priority, setPriority] = useState(false);
    // const [completed, setCompleted] = useState(false);


    function createTask() {
        const task = {
            emoji,
            name,
            color,
            days
        }

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
                        close={() => setOpenColorPicker(false)}
                    />}

                </section>

                <section className="days-section">
                    <p>Task days</p>
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

                {/*FOR THE SPAN OF DAYS OF TASK APPEARANCE*/}                
                {/* <section className="testing">
                    <p>On Reminder?</p>
                    <div className="reminder-toggle">
                        <div className="reminder-toggle-slider"></div>
                    </div>
                </section> */}

                <section className="reminder-section">
                    <p>On Reminder?</p>
                    <div className="reminder-toggle">
                        <div className="reminder-toggle-slider"></div>
                    </div>
                </section>
                
                {/*FOR PICKING THE TIME OF REMINDER*/}
                {/* <section className="testing">
                    <p>On Reminder?</p>
                    <div className="reminder-toggle">
                        <div className="reminder-toggle-slider"></div>
                    </div>
                </section> */}
                
                <button className="add-task" onClick={() => createTask()}>Add Task</button>

            </div>
        
        </div>,
        document.getElementById("modal-root")
    
    );
}

export default TaskEditor;