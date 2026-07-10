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

            <section className="date-slider-cont">

                <div className="date-slider">

                    <span className="date">
                        <p className="date-day">SUN</p>
                        <p className="date-num">1</p>
                    </span>

                    <span className="date">
                        <p className="date-day">MON</p>
                        <p className="date-num">2</p>
                    </span>

                    <span className="date">
                        <p className="date-day">TUE</p>
                        <p className="date-num">3</p>
                    </span>

                    <span className="date">
                        <p className="date-day">WED</p>
                        <p className="date-num">4</p>
                    </span>

                    <span className="date">
                        <p className="date-day">THUR</p>
                        <p className="date-num">5</p>
                    </span>

                    <span className="date">
                        <p className="date-day">FRI</p>
                        <p className="date-num">6</p>
                    </span>

                    <span className="date">
                        <p className="date-day">SAT</p>
                        <p className="date-num">7</p>
                    </span>

                </div>
           
            </section>
        </div>
    );
}

export default Home;