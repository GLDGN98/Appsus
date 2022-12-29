


export function Card({ dev }) {
    return <div className="about-me flex-row card-info">
        <div className="my-thumb flex-col">
            <img className="about-me-img" src={dev.img} />
        </div>

        <div className="about-info flex-col">

            <span className="card-header">{dev.name}</span>
            <span className="card-sub-header">{dev.title}</span>

            <p className="card-text">{dev.txt}</p>

            <span>Contact me!</span>
            <div className="about-icons flex-row">
                <a href={dev.contact.facebook} target="_blank">
                    <i className="fa-brands fa-facebook"></i>
                </a>
                <a href={dev.contact.github} target="_blank">
                    <i className="fa-brands fa-github"></i>
                </a>

                <a href={dev.contact.linkdin} target="_blank">
                    <i className="fa-brands fa-linkedin-in"></i>
                </a>
            </div>
        </div>
    </div>
}