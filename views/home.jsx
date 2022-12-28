const { Link, NavLink, useNavigate } = ReactRouterDOM

export function Home() {

    function onNavTo(page) {
        const nav = useNavigate()
        console.log(page, nav)
        switch (page) {
            case 'mail':
                nav('/mail')
                break
            case 'note':
                nav('/note')
                break
            case 'book':
                nav('/book')
                break
        }
    }

    return <section className="home flex-col">
        <div className="hero-menu-box flex-col">

            <h1 className="welcome-hdr">Welcome to Appsus</h1>

            <nav className="home-menu flex-row">
                <i onClick={()=> {onNavTo('mail')} } className="fa-sharp fa-solid fa-envelope"></i>
                <i onClick={onNavTo('note')} className="fa-sharp fa-solid fa-clipboard"></i>
                <i onClick={onNavTo('book')} className="fa-sharp fa-solid fa-book"></i>
            </nav>
        </div>
    </section>
}


/*

<NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>

*/