import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/storage.service.js"
import { asyncStorageService } from "../../../services/async-storage.service.js"

const MAIL_KEY = 'mailDB'


export const mailService = {
    query,
    get,
    save
}

_createMails()


function query() {
    return asyncStorageService.query(MAIL_KEY)

}

function save(mail) {
    if (mail.id) {
        return asyncStorageService.put(MAIL_KEY, mail)
    } else {
        return asyncStorageService.post(MAIL_KEY, mail)
    }
}


function get(mailId) {
    return asyncStorageService.get(MAIL_KEY, mailId)
}


function _createMails() {
    let mails = storageService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        mails.push(_createMail('Meeting', 'Hey! waiting from response', new Date().toLocaleDateString(), 'momo@gmail.com'))
        mails.push(_createMail('Party', 'Are you coming to the party tommorrow?', new Date().toLocaleDateString(), 'jojo@gmail.com'))
        storageService.saveToStorage(MAIL_KEY, mails)
    }
}


function _createMail(subject, body, sentAt, from) {
    return {
        id: utilService.makeId(),
        subject,
        body,
        sentAt,
        isRead: false,
        from,
        starred: false
    }
}