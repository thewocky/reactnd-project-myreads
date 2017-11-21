import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import SearchPage from './SearchPage'
import Bookshelf from './Bookshelf'
import './App.css'
import * as BooksAPI from './BooksAPI'

/*
 * Problems/questions
 * - on return from Search page, newly added books aren't in correct shelves--only on refresh
 */


class BooksApp extends Component {

  state = {
    books: [],
    shelves: []
  }

  updateBook( book ) {
    BooksAPI.update(book, book.shelf).then(books => {
      this.setState(state => ({
        books: state.books
      }))
    })
  }

  componentDidMount() {
    this.updateBook = this.updateBook.bind(this);
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
      books.forEach( (b) => {
        const shelfExists = this.state.shelves.includes( b.shelf );
        if( !shelfExists ) {
          var newShelves = this.state.shelves;
          newShelves.push( b.shelf );
          this.setState({
            shelves: newShelves
          });
        }
      });
    })
  }

  render() {

    const books = this.state.books;
    const updateBook = this.updateBook;

    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                {
                  this.state.shelves.map(function(shelf) {
                    return <Bookshelf
                      books={books.filter(book => book.shelf === shelf)}
                      key={ shelf.replace(' ', '_') }
                      onChangeBookshelf={(book) => {
                        updateBook(book)
                      }}
                      shelfName={ shelf }
                    /> 
                  })
                }
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )}/>
        <Route path='/search' render={() => (
          <SearchPage
            books={books}
            onChangeBookshelf={(book) => {
              updateBook(book)
            }}
          />
        )}/>
      </div>
    )
  }

}

export default BooksApp
