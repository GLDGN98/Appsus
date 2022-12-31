const { Link, NavLink, useLocation } = ReactRouterDOM

export function AppHeader() {
    const pathName = useLocation().pathname
    console.log(pathName)

    function toggleMenu() {
        document.body.classList.toggle('menu-open')
    }

    return (pathName !== '/') ? <header className="app-header flex-row">
        <div className="main-screen" onClick={() => toggleMenu()}></div>
        <div className="header-box flex-row">

            <Link to="/">
                <h3 className="app-logo">Appsus.</h3>
            </Link>
            <nav className="header-nav flex-row">
                <button className="menu-toggle-btn" onClick={() => toggleMenu()}>☰</button>
                <nav onClick={() => toggleMenu()} className="links flex-row">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/mail">Mail</NavLink>
                    <NavLink to="/note">Note</NavLink>
                    <NavLink to="/book">Books</NavLink>
                    <NavLink to="/about">About</NavLink>
                </nav>
            </nav>
        </div>
    </header > : ''
}
