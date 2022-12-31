import { Card } from "../cmps/about-card.jsx"

export function About() {
    const cards = [
        {
            name: 'Gal Zohar',
            title: 'Fullstack Developer',
            txt: 'I\'m a 27 from Oranit, Israel. I am a junior developer who learn Fullstack development at Coding Academy. My tools: JS including React,Angular and jQuery, HTML, CSS, C#, Java and SQL. I love diving, hiking and have a good time with may pets. I am looking to learn and grow as developer.',
            img: 'assets/img/dev/gal.jpg',
            contact: {
                facebook: 'https://www.facebook.com/profile.php?id=100077018276598',
                github: 'https://github.com/GalZohar4021',
                linkdin: 'https://www.linkedin.com/in/gal-zohar-aa0101184'
            }
        },
        {
            name: 'Gilad Dagan',
            title: 'Fullstack Developer',
            txt: 'Hi, my name is Gilad Dagan and I am a 24-year-old junior full-stack web developer. I am passionate about creating engaging and intuitive user experiences through the use of HTML, CSS, JavaScript, and various web development frameworks. I am constantly seeking to expand my skillset and stay up-to-date with the latest industry trends and best practices. As a team player, I thrive in collaborative environments and am always looking for new opportunities to grow and learn as a developer.',
            img: 'assets/img/dev/gilad.jpg',
            contact: {
                facebook: 'https://www.facebook.com/gilad.dagan.9',
                github: 'https://github.com/GLDGN98',
                linkdin: ''
            }
        }
    ]
    
    return <section className="about">
        <span className="about-header">About our team</span>
        {
            cards.map(card => <Card key={card.name} dev={card} />)
        }
    </section>
}
