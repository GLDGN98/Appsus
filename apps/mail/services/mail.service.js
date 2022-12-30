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