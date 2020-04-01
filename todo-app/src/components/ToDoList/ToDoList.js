import React from 'react';
import PropTypes from 'prop-types';
import ToDoItem from '../ToDoItem/ToDoItem';
import ToDo from '../../modules/ToDo';

class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleNewItem = this.handleNewItem.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);

    this.state = { itemText: '' };
  }

  handleTextChange(event) {
    this.setState({ itemText: event.target.value });
  }

  handleNewItem(event) {
    event.preventDefault();

    if (this.state.itemText.length === 0) {
      return;
    }

    const newItem = this.state.itemText;

    this.setState((state) => ({
      itemText: '',
    }));

    this.props.onNewItem(this.props.id, newItem);
  }

  handleRemoveItem(itemId) {
    this.props.onRemoveItem(this.props.id, itemId);
  }

  render() {
    return (
      <div data-testid={`todolist-${this.props.todo.name}`} className="row">

        {this.props.todo.items.map((item, i) => (
          <div key={`${item}-${i}`} className="col-12 col-sm-4 mb-3">
            <div className="card card-body h-100">
              <ToDoItem key={`${item}-${i}`} name={item} id={i} onRemoveItem={this.handleRemoveItem} />
            </div>
          </div>
        ),
        )}

        <div className="col-12 col-sm-4 mb-3">
          <div className="card card-body h-100">
            <form data-testid="list-form" onSubmit={this.handleNewItem}>
              <div className="form-row no-gutters py-0">
                <div className="col-10 col-sm-8 mr-auto">
                  <input className="form-control-sm bg-transparent" placeholder="New item" id="newItem" onChange={(this.handleTextChange)} value={this.state.itemText} />
                </div>
                <div className="">
                  <button data-testid="new-item-button" type="submit" className="btn btn-sm btn-dark">Add</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ToDoList.propTypes = {
  id: PropTypes.number.isRequired,
  todo: PropTypes.instanceOf(ToDo).isRequired,
  onRemoveItem: PropTypes.func.isRequired,
};

export default ToDoList;
