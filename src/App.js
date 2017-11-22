import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import SearchPage from './SearchPage'
import Bookshelf from './Bookshelf'
import './App.css'
import * as BooksAPI from './BooksAPI'

class BooksApp extends Component {

  state = {
    books: [],
    shelves: []
  }

  updateBook( book ) {
    BooksAPI.update(book, book.shelf).then(updatedShelves => {
      const bookList = this.state.books;
      const bookInList = bookList.findIndex( b => {
        return b.id === book.id;
      });
      if( bookInList >= 0 ) {
        bookList[bookInList] = book;
      } else {
        bookList.push( book );
      }
     
      this.setState({
        books: bookList
      });

    })
  }

  componentDidMount() {
    this.updateBook = this.updateBook.bind(this);
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
      console.log( books );
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
            currentBooks={books}
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
