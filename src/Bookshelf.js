import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Bookshelf extends React.Component {
  static propTypes = {
    onChangeBookshelf: PropTypes.func.isRequired
  }

  render() {
    const { books, onChangeBookshelf } = this.props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ this.props.shelfName }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">

            { books.map( (book) => (
              <Book
                data={ book }
                key={ book.id }
                onChangeBook={(book) => {
                  onChangeBookshelf(book)
                }}
              /> 
            ))}

          </ol>
        </div>
      </div>
      )
  }
}

export default Bookshelf;
