const { useState, useEffect, Fragment } = React
const { Link } = ReactRouterDOM

export function DataTableRow({ book }) {

    const [isExpanded, setIsExpanded] = useState(false)

    return <Fragment>
        <tr onClick={() => {
            setIsExpanded(!isExpanded)
        }}>
            <td>{book.title}</td>
            <td>{book.subtitle}</td>
            <td>
                <Link to={`/book/${book.id}`}>Details</Link> |
                <Link to={`/book/edit/${book.id}`}>Edit</Link>
            </td>
        </tr>
        <tr hidden={!isExpanded}>
            <td colSpan="3">
                <img src={`https://robohash.org/${book.id}`} style={{ maxWidth: '50px' }} />
                <p>Lorem ipsum dolor</p>
            </td>
        </tr>
    </Fragment>

}
