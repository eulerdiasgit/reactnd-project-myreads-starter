import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Book from '../books/Book'

class SearchBooks extends Component {

    static propTypes = {
        onChangeBookToShelf: PropTypes.func.isRequired,
        books: PropTypes.array.isRequired
    }

    state = {
        query: '',
        booksFound: []
    }

    _searchByTerm = () => {
        this.setState({
            query: this.search.value
        }, () => {

            if (this.state.query && this.state.query.length > 1) {
                this._getBooksByTerm(this.state.query)
            } else {
                this.setState({ booksFound: [] })
            }
        })
    }

    _changeBooksHasShelf = (booksFound, booksOnShelfs) => {
        return booksFound.map(book => {
            let result = booksOnShelfs.find(item => item.id === book.id)

            if (result) {
                return result
            }
            return book
        })
    }

    _getBooksByTerm = (query) => {
        BooksAPI.search(query).then(booksFound => {
            booksFound.length > 0 && this.state.query.length > 1
                ? this.setState({ booksFound: booksFound })
                : this._setBooksToEmpty()
        })
    }

    _setBooksToEmpty = () => {
        this.setState({ booksFound: [] })
    }

    render() {
        const { books, onChangeBookToShelf } = this.props

        let booksToShow = this._changeBooksHasShelf(this.state.booksFound, books)

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link 
                        to="/" 
                        className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input ref={input => this.search = input} type="text" placeholder="Search by title or author" onChange={this._searchByTerm} />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            booksToShow.map(book =>
                                <Book 
                                    book={book} 
                                    key={book.id} 
                                    onChangeBookToShelf={onChangeBookToShelf} />
                            )
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks