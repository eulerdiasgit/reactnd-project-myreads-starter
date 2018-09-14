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

    /**
     * @description set value query on query state and verify if necessary search, if values on query get books by term
     */
    searchByTerm = () => {
        this.setState({
            query: this.search.value
        }, () => {
            this.state.query && this.state.query.length > 1 ? this.getBooksByTerm(this.state.query) : this.setState({ booksFound: [] });
        })
    };

    /**
     * @description Change books on result query research per books on shelf list, case it is the same
     * @param {any} booksFound
     * @param {any} booksOnShelfs
     * @returns {Array} books to show
     */
    changeBooksHasShelf = (booksFound, booksOnShelfs) => {
        return booksFound.map(book => {
            let result = booksOnShelfs.find(item => item.id === book.id);
            return result || book;
        });
    };

    /**
     * @description Get books on Api by the term, and set on state
     * @param {string} query
     */
    getBooksByTerm = (query) => {
        BooksAPI.search(query).then(booksFound => {
            booksFound.length > 0 && this.state.query.length > 1 ? this.setState({ booksFound: booksFound }) : this.setBooksToEmpty();
        });
    };

    /**
     * @description Set state booksFound to new Array
     */
    setBooksToEmpty = () => {
        this.setState({ booksFound: [] });
    };

    render() {
        const { books, onChangeBookToShelf } = this.props;

        let booksToShow = this.changeBooksHasShelf(this.state.booksFound, books);

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
                        <input ref={input => this.search = input}
                            type="text"
                            placeholder="Search by title or author"
                            onChange={this.searchByTerm} />

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