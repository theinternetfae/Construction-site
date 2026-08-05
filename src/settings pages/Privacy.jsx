function Privacy() {
    return ( 
        <div className="privacy">

            <section className="more-info">
        
                <div className="info">
                    <div className="opener">
                        <i class="bi bi-caret-right"></i>
                        What data is stored?
                    </div>
                    <p>I am info hidden by opener</p>
                </div>
        
                <div className="info">
                    <div className="opener">
                        <i class="bi bi-caret-right"></i>
                        How is it stored?
                    </div>
                    <p>I am info hidden by opener</p>
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
                        <i class="bi bi-trash"></i>
                    </button>
                </div>

                <div className="control">
                    <div className="control-label">
                        <p>Reset all data</p>
                        <p className="subtitle">Delete all data and preferences</p>
                    </div>
                    <button>
                        <i class="bi bi-trash"></i>
                    </button>
                </div>

            </section>

            <button className="download">
                <i class="bi bi-download"></i>
                Download your data
            </button>
        
        </div>
    );
}

export default Privacy;