import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/storage.service.js"
import { storageService } from "../../../services/async-storage.service.js"

const MAIL_KEY = 'mailDB'


export const mailService = {
    query
}

_createMails()


function query() {
    return storageService.query(MAIL_KEY)

}


function _createMails() {
    let mails = storageService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        mails.push(_createMail('Meeting', 'Hey! waiting from response', new Date().toLocaleDateString(), 'momo@gmail.com'))
        mails.push(_createMail('Party', 'Are you coming to the party tommorrow?', new Date().toLocaleDateString(), 'momo@gmail.com'))
        storageService.saveToStorage(MAIL_KEY, mails)
    }
}


function _createMail(subject, body, sentAt, to) {
    return {
        id: utilService.makeId(),
        subject,
        body,
        sentAt,
        isRead: false,
        to,
    }
}