import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

class ListBooks extends Component {
    static propTypes = {
        shelfs: PropTypes.array.isRequired
    }

    render() {
        const { shelfs } = this.props
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        { shelfs.map(shelf => 
                            <BookShelf shelf ={ shelf } key={shelf.name} />
                        )}
                    </div>
                    <div className="open-search">
                        <Link to="/search" >Add a book</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListBooks