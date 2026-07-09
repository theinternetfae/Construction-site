function SideMenu() {
    return ( 
        <nav>
            <section className="logo-sect">
                <i class="bi bi-check2-circle"></i>
                <p>Optima</p>
            </section>

            <section className="nav-sect">
                
                <div className="navigation">
                    <i class="bi bi-house-door-fill"></i>
                    <p>Home</p>
                </div>

                <div className="navigation">
                    <i class="bi bi-bar-chart"></i>
                    <p>Stats</p>
                </div>
                
                <div className="navigation">
                    <i class="bi bi-clock-history"></i>
                    <p>History</p>
                </div>
                
                <div className="navigation">
                    <i class="bi bi-gear"></i>
                    <p>Settings</p>
                </div>
            
            </section>
            
            <section></section>
        </nav>
    );
}

export default SideMenu;