function History() {
    return ( 
        <div className="history">
            <section className="history-finder">
                <div className="input-date">
                    <input type="number" placeholder="MM"/>
                    <input type="number" placeholder="DD"/>
                    <input type="number" placeholder="YYYY"/>
                    <i className="bi bi-search"></i>
                </div>
                
                <p className="quick-info">JULY 21, 2026 (0 TASKS)</p>
            </section>

            <section className="info-on-date">
                
                <div className="history-tasks">
                    SECTION 1
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
        </div>
    );
}

export default History;