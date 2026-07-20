function Stats() {
    return ( 
        <div className="stats">
            
            <section className="stats-header">

                <i className="bi bi-lightbulb-fill"></i>
                <select name="" id="">
                    <option value="">📈 Overall</option>
                    <option value="">✏ Draw</option>
                    <option value="">💻 SMM</option>
                    <option value="">🙏🏾 Pray</option>
                    <option value="">👩🏾‍💻 Code</option>
                    <option value="">🤸🏾‍♀️ Gym</option>
                    <option value="">📞 Call mummy</option>
                </select>
                <i className="bi bi-clipboard-plus-fill"></i>

            </section>
            
            <section className="stats-tasks-cont">
            
                <p className="stats-task">📈 <span className="stats-task-title block">Overall</span></p>
                <p className="stats-task">✏ <span className="stats-task-title">Draw</span></p>
                <p className="stats-task">💻 <span className="stats-task-title">SMM</span></p>
                <p className="stats-task">🙏🏾 <span className="stats-task-title">Pray</span></p>
                <p className="stats-task">👩🏾‍💻 <span className="stats-task-title">Code</span></p>
                <p className="stats-task">🤸🏾‍♀️ <span className="stats-task-title">Gym</span></p>
                <p className="stats-task">📞 <span className="stats-task-title">Call mummy</span></p>
            
            </section>
            
            <section>BODY 2</section>

            <section>BODY 3</section>
        
        </div>
    );
}

export default Stats;