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
            color
        }

        console.log(task);
    }

    return createPortal( 

        <div className="task-editor"> 

            <div className="editor-cont">

                <i className="bi bi-x-square-fill exit-editor" onClick={exit}></i>
                
                <section className="emoji-section">
                    
                    <div className="emoji-box" onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>
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
                        <div className="color-box" onClick={() => setOpenColorPicker(!openColorPicker)} style={{
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
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thur</span>
                        <span>Fri</span>
                        <span>Sat</span>
                        <span>Sun</span>
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