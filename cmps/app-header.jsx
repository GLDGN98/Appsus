const { Link, NavLink , useLocation} = ReactRouterDOM

export function AppHeader() {
    const pathName = useLocation().pathname
    console.log(pathName)
    return (pathName !== '/') ? <header className="app-header flex-row">
        <div className="header-box flex-row">

        <Link to="/">
            <h3 className="app-logo">Appsus.</h3>
        </Link>
        <nav className="header-nav flex-row">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
            <NavLink to="/book">Books</NavLink>
            <NavLink to="/about">About</NavLink>
        </nav>
        </div>
    </header> : ''
}
