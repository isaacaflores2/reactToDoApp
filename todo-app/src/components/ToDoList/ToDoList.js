import React from 'react';
import PropTypes from 'prop-types';
import ToDoItem from '../ToDoItem/ToDoItem';
import ToDo from '../../modules/ToDo';
import FormWithIcon from '../FormWithIcon/FormWithIcon';
import ListCard from '../ListCard/ListCard';
import ContextMenu from '../ContextMenu/ContextMenu';
import Menu from '../Menu/Menu';

class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleNewItem = this.handleNewItem.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.startEditMode = this.startEditMode.bind(this);
    this.endEditMode = this.endEditMode.bind(this);
    this.handleItemEdit = this.handleItemEdit.bind(this);
    this.updateItemName = this.updateItemName.bind(this);
    this.handleEditItemTextChange = this.handleEditItemTextChange.bind(this);

    this.state = { itemText: '', editItemText: '', editItemId: null };
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
    onListUpdate(todo);
  }

  startEditMode(targetId) {
    const editItem = this.props.todo.items.find((item) => item.id === targetId);
    const editItemCurrentText = editItem.name;
    this.setState({ editItemText: editItemCurrentText, editItemId: targetId });
  }

  endEditMode() {
    this.setState({ editItemText: '', editItemId: null });
  }

  updateItemName(id, newName) {
    const { onListUpdate, todo } = this.props;
    console.log(todo);
    const updatedItems = todo.items.map((item) => { if (id === item.id) { item.name = newName; } return item; });
    const currentTodo = todo;
    currentTodo.items = updatedItems;

    onListUpdate(currentTodo);
  }

  handleItemEdit(event) {
    event.preventDefault();

    if (this.state.editItemText.length === 0) {
      this.endEditMode();
      return;
    }

    const { editItemId, editItemText } = this.state;
    this.updateItemName(editItemId, editItemText);
    this.endEditMode();
  }

  handleEditItemTextChange(event) {
    this.setState({ editItemText: event.target.value });
  }


  render() {
    const { itemText, editItemText, editItemId } = this.state;
    const { todo } = this.props;
    return (
      <ContextMenu menu={({ mouseX, mouseY, targetId }) => (
        <Menu onEdit={() => this.startEditMode(targetId)} onRemove={() => this.handleRemoveItem(targetId)} top={mouseY - 60} left={mouseX - 40} />)}
      >
        <div data-testid={`todolist-${todo.name}`} className="row">
          {todo.items.map((item) => {
            if (editItemId === item.id) {
              return (
                <ListCard key={`${item.name}-${item.id}`}>
                  <FormWithIcon
                    data-testid="edit-item-form"
                    text={editItemText}
                    onSubmit={this.handleItemEdit}
                    onChange={this.handleEditItemTextChange}
                    placeholder={editItemText}
                  />
                </ListCard>
              );
            }

            return (
              <ListCard key={`${item.name}-${item.id}`}>
                <ToDoItem item={item} onRemoveItem={this.handleRemoveItem} onChecked={this.handleChecked} />
              </ListCard>
            );
          })}

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
      </ContextMenu>
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
