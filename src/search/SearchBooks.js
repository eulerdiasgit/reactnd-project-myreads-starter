import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom' 
import  Book  from '../books/Book'

class SearchBooks extends Component {

    static propTypes = {
        onAddBook : PropTypes.func.isRequired
    }

    state = {
        query: '',
        booksFound : []
    }

    searchByTerm = () => {
        this.setState({ 
            query: this.search.value 
        }, () => {

            if(this.state.query && this.state.query.length > 1){
                BooksAPI.search(this.state.query).then(booksFound => {
                    booksFound.length > 0 && this.state.query.length > 1 ? this.setState({ booksFound : booksFound }) : this.setState({ booksFound: [] })
                })
            }else{
                this.setState({ booksFound: [] }) 
            }
        })
    }

    render() {
        const { onAddBook } = this.props
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input ref={input => this.search = input} type="text" placeholder="Search by title or author" onChange={ this.searchByTerm }/>

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            this.state.booksFound.map(book => 
                                <Book book={ book } key={ book.id } onUpdateBook={ onAddBook }/>
                            )
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks