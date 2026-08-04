function Settings() {
    return ( 
        <div className="settings">

            <section className="heading">

                <div className="page-info">
                    <h2>Settings <span>{`>`} Profile & Preferences</span></h2>
                    <p>Manage your account settings</p>
                </div>

                <div className="mode-toggle">
                    <div className="mode-toggle-switch">
                        <i class="bi bi-sun"></i>
                        {/* <i class="bi bi-moon"></i> */}
                    </div>
                </div>
            
            </section>

            <div className="demacator"></div>

            <section className="settings-navigations">
                <p className="sett-nav">Profile & Preferences</p>
                <p className="sett-nav">Task Handler</p>
                <p className="sett-nav">Data & Privacy</p>
                <p className="sett-nav">About</p>
            </section>
            
            SETTINGS
        </div>
    );
}

export default Settings;