
export const googleBookService = {
    query
}

function query(txt) {

    // return axios.get
    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${txt}`).then(res => {
        return res.data.items.map(item => ({
            id: item.id,
            volumeInfo: {
                title: item.volumeInfo.title,
                subtitle: item.volumeInfo.subtitle,
                publishedDate: item.volumeInfo.publishedDate,
                description: item.volumeInfo.description,
                image: item.volumeInfo.imageLinks,
                pageCount: item.volumeInfo.pageCount,
            },
            reviews: []
        }))
        // return Promise.resolve(items)
    })


}

const res = {
    "kind": "books#volumes",
    "totalItems": 400,
    "items": [
        {
            "kind": "books#volume",
            "id": "L18VBQAAQBAJ",
            "etag": "r/CvAz+g72c",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/L18VBQAAQBAJ",
            "volumeInfo": {
                "title": "The Psychology of Harry Potter",
                "subtitle": "An Unauthorized Examination Of The Boy Who Lived",
                "authors": [
                    "Neil Mulholland"
                ],
                "publisher": "BenBella Books",
                "publishedDate": "2007-04-10",
                "description": "Harry Potter has provided a portal to the wizarding world for millions of readers, but an examination of Harry, his friends and his enemies will take us on yet another journey: through the psyche of the Muggle (and wizard!) mind. The twists and turns of the series, as well as the psychological depth and complexity of J. K. Rowling’s characters, have kept fans enthralled with and puzzling over the many mysteries that permeate Hogwarts and beyond: • Do the Harry Potter books encourage disobedience? • Why is everyone so fascinated by Professor Lupin? • What exactly will Harry and his friends do when they finally pass those N.E.W.T.s? • Do even wizards live by the ticking of the clock? • Is Harry destined to end up alone? And why did it take Ron and Hermione so long to get together? Now, in The Psychology of Harry Potter, leading psychologists delve into the ultimate Chamber of Secrets, analyzing human mind and motivation by examining the themes and characters that make the Harry Potter books the bestselling fantasy series of all time. Grab a spot on the nearest couch, and settle in for some fresh revelations about our favorite young wizard!",
                "industryIdentifiers": [
                    {
                        "type": "ISBN_13",
                        "identifier": "9781932100884"
                    },
                    {
                        "type": "ISBN_10",
                        "identifier": "1932100881"
                    }
                ],
                "readingModes": {
                    "text": false,
                    "image": false
                },
                "pageCount": 338,
                "printType": "BOOK",
                "categories": [
                    "Literary Criticism"
                ],
                "averageRating": 3.5,
                "ratingsCount": 5,
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": false,
                "contentVersion": "0.1.2.0.preview.0",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=L18VBQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=L18VBQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                },
                "language": "en",
                "previewLink": "http://books.google.com/books?id=L18VBQAAQBAJ&printsec=frontcover&dq=harry+potter&hl=&cd=1&source=gbs_api",
                "infoLink": "http://books.google.com/books?id=L18VBQAAQBAJ&dq=harry+potter&hl=&source=gbs_api",
                "canonicalVolumeLink": "https://books.google.com/books/about/The_Psychology_of_Harry_Potter.html?hl=&id=L18VBQAAQBAJ"
            },
            "saleInfo": {
                "country": "IL",
                "saleability": "NOT_FOR_SALE",
                "isEbook": false
            },
            "accessInfo": {
                "country": "IL",
                "viewability": "PARTIAL",
                "embeddable": true,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED",
                "epub": {
                    "isAvailable": false
                },
                "pdf": {
                    "isAvailable": false
                },
                "webReaderLink": "http://play.google.com/books/reader?id=L18VBQAAQBAJ&hl=&source=gbs_api",
                "accessViewStatus": "SAMPLE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "Now, in The Psychology of Harry Potter, leading psychologists delve into the ultimate Chamber of Secrets, analyzing human mind and motivation by examining the themes and characters that make the Harry Potter books the bestselling fantasy ..."
            }
        },
        {
            "kind": "books#volume",
            "id": "LbnwCQAAQBAJ",
            "etag": "zZieB+nImCE",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/LbnwCQAAQBAJ",
            "volumeInfo": {
                "title": "Playing Harry Potter",
                "subtitle": "Essays and Interviews on Fandom and Performance",
                "authors": [
                    "Lisa S. Brenner"
                ],
                "publisher": "McFarland",
                "publishedDate": "2015-06-11",
                "description": "Through classroom activities, wizard rock concerts, and organizations like the Harry Potter Alliance, Harry Potter fans are using creativity to positively impact the world. This collection of essays and interviews examines how playful fandom--from fanfiction to Muggle quidditch, cosplay, role-playing games, and even Harry Potter burlesque--not only reimagines the canon but also challenges consumerism, questions notions of identity, and fosters participatory culture. The contributors explore issues applicable to fan studies and performance studies at large, such as the role of performance, the nature of community, and questions of representation and ownership in the digital age. Presented in three parts, the essays discuss discrepancies between sanctioned versions of Harry Potter and fan creations, the reenactment and reinterpretation of the original narrative in fan performance, and collaborative and participatory performances that break down the boundaries between actors and audiences.",
                "industryIdentifiers": [
                    {
                        "type": "ISBN_13",
                        "identifier": "9780786496570"
                    },
                    {
                        "type": "ISBN_10",
                        "identifier": "0786496576"
                    }
                ],
                "readingModes": {
                    "text": false,
                    "image": true
                },
                "pageCount": 249,
                "printType": "BOOK",
                "categories": [
                    "Literary Criticism"
                ],
                "averageRating": 5,
                "ratingsCount": 1,
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": false,
                "contentVersion": "preview-1.0.0",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=LbnwCQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=LbnwCQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                },
                "language": "en",
                "previewLink": "http://books.google.com/books?id=LbnwCQAAQBAJ&printsec=frontcover&dq=harry+potter&hl=&cd=2&source=gbs_api",
                "infoLink": "http://books.google.com/books?id=LbnwCQAAQBAJ&dq=harry+potter&hl=&source=gbs_api",
                "canonicalVolumeLink": "https://books.google.com/books/about/Playing_Harry_Potter.html?hl=&id=LbnwCQAAQBAJ"
            },
            "saleInfo": {
                "country": "IL",
                "saleability": "NOT_FOR_SALE",
                "isEbook": false
            },
            "accessInfo": {
                "country": "IL",
                "viewability": "PARTIAL",
                "embeddable": true,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED",
                "epub": {
                    "isAvailable": false
                },
                "pdf": {
                    "isAvailable": true,
                    "acsTokenLink": "http://books.google.com/books/download/Playing_Harry_Potter-sample-pdf.acsm?id=LbnwCQAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                },
                "webReaderLink": "http://play.google.com/books/reader?id=LbnwCQAAQBAJ&hl=&source=gbs_api",
                "accessViewStatus": "SAMPLE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "This collection of essays and interviews examines how playful fandom--from fanfiction to Muggle quidditch, cosplay, role-playing games, and even Harry Potter burlesque--not only reimagines the canon but also challenges consumerism, ..."
            }
        },
        {
            "kind": "books#volume",
            "id": "x4beDQAAQBAJ",
            "etag": "nnOKbQeSr9A",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/x4beDQAAQBAJ",
            "volumeInfo": {
                "title": "Harry Potter and the Philosopher's Stone",
                "authors": [
                    "J. K. Rowling"
                ],
                "publisher": "Bloomsbury Publishing",
                "publishedDate": "2015-08-13",
                "description": "Harry Potter lives in a cupboard under the stairs at his Aunt and Uncle's house. He is bullied by them and his spoilt cousin, and lives a very unremarkable life. But then Harry is transported to a world of magic and excitement.",
                "industryIdentifiers": [
                    {
                        "type": "ISBN_13",
                        "identifier": "9781408865279"
                    },
                    {
                        "type": "ISBN_10",
                        "identifier": "1408865270"
                    }
                ],
                "readingModes": {
                    "text": false,
                    "image": false
                },
                "pageCount": 352,
                "printType": "BOOK",
                "categories": [
                    "Boarding school students"
                ],
                "averageRating": 2.5,
                "ratingsCount": 2,
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": false,
                "contentVersion": "0.1.2.0.preview.0",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=x4beDQAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=x4beDQAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                },
                "language": "en",
                "previewLink": "http://books.google.com/books?id=x4beDQAAQBAJ&dq=harry+potter&hl=&cd=3&source=gbs_api",
                "infoLink": "http://books.google.com/books?id=x4beDQAAQBAJ&dq=harry+potter&hl=&source=gbs_api",
                "canonicalVolumeLink": "https://books.google.com/books/about/Harry_Potter_and_the_Philosopher_s_Stone.html?hl=&id=x4beDQAAQBAJ"
            },
            "saleInfo": {
                "country": "IL",
                "saleability": "NOT_FOR_SALE",
                "isEbook": false
            },
            "accessInfo": {
                "country": "IL",
                "viewability": "NO_PAGES",
                "embeddable": false,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED",
                "epub": {
                    "isAvailable": false
                },
                "pdf": {
                    "isAvailable": true
                },
                "webReaderLink": "http://play.google.com/books/reader?id=x4beDQAAQBAJ&hl=&source=gbs_api",
                "accessViewStatus": "NONE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "Harry Potter lives in a cupboard under the stairs at his Aunt and Uncle&#39;s house. He is bullied by them and his spoilt cousin, and lives a very unremarkable life. But then Harry is transported to a world of magic and excitement."
            }
        },
        {
            "kind": "books#volume",
            "id": "GZAoAQAAIAAJ",
            "etag": "OsT6pFwJRNc",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/GZAoAQAAIAAJ",
            "volumeInfo": {
                "title": "Harry Potter and the Deathly Hallows",
                "authors": [
                    "J. K. Rowling"
                ],
                "publisher": "Arthur a Levine",
                "publishedDate": "2007",
                "description": "The magnificent final book in J. K. Rowling's seven-part saga comes to readers July 21, 2007. You'll find out July 21!",
                "industryIdentifiers": [
                    {
                        "type": "OTHER",
                        "identifier": "UCSC:32106019703807"
                    }
                ],
                "readingModes": {
                    "text": false,
                    "image": false
                },
                "pageCount": 792,
                "printType": "BOOK",
                "categories": [
                    "Juvenile Fiction"
                ],
                "averageRating": 4.5,
                "ratingsCount": 3531,
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": false,
                "contentVersion": "5.4.2.0.preview.0",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=GZAoAQAAIAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=GZAoAQAAIAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                },
                "language": "en",
                "previewLink": "http://books.google.com/books?id=GZAoAQAAIAAJ&q=harry+potter&dq=harry+potter&hl=&cd=4&source=gbs_api",
                "infoLink": "http://books.google.com/books?id=GZAoAQAAIAAJ&dq=harry+potter&hl=&source=gbs_api",
                "canonicalVolumeLink": "https://books.google.com/books/about/Harry_Potter_and_the_Deathly_Hallows.html?hl=&id=GZAoAQAAIAAJ"
            },
            "saleInfo": {
                "country": "IL",
                "saleability": "NOT_FOR_SALE",
                "isEbook": false
            },
            "accessInfo": {
                "country": "IL",
                "viewability": "NO_PAGES",
                "embeddable": false,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED",
                "epub": {
                    "isAvailable": false
                },
                "pdf": {
                    "isAvailable": false
                },
                "webReaderLink": "http://play.google.com/books/reader?id=GZAoAQAAIAAJ&hl=&source=gbs_api",
                "accessViewStatus": "NONE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "The magnificent final book in J. K. Rowling&#39;s seven-part saga comes to readers July 21, 2007. You&#39;ll find out July 21!"
            }
        },
        {
            "kind": "books#volume",
            "id": "MCPjwAEACAAJ",
            "etag": "VT94wjPejdA",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/MCPjwAEACAAJ",
            "volumeInfo": {
                "title": "Harry Potter and the Goblet of Fire: The Illustrated Edition",
                "authors": [
                    "J. K. Rowling"
                ],
                "publisher": "Arthur A. Levine Books",
                "publishedDate": "2019-10-08",
                "description": "The fourth book in the beloved Harry Potter series, now illustrated in glorious full color by award-winning artist Jim Kay. Harry Potter wants to get away from the pernicious Dursleys and go to the International Quidditch Cup with Hermione, Ron, and the Weasleys. He wants to dream about Cho Chang, his crush (and maybe do more than dream). He wants to find out about the mysterious event involving two other rival schools of magic, and a competition that hasn't happened for a hundred years. He wants to be a normal, fourteen-year-old wizard. Unfortunately for Harry Potter, he's not normal - even by wizarding standards. And in this case, different can be deadly. With dazzling illustrations from Jim Kay, this new fully illustrated edition of the complete and unabridged text of Harry Potter and the Goblet of Fire is sure to delight fans and first-time readers alike.",
                "industryIdentifiers": [
                    {
                        "type": "ISBN_10",
                        "identifier": "0545791421"
                    },
                    {
                        "type": "ISBN_13",
                        "identifier": "9780545791427"
                    }
                ],
                "readingModes": {
                    "text": false,
                    "image": false
                },
                "pageCount": 464,
                "printType": "BOOK",
                "categories": [
                    "Juvenile Fiction"
                ],
                "averageRating": 5,
                "ratingsCount": 1,
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": false,
                "contentVersion": "preview-1.0.0",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=MCPjwAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=MCPjwAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                },
                "language": "en",
                "previewLink": "http://books.google.com/books?id=MCPjwAEACAAJ&dq=harry+potter&hl=&cd=5&source=gbs_api",
                "infoLink": "http://books.google.com/books?id=MCPjwAEACAAJ&dq=harry+potter&hl=&source=gbs_api",
                "canonicalVolumeLink": "https://books.google.com/books/about/Harry_Potter_and_the_Goblet_of_Fire_The.html?hl=&id=MCPjwAEACAAJ"
            },
            "saleInfo": {
                "country": "IL",
                "saleability": "NOT_FOR_SALE",
                "isEbook": false
            },
            "accessInfo": {
                "country": "IL",
                "viewability": "NO_PAGES",
                "embeddable": false,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED",
                "epub": {
                    "isAvailable": false
                },
                "pdf": {
                    "isAvailable": false
                },
                "webReaderLink": "http://play.google.com/books/reader?id=MCPjwAEACAAJ&hl=&source=gbs_api",
                "accessViewStatus": "NONE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "Young wizard-in-training Harry Potter prepares for a competition between Hogwarts School of Magic and two rival schools, develops a crush on Cho Chang, and wishes above all to be a normal fourteen-year-old."
            }
        },
        {
            "kind": "books#volume",
            "id": "Aaug_RnI-xQC",
            "etag": "h74ffojGtiE",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/Aaug_RnI-xQC",
            "volumeInfo": {
                "title": "The Irresistible Rise of Harry Potter",
                "authors": [
                    "Andrew Blake"
                ],
                "publisher": "Verso",
                "publishedDate": "2002-12-17",
                "description": "Blake's examination of the Potter phenomenon raises serious questions about the condition of the publishing industry, filmmaking, and the ways in which the Potter consumer campaign has changed ideas about literature and reading.",
                "industryIdentifiers": [
                    {
                        "type": "ISBN_10",
                        "identifier": "1859846661"
                    },
                    {
                        "type": "ISBN_13",
                        "identifier": "9781859846667"
                    }
                ],
                "readingModes": {
                    "text": false,
                    "image": true
                },
                "pageCount": 140,
                "printType": "BOOK",
                "categories": [
                    "Literary Criticism"
                ],
                "averageRating": 5,
                "ratingsCount": 4,
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": false,
                "contentVersion": "1.3.4.0.preview.1",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=Aaug_RnI-xQC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=Aaug_RnI-xQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                },
                "language": "en",
                "previewLink": "http://books.google.com/books?id=Aaug_RnI-xQC&printsec=frontcover&dq=harry+potter&hl=&cd=6&source=gbs_api",
                "infoLink": "http://books.google.com/books?id=Aaug_RnI-xQC&dq=harry+potter&hl=&source=gbs_api",
                "canonicalVolumeLink": "https://books.google.com/books/about/The_Irresistible_Rise_of_Harry_Potter.html?hl=&id=Aaug_RnI-xQC"
            },
            "saleInfo": {
                "country": "IL",
                "saleability": "NOT_FOR_SALE",
                "isEbook": false
            },
            "accessInfo": {
                "country": "IL",
                "viewability": "PARTIAL",
                "embeddable": true,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED",
                "epub": {
                    "isAvailable": false
                },
                "pdf": {
                    "isAvailable": true,
                    "acsTokenLink": "http://books.google.com/books/download/The_Irresistible_Rise_of_Harry_Potter-sample-pdf.acsm?id=Aaug_RnI-xQC&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                },
                "webReaderLink": "http://play.google.com/books/reader?id=Aaug_RnI-xQC&hl=&source=gbs_api",
                "accessViewStatus": "SAMPLE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "Blake&#39;s examination of the Potter phenomenon raises serious questions about the condition of the publishing industry, filmmaking, and the ways in which the Potter consumer campaign has changed ideas about literature and reading."
            }
        },
        {
            "kind": "books#volume",
            "id": "eQRbEAAAQBAJ",
            "etag": "5hAeFh/yOvA",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/eQRbEAAAQBAJ",
            "volumeInfo": {
                "title": "Harry Potter",
                "subtitle": "A Journey Through a History of Magic",
                "authors": [
                    "British Library"
                ],
                "publisher": "Bloomsbury Publishing",
                "publishedDate": "2017",
                "description": "An irresistible romp through the history of magic, from alchemy to unicorns, ancient witchcraft to Harry's Hogwarts - packed with unseen sketches and manuscript pages from J.K. Rowling, magical illustrations from Jim Kay and weird, wonderful and inspiring artefacts that have been magically released from the archives at the British Library. This spellbinding book takes readers on a journey through the Hogwarts curriculum, including Herbology, Defence Against the Dark Arts, Astronomy, Divination and more. Discover the truth behind making the Philosopher's Stone, create your very own potion and uncover the secret of invisible ink. Learn all about the history of mandrake roots and dragons, discover what witches really used their brooms for, pore over incredible images of actual mermaids and read about real-life potions, astronomers and alchemists. The perfect gift for aspiring witches and wizards and any Harry Potter fan. Celebrating twenty years of Harry Potter magic, and produced in association with the British Library to support their major exhibition, Harry Potter: A History of Magic.",
                "industryIdentifiers": [
                    {
                        "type": "ISBN_13",
                        "identifier": "9781408890776"
                    },
                    {
                        "type": "ISBN_10",
                        "identifier": "1408890771"
                    }
                ],
                "readingModes": {
                    "text": false,
                    "image": false
                },
                "pageCount": 146,
                "printType": "BOOK",
                "categories": [
                    "JUVENILE NONFICTION"
                ],
                "averageRating": 2,
                "ratingsCount": 1,
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": false,
                "contentVersion": "0.0.1.0.preview.0",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=eQRbEAAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=eQRbEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                },
                "language": "en",
                "previewLink": "http://books.google.com/books?id=eQRbEAAAQBAJ&dq=harry+potter&hl=&cd=7&source=gbs_api",
                "infoLink": "http://books.google.com/books?id=eQRbEAAAQBAJ&dq=harry+potter&hl=&source=gbs_api",
                "canonicalVolumeLink": "https://books.google.com/books/about/Harry_Potter.html?hl=&id=eQRbEAAAQBAJ"
            },
            "saleInfo": {
                "country": "IL",
                "saleability": "NOT_FOR_SALE",
                "isEbook": false
            },
            "accessInfo": {
                "country": "IL",
                "viewability": "NO_PAGES",
                "embeddable": false,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED",
                "epub": {
                    "isAvailable": false
                },
                "pdf": {
                    "isAvailable": true
                },
                "webReaderLink": "http://play.google.com/books/reader?id=eQRbEAAAQBAJ&hl=&source=gbs_api",
                "accessViewStatus": "NONE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "This spellbinding book takes readers on a journey through the Hogwarts curriculum, including Herbology, Defence Against the Dark Arts, Astronomy, Divination and more."
            }
        },
        {
            "kind": "books#volume",
            "id": "A9I4EAAAQBAJ",
            "etag": "bWUQNPTo1pU",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/A9I4EAAAQBAJ",
            "volumeInfo": {
                "title": "Harry Potter: Wisdom",
                "subtitle": "A Guided Journal for Embracing Your Inner Ravenclaw",
                "authors": [
                    "Insight Editions"
                ],
                "publisher": "Simon and Schuster",
                "publishedDate": "2020-11-10",
                "description": "Discover the wisdom of your inner Ravenclaw with this yearlong guided journal inspired by the beloved Harry Potter films. In the Harry Potter films, students sorted into the house of Ravenclaw are known for their wisdom, wit, and intelligence. Now, fans of the iconic film series can embrace their inner Ravenclaw with this deluxe guided journal. Featuring classic Ravenclaw iconography, this yearlong journal includes a mixture of one-line-a-day activities, lists, and free-writing prompts to help fans tap into and develop the key trait that makes Ravenclaws so special: their wisdom. With film quotes from famous Ravenclaws throughout and prompts and activities inspired by key scenes from the movies, From the Films of Harry Potter: Wisdom: A Guided Journal for Embracing Your Inner Ravenclaw offers Harry Potter fans a space for self-reflection, evaluation, and empowerment inspired by the movies they love.",
                "industryIdentifiers": [
                    {
                        "type": "ISBN_13",
                        "identifier": "9781647222383"
                    },
                    {
                        "type": "ISBN_10",
                        "identifier": "1647222389"
                    }
                ],
                "readingModes": {
                    "text": false,
                    "image": false
                },
                "pageCount": 113,
                "printType": "BOOK",
                "categories": [
                    "Fiction"
                ],
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": false,
                "contentVersion": "0.0.1.0.preview.0",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=A9I4EAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=A9I4EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                },
                "language": "en",
                "previewLink": "http://books.google.com/books?id=A9I4EAAAQBAJ&printsec=frontcover&dq=harry+potter&hl=&cd=8&source=gbs_api",
                "infoLink": "http://books.google.com/books?id=A9I4EAAAQBAJ&dq=harry+potter&hl=&source=gbs_api",
                "canonicalVolumeLink": "https://books.google.com/books/about/Harry_Potter_Wisdom.html?hl=&id=A9I4EAAAQBAJ"
            },
            "saleInfo": {
                "country": "IL",
                "saleability": "NOT_FOR_SALE",
                "isEbook": false
            },
            "accessInfo": {
                "country": "IL",
                "viewability": "PARTIAL",
                "embeddable": true,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED_FOR_ACCESSIBILITY",
                "epub": {
                    "isAvailable": false
                },
                "pdf": {
                    "isAvailable": false
                },
                "webReaderLink": "http://play.google.com/books/reader?id=A9I4EAAAQBAJ&hl=&source=gbs_api",
                "accessViewStatus": "SAMPLE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "In the Harry Potter films, students sorted into the house of Ravenclaw are known for their wisdom, wit, and intelligence. Now, fans of the iconic film series can embrace their inner Ravenclaw with this deluxe guided journal."
            }
        },
        {
            "kind": "books#volume",
            "id": "Wy-Kxu3A7x8C",
            "etag": "pf8K3S0sdnE",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/Wy-Kxu3A7x8C",
            "volumeInfo": {
                "title": "Teaching with Harry Potter",
                "subtitle": "Essays on Classroom Wizardry from Elementary School to College",
                "authors": [
                    "Valerie Estelle Frankel"
                ],
                "publisher": "McFarland",
                "publishedDate": "2013-02-21",
                "description": "The Harry Potter phenomenon created a surge in reading with a lasting effect on all areas of culture, especially education. Today, teachers across the world are harnessing the power of the series to teach history, gender studies, chemistry, religion, philosophy, sociology, architecture, Latin, medieval studies, astronomy, SAT skills, and much more. These essays discuss the diverse educational possibilities of J.K. Rowling's books. Teachers of younger students use Harry and Hermione to encourage kids with disabilities or show girls the power of being brainy scientists. Students are reading fanfiction, splicing video clips, or exploring Rowling's new website, Pottermore. Harry Potter continues to open new doors to learning.",
                "industryIdentifiers": [
                    {
                        "type": "ISBN_13",
                        "identifier": "9780786472017"
                    },
                    {
                        "type": "ISBN_10",
                        "identifier": "0786472014"
                    }
                ],
                "readingModes": {
                    "text": false,
                    "image": true
                },
                "pageCount": 287,
                "printType": "BOOK",
                "categories": [
                    "Literary Criticism"
                ],
                "averageRating": 4,
                "ratingsCount": 13,
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": false,
                "contentVersion": "preview-1.0.0",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=Wy-Kxu3A7x8C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=Wy-Kxu3A7x8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                },
                "language": "en",
                "previewLink": "http://books.google.com/books?id=Wy-Kxu3A7x8C&printsec=frontcover&dq=harry+potter&hl=&cd=9&source=gbs_api",
                "infoLink": "http://books.google.com/books?id=Wy-Kxu3A7x8C&dq=harry+potter&hl=&source=gbs_api",
                "canonicalVolumeLink": "https://books.google.com/books/about/Teaching_with_Harry_Potter.html?hl=&id=Wy-Kxu3A7x8C"
            },
            "saleInfo": {
                "country": "IL",
                "saleability": "NOT_FOR_SALE",
                "isEbook": false
            },
            "accessInfo": {
                "country": "IL",
                "viewability": "PARTIAL",
                "embeddable": true,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED",
                "epub": {
                    "isAvailable": false
                },
                "pdf": {
                    "isAvailable": true,
                    "acsTokenLink": "http://books.google.com/books/download/Teaching_with_Harry_Potter-sample-pdf.acsm?id=Wy-Kxu3A7x8C&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                },
                "webReaderLink": "http://play.google.com/books/reader?id=Wy-Kxu3A7x8C&hl=&source=gbs_api",
                "accessViewStatus": "SAMPLE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "These essays discuss the diverse educational possibilities of J.K. Rowling&#39;s books. Teachers of younger students use Harry and Hermione to encourage kids with disabilities or show girls the power of being brainy scientists."
            }
        },
        {
            "kind": "books#volume",
            "id": "obrNzgEACAAJ",
            "etag": "BnS1MR/kjsU",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/obrNzgEACAAJ",
            "volumeInfo": {
                "title": "Harry Potter e a pedra filosofal",
                "authors": [
                    "J. K. Rowling"
                ],
                "publishedDate": "1999",
                "description": "Rescued from the outrageous neglect of his aunt and uncle, a young boy with a great destiny proves his worth while attending Hogwarts School for Wizards and Witches.",
                "industryIdentifiers": [
                    {
                        "type": "ISBN_10",
                        "identifier": "8532530788"
                    },
                    {
                        "type": "ISBN_13",
                        "identifier": "9788532530783"
                    }
                ],
                "readingModes": {
                    "text": false,
                    "image": false
                },
                "pageCount": 207,
                "printType": "BOOK",
                "categories": [
                    "England"
                ],
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": false,
                "contentVersion": "preview-1.0.0",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "language": "pt-BR",
                "previewLink": "http://books.google.com/books?id=obrNzgEACAAJ&dq=harry+potter&hl=&cd=10&source=gbs_api",
                "infoLink": "http://books.google.com/books?id=obrNzgEACAAJ&dq=harry+potter&hl=&source=gbs_api",
                "canonicalVolumeLink": "https://books.google.com/books/about/Harry_Potter_e_a_pedra_filosofal.html?hl=&id=obrNzgEACAAJ"
            },
            "saleInfo": {
                "country": "IL",
                "saleability": "NOT_FOR_SALE",
                "isEbook": false
            },
            "accessInfo": {
                "country": "IL",
                "viewability": "NO_PAGES",
                "embeddable": false,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED",
                "epub": {
                    "isAvailable": false
                },
                "pdf": {
                    "isAvailable": false
                },
                "webReaderLink": "http://play.google.com/books/reader?id=obrNzgEACAAJ&hl=&source=gbs_api",
                "accessViewStatus": "NONE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "Rescued from the outrageous neglect of his aunt and uncle, a young boy with a great destiny proves his worth while attending Hogwarts School for Wizards and Witches."
            }
        }
    ]
}