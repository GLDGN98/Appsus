const { useState } = React

export function LongTxt({ txt, length }) {

    const [isShowMore, setShowMore] = useState(false)


    function getTxtToShow(txt, length) {
        return (txt.length < length || isShowMore) ? txt : txt.substring(0, length + 1) + '...'
    }

    function onToggleLongTxt() {
        setShowMore(prevLongTxtShown => !prevLongTxtShown)
    }


    return <article className="long-txt">
        <td>{getTxtToShow(txt, length)}</td>
        {/* {txt.length > length && <button onClick={onToggleLongTxt}>{isShowMore ? 'Read less' : 'Read more'}</button>} */}
    </article>
}