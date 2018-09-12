import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {
    static propTypes = {
        shelf : PropTypes.object.isRequired
    }
    render() {
        const { shelf } = this.props

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf.displayName}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {shelf.books.map(book => 
                            <li key={ book.id }>
                                <Book book={ book } />
                            </li>
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookShelf