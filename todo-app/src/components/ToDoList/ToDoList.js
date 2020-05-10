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
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleChecked = this.handleChecked.bind(this);

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

    const newItemName = this.state.itemText;

    this.setState((state) => ({
      itemText: '',
    }));

    this.props.onNewItem(this.props.id, newItemName);
  }

  handleRemoveItem(itemId) {
    this.props.onRemoveItem(this.props.id, itemId);
  }

  handleUpdate() {
    const { onListUpdate, todo } = this.props;
    onListUpdate(todo);
  }

  handleChecked(id, isChecked) {
    const { onListUpdate, todo } = this.props;
    console.log(todo);
    const updatedItems = todo.items.map((item) => { if (id === item.id) { item.isChecked = isChecked; } return item; });
    todo.items = updatedItems;
    console.log('ischecked update. new todo: ');
    console.log(todo);
    onListUpdate(todo);
  }

  render() {
    const { itemText } = this.state;
    const { todo } = this.props;
    return (
      <div data-testid={`todolist-${todo.name}`} className="row">

        {todo.items.map((item) => (
          <ListCard key={`${item.name}-${item.id}`}>
            <ToDoItem item={item} onRemoveItem={this.handleRemoveItem} onChecked={this.handleChecked} />
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
  id: PropTypes.string.isRequired,
  todo: PropTypes.instanceOf(ToDo).isRequired,
  onNewItem: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  onListUpdate: PropTypes.func.isRequired,
};

export default ToDoList;
