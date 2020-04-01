import React from 'react';
import './App.css';
import './scss/custom.scss';
import PropTypes from 'prop-types';
import ToDoList from './components/ToDoList/ToDoList';
import NavBar from './components/NavBar/NavBar';
import ToDo from './modules/ToDo';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleTodoNameChange = this.handleTodoNameChange.bind(this);
    this.handleNewList = this.handleNewList.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleSelectList = this.handleSelectList.bind(this);
    this.handleRemoveList = this.handleRemoveList.bind(this);

    this.state = { todos: this.props.todos, todoToDisplayId: 0, newTodoName: '' };
  }

  handleTodoNameChange(event) {
    this.setState({ newTodoName: event.target.value });
  }

  handleNewList(event) {
    event.preventDefault();

    if (this.state.newTodoName.length === 0) {
      return;
    }

    this.setState((state) => {
      const newId = state.todos.length;
      const newTodo = new ToDo(
        newId,
        state.newTodoName,
      );

      return {
        todos: [newTodo].concat(state.todos),
        newTodoName: '',
        todoToDisplayId: 0,
      };
    });
  }

  handleSelectList(listId) {
    const index = this.state.todos.findIndex((todo) => todo.id === listId);
    this.setState({ todoToDisplayId: index });
  }

  handleRemoveList(listId) {
    this.setState((state) => {
      const listIndex = state.todos.findIndex((todo) => todo.id === listId);
      const updatedTodos = state.todos;
      updatedTodos.splice(listIndex, 1);

      return {
        todos: updatedTodos,
        todoToDisplayId: 0,
      };
    });
  }

  handleAddItem(todoListId, value) {
    this.setState((state) => {
      const updatedTodos = state.todos;
      updatedTodos[todoListId].addItem(value);

      return {
        todos: updatedTodos,
      };
    });
  }

  handleRemoveItem(todoListId, itemId) {
    this.setState((state) => {
      const updatedTodos = state.todos;
      updatedTodos[todoListId].removeItem(itemId);
      return { todos: updatedTodos };
    });
  }

  render() {
    const { todos } = this.state;
    const todoId = this.state.todoToDisplayId;

    return (
      <>
        <div className="container">

          <header>
            <NavBar
              todos={todos}
              onTodoSelect={this.handleSelectList}
              onNewList={this.handleNewList}
              onTodoNameChange={this.handleTodoNameChange}
              onRemoveList={this.handleRemoveList}
              newTodoName={this.state.newTodoName}
            />
          </header>

          <div data-testid="todolist-title" className="jumbotron">
            {this.state.todos.length > 0
              && (
              <div className="col-md-6">
                <h1 className="display-3 font-italic">{todos[todoId].name}</h1>
              </div>
              )}
          </div>

          <main>
            {this.state.todos.length > 0
              && (
              <ToDoList
                key={todoId}
                id={todoId}
                todo={todos[todoId]}
                onNewItem={this.handleAddItem}
                onRemoveItem={this.handleRemoveItem}
              />
              )}
          </main>

        </div>
      </>
    );
  }
}

App.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.instanceOf(ToDo)).isRequired,
};

export default App;
