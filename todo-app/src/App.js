import React from 'react';
import './App.css';
import './scss/custom.scss';
import ToDoList from './components/ToDoList/ToDoList';
import NavBar from './components/NavBar/NavBar';
import ToDo from './modules/ToDo';
import API from './services/ToDoService';
import SideBar from './components/SideBar/SideBar';
import FormWithIcon from './components/FormWithIcon/FormWithIcon';


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

    this.state = {
      todos: [],
      todoToDisplayIndex: 0,
      newTodoName: '',
      sideBarIsCollapsed: true,
    };
  }

  async componentDidMount() {
    const jsonTodos = await API.getTodos();
    const todos = this.createToDoObjectsFromJson(jsonTodos);
    this.setState({ todos });
  }


  createToDoObjectsFromJson(json) {
    const todos = [];
    for (let i = 0; i < json.length; i += 1) {
      todos.push(ToDo.fromJson(json[i]));
    }
    return todos;
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
      const newId = state.todos.length.toString();
      const newTodo = new ToDo(
        newId,
        state.newTodoName,
      );

      return {
        todos: [newTodo].concat(state.todos),
        newTodoName: '',
        todoToDisplayIndex: 0,
      };
    });
  }

  handleSelectList(listId) {
    const index = this.state.todos.findIndex((todo) => todo.id === listId);
    this.setState({ todoToDisplayIndex: index });
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

  handleRemoveItem(todoListId, itemId) {
    this.setState((state) => {
      const updatedTodos = state.todos;
      updatedTodos[todoListId].removeItem(itemId);
      return { todos: updatedTodos };
    });
  }

  handleToggleSideBar() {
    this.setState((state) => ({
      sideBarIsCollapsed: !state.sideBarIsCollapsed,
    }));
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
