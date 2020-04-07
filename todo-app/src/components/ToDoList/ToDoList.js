import React from 'react';
import PropTypes from 'prop-types';
import ToDoItem from '../ToDoItem/ToDoItem';
import ToDo from '../../modules/ToDo';
import FormWithIcon from '../FormWithIcon/FormWithIcon';
import ListCard from '../ListCard/ListCard';


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
    const { itemText } = this.state;
    const { todo } = this.props;
    return (
      <div data-testid={`todolist-${todo.name}`} className="row">

        {todo.items.map((item, i) => (
          <ListCard key={`${item}-${i}`}>
            <ToDoItem name={item} id={i} onRemoveItem={this.handleRemoveItem} />
          </ListCard>
        ),
        )}

        <ListCard>
          <FormWithIcon
            data-testid="list-form"
            text={itemText}
            onSubmit={this.handleNewItem}
            onChange={this.handleTextChange}
            placeholder="Add New Item"
          />
        </ListCard>
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
