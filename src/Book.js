import React from 'react'
import PropTypes from 'prop-types'

class Book extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    }

    this.handleChangeShelf = this.handleChangeShelf.bind(this);
  }
  static propTypes = {
    data: PropTypes.object.isRequired
  }
  
  // get this from books API?
  shelfOptions = [
    { name: 'Currently Reading', value: 'currentlyReading' },
    { name: 'Want to Read', value: 'wantToRead' },
    { name: 'Read', value: 'read' },
    { name: 'None', value: 'none' }
  ];

  componentDidMount() {
  }

  handleChangeShelf( event ) {
    var partialState = this.state;
    partialState.data.shelf = event.target.value;
    this.setState(partialState);
    // TODO: cast event to app
  }

  render() {

    const { data } = this.props;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${data.imageLinks.smallThumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select onChange={this.handleChangeShelf} value={this.state.value} >
                <option value="none" disabled>Move to...</option>
                { this.shelfOptions && this.shelfOptions.map(function(option) {
                    // todo: preselect optino
                    return <option key={option.value} value={option.value}>{option.name}</option>
                  })

                }
              </select>
            </div>
          </div>
          <div className="book-title">{ data.title }</div>
          <div className="book-authors">{ data.authors.map( author => {
            return author
          }) }</div>
        </div>
      </li>
    )
  }
}


export default Book;
