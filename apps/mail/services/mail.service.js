import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/storage.service.js"
import { asyncStorageService } from "../../../services/async-storage.service.js"

const MAIL_KEY = 'mailDB'
const USER_KEY = 'userDB'


export const mailService = {
    query,
    get,
    save,
    remove,
    getDefaultFilter
}

_createMails()
_createUser()


function getDefaultFilter() {
    return { name: '', isRead: null }
}

function query(filterBy = getDefaultFilter()) {
    console.log(filterBy)
    return asyncStorageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.name) {
                const regex = new RegExp(filterBy.name, 'i')
                mails = mails.filter(mail => regex.test(mail.name) || regex.test(mail.subject) || regex.test(mail.body))
                console.log(mails)
            }
            if (filterBy.isRead) {
                if (filterBy.isRead === 'read') {
                    mails = mails.filter(mail => mail.isRead === true)
                } else if (filterBy.isRead === 'unread') {
                    mails = mails.filter(mail => mail.isRead === false)
                }
            }
            return mails
        })

}

function save(mail) {
    if (mail.id) {
        return asyncStorageService.put(MAIL_KEY, mail)
    } else {
        return asyncStorageService.post(MAIL_KEY, mail)
    }
}

function remove(mailId) {
    return asyncStorageService.remove(MAIL_KEY, mailId)
}

function get(mailId) {
    return asyncStorageService.get(MAIL_KEY, mailId)
}

function _createMails() {
    let mails = storageService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        mails.push(_createMail('Meeting', 'Hey! waiting from response', 'momo@gmail.com', 'momo', new Date(1551133930594)))
        mails.push(_createMail('Party', 'Are you coming to the party tommorrow?', 'jojo@gmail.com', 'jojo', new Date(1551133930594)))
        mails.push(_createMail('Football', 'We would to invite you to a special football game happens in friday, next week!', 'footballclub@gmail.com', 'FC Club', new Date(1551435930594)))
        mails.push(_createMail('Your password has changed!', 'Thats an email confirmation saying that you password have been changed successfully!', 'lgndlkdc@gmail.com', 'Facebook', new Date(1521137130594)))
        mails.push(_createMail('Paurchse recipt', 'We send you the recipe from the resturant you ordered the food from! ', 'wolt@gmail.com', 'Wolt', new Date(1151133930594)))
        mails.push(_createMail('Inactive Account Warning', 'Our records indicate you created a Cronometer account on Thu, 15 Feb 2018 and have not been active since Thu, 15 Feb 2018.To protect your privacy, this account has been scheduled for automatic deletion in 24 hours. If you wish to keep your Cronometer account, simply log in before this time, and your account will be preserved.', ' <support@cronometer.com', 'Cronometer Support', new Date(1609308800000)))
        mails.push(_createMail('Confirm your email address', 'Nancy decided to make the porta-potty her home.There was no telling what thoughts would come from the machine.Twin 4-month-olds slept in the shade of the palm tree while the mother tanned in the sun.He knew it was going to be a bad day when he saw mountain lions roaming the streets.I had a friend in high school named Rick Shaw, but he was fairly useless as a mode of transport.', ' <KatzVeGarjobak@Harta.com', 'Bone Olam', new Date(1672101223129)))
        mails.push(_createMail('Some said you are', 'Toddlers feeding raccoons surprised even the seasoned park ranger. It was the scarcity that fueled his creativity. Imagine his surprise when he discovered that the safe was full of pudding. The water flowing down the river didn’t look that powerful from the carThere was no telling what thoughts would come from the machine.', 'PeroreiLehem@Schnitzel.off', 'Shauli', new Date(1672201223129)))
        mails.push(_createMail('Drop Box', 'Writing a list of random sentences is harder than I initially thought it would be. He was sure the Devil created red sparkly glitter. She did not cheat on the test for it was not the right thing to do. He looked behind the door and didnt like what he saw You cant compare apples and oranges, but what about bananas and plantains? For oil spots on the floor, nothing beats parking a motorbike in the lounge. We should play with legos at camp. It was a really good Monday for being a Saturday.', 'DropBox@Blasbla.com', 'Drop Box', new Date(1662201223129)))
        mails.push(_createMail('Theres no reason a hula hoop cant also be a circus ring.', 'The most exciting eureka moment Ive had was when I realized that the instructions on food packets were just guidelines. Hes in a boy band which doesnt make much sense for a snake. They were excited to see their first sloth. Three generations with six decades of life experience. He found the chocolate covered roaches quite tasty. The random sentence generator generated a random sentence about a random sentence. Theres no reason a hula hoop cant also be a circus ring. She found his complete dullness interesting.', 'Sambusak@Barb.com', 'Mcdonalds', new Date(1671101223129)))
        mails.push(_createMail('The home for all developers', 'As she walked along the street and looked in the gutter, she realized facemasks had become the new cigarette butts. The beach was crowded with snow leopards. The water flowing down the river didn’t look that powerful from the car You have every right to be angry, but that doesnt give you the right to be mean. There are over 500 starfish in the bathroom drawer. Its always a good idea to seek shelter from the evil gaze of the sun. Now I need to ponder my existence and ask myself if Im truly real', 'github@git.com', 'Git Hub', new Date(1661001223129)))
        mails.push(_createMail('Merch from your 2022 Wrapped', 'Giving directions that the mountains are to the west only works when you can see them. If any cop asks you where you were, just say you were visiting Kansas. Three years later, the coffin was still full of Jello. The mysterious diary records the voice. Iron pyrite is the most foolish of all minerals. Tomatoes make great weapons when water balloons aren’t available. Please wait outside of the house. Shakespeare was a famous 17th-century diesel mechanic.', 'spotify@music.com', 'Spotify', new Date(1658001223129)))

        storageService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(subject, body, from, name, sentAt) {
    return {
        id: utilService.makeId(),
        subject,
        body,
        isRead: false,
        from,
        name,
        starred: false,
        to: 'user@appsus.com',
        sentAt,
        removedAt: null
    }
}

function _createUser() {
    let loggedInUser = storageService.loadFromStorage(USER_KEY)
    if (!loggedInUser) {
        loggedInUser = {
            email: 'user@appsus.com',
            fullname: 'Mahatma Appsus'
        }
        storageService.saveToStorage(USER_KEY, loggedInUser)
    }
}