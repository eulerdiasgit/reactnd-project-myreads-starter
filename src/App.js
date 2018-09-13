import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import ListBooks from './books/ListBooks'
import SearchBooks from './search/SearchBooks'

export var shelfs = [
  {
    name: 'currentlyReading',
    displayName: 'Currently Reading',
    books: []
  },
  {
    name: 'wantToRead',
    displayName: 'Want to Read',
    books: []
  },
  {
    name: 'read',
    displayName: 'Read',
    books: []
  }
]

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ books }))
  }

  changeBookToShelf = (book, shelf) => {

    let booksUpdated;

    if (shelf === 'none') {
      booksUpdated = this._removeBook(book)
    } else if (book.shelf) {
      booksUpdated = this._updateBook(book, shelf)
    } else {
      booksUpdated = this._addBook(book, shelf)
    }

    this.setState({ books: booksUpdated })

  }

  updateShelf = (book, shelf) => {

    var booksUpdated;

    if (shelf === 'none') {
      booksUpdated = this.removeBook(book)
    } else {
      booksUpdated = this.updateBook(book, shelf)
    }

    this.setState({ books: booksUpdated })

  }

  _removeBook = (book) => {
    return this.state.books.filter(item => item !== book)
  }

  _updateBook = (book, shelf) => {
    return this.state.books.map(item => {
      if (item === book) {
        item.shelf = shelf
      }
      return item
    })
  }

  _addBook = (book, shelf) => {
    book.shelf = shelf
    return this.state.books.concat(book)
  }


  render() {

    shelfs.forEach(shelf => {
      shelf.books = this.state.books
        .filter(book => book.shelf === shelf.name)
    })

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            shelfs={shelfs}
            onChangeBookToShelf={this.changeBookToShelf} />
        )} />
        <Route path="/search" render={() => (
          <SearchBooks
            onChangeBookToShelf={this.changeBookToShelf}
            books={this.state.books} />
        )} />
      </div>
    )
  }
}

export default BooksApp
