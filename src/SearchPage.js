import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchPage extends React.Component {

  static propTypes = {
    onChangeBookshelf: PropTypes.func.isRequired,
    currentBooks: PropTypes.array.isRequired
  };

  static currentIDs = [];

  state = {
    query: '',
    books: []
  }

  updateQuery = (query) => {
    this.setState({ query })
    if( !query.length ) {
      this.setState( state => ({
        books: []
      }))
    } else {
      // this is not the right place to do this
      // ...should only happen once on component load / mount
      // const bookIDs = this.props.currentBooks.map( book => book.id );
      this.currentIDs = this.props.currentBooks.map( book => book.id );
      console.log( 'bookIDs: ' + this.currentIDs );
      BooksAPI.search(query).then( books => {
        const allBooks = books.map( book => {
          const idIndex = this.currentIDs.indexOf( book.id );
          return idIndex >= 0 ? this.props.currentBooks[idIndex] : book;
        });
        this.setState( (state) => ({ books: allBooks }) )
      });
    }
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }
  /*  
  // where to do this?
  getDefaultProps = () => {
    console.log( 'getDefaultProps' );
    console.log( this.props.currentBooks );
    return {};
  }

  getInitialState = function(){
    console.log( 'getInitialState' );
    console.log( this.props.currentBooks );
    return {};
  }
  */
  componentDidMount() {
    const searchInput = document.getElementById( 'search-input' );
    searchInput.focus();
  }
	
	// render search page
  render() {
    
    const { onChangeBookshelf } = this.props;
    const { query, books } = this.state;
    // this.bookIDs = currentBooks.map( book => book.id );
    // console.log( 'currentBooks' );
    // console.log( currentBooks );

    return (
      <div className="search-books">
        <div className="search-books-bar">
	        <Link className='close-search' to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              id='search-input'
              type='text'
              placeholder='Search by title or author'
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              books.length > 0 && 
                books.map( (book) => (
                 <Book
                  data={ book }
                  key={ book.id }
                  onChangeBook={(book) => {
                    onChangeBookshelf(book)
                  }}
                /> 
              ))
           }

          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage;
