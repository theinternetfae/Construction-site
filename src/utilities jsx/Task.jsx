function Task({taskInfo}) {
    return ( 
        <div className="task">
            
            <section className="task-labels">
                <div className="emoji-box">{taskInfo.emoji}</div>
                <p>{taskInfo.name}</p>
            </section>
            
            <section className="task-updates">
                <i className="bi bi-star-fill"></i>
                <input type="checkbox" />
            </section>

        </div>
    );
}

export default Task;