function Home() {
    return ( 
        <div className="home">
            <section className="header">
                
                <select name="task-groups" id="" className="task-groups">
                    <option value="All">All</option>
                    <option value="Met">Met</option>
                    <option value="Unmet">Unmet</option>
                    <option value="Commitments">Commitments</option>
                </select>

                <p className="current-date">
                    July 10th, 2026
                </p>

                <i class="bi bi-clipboard-plus-fill"></i>

            </section>
//saving
            <section className="date-slider-cont">

                <div className="date-slider">

                    <span className="date">
                        <p className="date-day first">SUN</p>
                        <div className="date-num-cont">
                            <p className="date-num first">1</p>
                        </div>
                    </span>

                    <span className="date">
                        <p className="date-day">MON</p>
                        <div className="date-num-cont">
                            <p className="date-num">2</p>
                        </div>
                    </span>

                    <span className="date">
                        <p className="date-day">TUE</p>
                        <div className="date-num-cont">
                            <p className="date-num">3</p>
                        </div>
                    </span>

                    <span className="date">
                        <p className="date-day">WED</p>
                        <div className="date-num-cont">
                            <p className="date-num">4</p>
                        </div>
                    </span>

                    <span className="date">
                        <p className="date-day">THUR</p>
                        <div className="date-num-cont">
                            <p className="date-num">5</p>
                        </div>
                    </span>

                    <span className="date">
                        <p className="date-day">FRI</p>
                        <div className="date-num-cont">
                            <p className="date-num">6</p>
                        </div>      
                    </span>

                    <span className="date">
                        <p className="date-day">SAT</p>
                        <div className="date-num-cont">
                            <p className="date-num">7</p>
                        </div>
                    </span>

                </div>
           
            </section>

            <section className="task-display">
                <p>No tasks</p>
            </section>
        </div>
    );
}

export default Home;