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
    console.log('App: changeBook');
    console.log( book.shelf );
    // console.log(this.state);
    BooksAPI.update(book, book.shelf).then(books => {
      this.setState(state => ({
        books: state.books
      }))
      /*
      this.setState(state => ({
        contacts: state.contacts.concat([ contact ])
      }))
      */
    })
    // this.render();
    // var partialState = this.state;
    // partialState.data.shelf = event.target.value;
    // this.setState(partialState);
  }

  componentDidMount() {
    this.updateBook = this.updateBook.bind(this);
    BooksAPI.getAll().then((books) => {
      // load up the shelves
      this.setState({ books });
      // console.log( books );
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

    var shelfComponents = this.state.shelves.map(function(shelf) {
      return <Bookshelf
        books={books.filter(book => book.shelf === shelf)}
        key={ shelf.replace(' ', '_') }
        onChangeBookshelf={(book) => {
          updateBook(book)
        }}
        shelfName={ shelf }
      /> 
    });

    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                { shelfComponents }
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )}/>
        <Route path='/search' render={() => (
          <SearchPage />
        )}/>
      </div>
    )
  }

}

export default BooksApp
