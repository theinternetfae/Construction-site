function Privacy() {
    return ( 
        <div className="privacy">

            <section className="more-info">
        
                <div className="info">
                    <div className="opener">
                        <i className="bi bi-caret-right"></i>
                        What data is stored?
                    </div>
                    <p>Data stored include: Tasks and schedules, completion history, app preferences, and profile info.</p>
                </div>
        
                <div className="info">
                    <div className="opener">
                        <i className="bi bi-caret-right"></i>
                        How is it stored?
                    </div>
                    <p>Your data is stored in our appWrite database where only the creator of the app, Favour Egwele, has access.</p>
                </div>

            </section>

            <section className="separator">
                <div className="demacator"></div>
                    <p>Controls</p>
                <div className="demacator"></div>
            </section>

            <section className="task-handler">

                <div className="control">
                    <div className="control-label">
                        <p>Clear task history</p>
                        <p className="subtitle">Delete all tasks</p>
                    </div>
                    <button>
                        <i className="bi bi-trash"></i>
                    </button>
                </div>

                <div className="control">
                    <div className="control-label">
                        <p>Reset all data</p>
                        <p className="subtitle">Delete all data and preferences</p>
                    </div>
                    <button>
                        <i className="bi bi-trash"></i>
                    </button>
                </div>

            </section>

            <button className="download">
                <i className="bi bi-download"></i>
                Download your data
            </button>
        
        </div>
    );
}

export default Privacy;