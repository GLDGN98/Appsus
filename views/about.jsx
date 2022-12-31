import {card } from "../../Appsus/assets/img/dev/gal.jpg"
import { Card } from "../cmps/about-card.jsx"

export function About() {
    const cards = [
        {
            name: 'Gal Zohar',
            title: 'Fullstack Developer',
            txt: 'I\'m a 27 from Oranit, Israel. I am a junior developr who learn Fullstack development at Coding Academy.',
            img: '../../Appsus/assets/img/dev/gal.jpg',
            contact: {
                facebook: 'https://www.facebook.com/profile.php?id=100077018276598',
                github: 'https://github.com/GalZohar4021',
                linkdin: 'https://www.linkedin.com/in/gal-zohar-aa0101184'
            }
        },
        {
            name: 'Gilad Dagan',
            title: 'Fullstack Developer',
            txt: 'I\'m a 24 from Herzliya, Israel. I am a junior developr who learn Fullstack development at Coding Academy.',
            img: '../../Appsus/assets/img/dev/gilad.jpg',
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
