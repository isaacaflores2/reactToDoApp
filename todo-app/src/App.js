import React from 'react';
import './App.css';
import './scss/custom.scss';
import { ObjectID } from 'mongodb';
import ToDoList from './components/ToDoList/ToDoList';
import NavBar from './components/NavBar/NavBar';
import ToDo from './modules/ToDo';
import ToDoService from './services/ToDoService';
import SideBar from './components/SideBar/SideBar';
import FormWithIcon from './components/FormWithIcon/FormWithIcon';
import ContextMenu from './components/ContextMenu/ContextMenu';
import Menu from './components/Menu/Menu';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleTodoNameChange = this.handleTodoNameChange.bind(this);
    this.handleNewList = this.handleNewList.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleSelectList = this.handleSelectList.bind(this);
    this.handleRemoveList = this.handleRemoveList.bind(this);
    this.handleToggleSideBar = this.handleToggleSideBar.bind(this);
    this.handleListUpdate = this.handleListUpdate.bind(this);

    this.state = {
      todos: [],
      todoToDisplayIndex: 0,
      newTodoName: '',
      sideBarIsCollapsed: true,
    };
  }

  async componentDidMount() {
    const jsonTodos = await ToDoService.getTodos();
    const todos = ToDo.createToDoArrayFromJson(jsonTodos);
    this.setState({ todos });
  }

  handleTodoNameChange(event) {
    this.setState({ newTodoName: event.target.value });
  }

  async handleNewList(event) {
    event.preventDefault();

    if (this.state.newTodoName.length === 0) {
      return;
    }

    const newTodo = new ToDo(
      new ObjectID().toString(),
      this.state.newTodoName,
    );

    const response = await ToDoService.addTodo(newTodo);
    const ok = await response.ok;

    this.setState((state) => ({
      todos: [newTodo].concat(state.todos),
      newTodoName: '',
      todoToDisplayIndex: 0,
    }));
  }

  handleSelectList(listId) {
    const index = this.state.todos.findIndex((todo) => todo.id === listId);
    this.setState({ todoToDisplayIndex: index });
  }

  async handleRemoveList(listId) {
    const listIndex = this.state.todos.findIndex((todo) => todo.id === listId);
    const updatedTodos = this.state.todos;
    updatedTodos.splice(listIndex, 1);

    const response = await ToDoService.removeTodo(listId);
    const ok = await response.ok;

    this.setState((state) => ({
      todos: updatedTodos,
      todoToDisplayId: 0,
    }));
  }

  handleAddItem(listId, value) {
    this.setState((state) => {
      const listIndex = state.todos.findIndex((todo) => todo.id === listId);
      const updatedTodos = state.todos;
      updatedTodos[listIndex].addItem(value);

      return {
        todos: updatedTodos,
      };
    });
  }

  handleRemoveItem(listId, itemId) {
    const index = this.state.todos.findIndex((todo) => todo.id === listId);
    const updatedTodos = this.state.todos;
    updatedTodos[index].removeItem(itemId);

    this.handleListUpdate(updatedTodos[index]);

    this.setState({ todos: updatedTodos });
  }

  handleToggleSideBar() {
    this.setState((state) => ({
      sideBarIsCollapsed: !state.sideBarIsCollapsed,
    }));
  }

  async handleListUpdate(todo) {
    const response = await ToDoService.updateTodo(todo);
    const ok = await response.ok;

    this.setState({ todos: todo });
  }

  render() {
    const {
      todos, todoToDisplayIndex, newTodoName, sideBarIsCollapsed,
    } = this.state;
    const todo = todos[todoToDisplayIndex];
    return (
      <>
        <div className="container-fluid px-0">

          <header>
            <NavBar />
          </header>

          <div className="row no-gutters">
            <div className="col-auto px-0">
              <SideBar
                todos={todos}
                onTodoSelect={this.handleSelectList}
                onNewList={this.handleNewList}
                onRemoveList={this.handleRemoveList}
                isCollapsed={sideBarIsCollapsed}
                onToggle={this.handleToggleSideBar}
              >
                <FormWithIcon
                  text={newTodoName}
                  inputClassName="text-light"
                  onSubmit={this.handleNewList}
                  onChange={this.handleTodoNameChange}
                  isCollapsed={sideBarIsCollapsed}
                  placeholder="Add New List"
                />
              </SideBar>
            </div>

            <div className="col overflow-hidden">
              <div data-testid="todolist-title" className="jumbotron px-0 mb-0  ">
                {todos.length > 0
                && (
                <div className="col">
                  <h1 className="display-3 font-italic">{todo.name}</h1>
                </div>
                )}
              </div>

              <main>
                {todos.length > 0
              && (
              <ToDoList
                key={todoToDisplayIndex}
                id={todo.id}
                todo={todo}
                onNewItem={this.handleAddItem}
                onRemoveItem={this.handleRemoveItem}
                onListUpdate={this.handleListUpdate}
              />
              )}
              </main>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
