const { Link, NavLink } = ReactRouterDOM

export function AppFooter() {

    return <footer className="app-header full main-layout flex-col">
            <h2>appsus.</h2>
            <h5>All rights reserved 2022&copy; by Gal Zohar & Gilad Dagan</h5>
    </footer>


    // <header className="app-header full main-layout">
    //     <div className="header-container">
    //         <h1>React Car App</h1>
    //         <nav className="app-nav">
    //             <NavLink to="/">Home</NavLink> |
    //             <NavLink to="/car">Car</NavLink> |
    //             <NavLink to="/survey">Survey</NavLink> |
    //             <NavLink to="/about">About</NavLink>
    //         </nav>
    //     </div>
    // </header>
}