import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import ListBooks from './books/ListBooks'
import SearchBooks from './search/SearchBooks'

export let shelfs = [
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
    BooksAPI.getAll().then(books => this.setState({ books }));
  }

  /**
   * @description This function change book to shelf wished 
   * @param {object} book
   * @param {string} shelf
   */
  changeBookToShelf = (book, shelf) => {

    BooksAPI.update(book, shelf).then(result => {
      const numberOfBooks = this.getNumberOfBooks(result);

      if (this.isUpdate(numberOfBooks)) {
        this.updateBookOfBooksState(book, shelf);
      } else if (this.isAddBook(numberOfBooks)) {
        this.addBookOfBooksState(book, shelf);
      } else {
        this.removeBookOfBooksState(book, shelf);
      }

    });

  };

  getNumberOfBooks = (booksUpdated) => {
    return Object.values(booksUpdated).map(i => i.length).reduce((a, b) => a + b, 0);
  };

  /**
   * @description remove book to array of books on state
   * @param {object} book
   */
  removeBookOfBooksState = (book, shelf) => {
    this.setState({ books: this.state.books.filter(item => item !== book) });
  };

  /**
   * @description Verify if is to update book on list of books state
   * @param {object} booksUpdated 
   */
  isUpdate = (numberOfBooks) => {
    return numberOfBooks === this.state.books.length
  };

  /**
   * @description update a book to a shelf wished
   * @param {object} book
   * @param {string} shelf
   * @returns {Array} of books updated
   */
  updateBookOfBooksState = (book, shelf) => {
    
    const books = this.state.books.map(item => {
      if (item === book) {
        item.shelf = shelf;
      }
      return item;
    });

    this.setState({ books });

  };

  /**
   * @description Verify if is to add book on list of books state
   * @param {object} booksUpdated 
   */
  isAddBook = (numberOfBooks) => {
    return numberOfBooks > this.state.books.length;
  }

  /**
   * @description add a book to a shelf wished
   * @param {object} book
   * @param {string} shelf 
   * @returns {Array} of books updated
   */
  addBookOfBooksState = (book, shelf) => {
    book.shelf = shelf;
    this.setState({ books: this.state.books.concat(book) });
  };


  render() {

    shelfs.forEach(shelf => {
      shelf.books = this.state.books
        .filter(book => book.shelf === shelf.name);
    });

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
