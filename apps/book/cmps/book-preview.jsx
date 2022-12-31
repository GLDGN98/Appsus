

export function BookPreview({ book }) {    
    return (
        <article>
            <h2>{book.title}</h2>
            <img src={book.thumbnail} style={{ width: '150px', height: '150px' }} alt="" />
        </article>
    )
}
