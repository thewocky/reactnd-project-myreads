import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

/*
 * Problems/questions
 * - why does space in query return 0 results? i.e. 'linux '
 */

class SearchPage extends React.Component {

  static propTypes = {
    onChangeBookshelf: PropTypes.func.isRequired
  }

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
      BooksAPI.search(query).then(books => {
        this.setState( (state) => ({ books }) )
      });
    }
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }
	
	// render search page
  render() {
    
    const { onChangeBookshelf } = this.props
    const { query, books } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
	        <Link className='close-search' to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
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
              books.length > 0 && books.map( (book) => (
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
