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