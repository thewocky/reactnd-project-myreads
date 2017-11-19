import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'


class Bookshelf extends React.Component {
  static propTypes = {
    onChangeBook: PropTypes.func.isRequired
  }

  render() {
    const { books, onChangeBook } = this.props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ this.props.shelfName }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">

            { books.map(function(book) {
              return <Book
                data={ book }
                key={ book.id }
                changeBook={ onChangeBook }
              /> 
            })}

          </ol>
        </div>
      </div>
      )
  }
}

export default Bookshelf;
