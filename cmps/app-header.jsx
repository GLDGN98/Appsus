const { Link, NavLink , useLocation} = ReactRouterDOM

export function AppHeader() {
    const pathName = useLocation().pathname
    console.log(pathName)
    return (pathName !== '/') ? <header className="app-header">
        <Link to="/">
            <h3>Appsus.!</h3>
        </Link>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
        </nav>
    </header> : ''
}
