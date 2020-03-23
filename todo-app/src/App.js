import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './styles/dashboard.css';
import TodoList from './components/TodoList';
import SideNav from './components/SideNav';
import Navbar from './components/NavBar';
import Main from './components/Main';
import Todo from './modules/Todo';

class App extends React.Component{

  constructor(props){
    super(props);
    this.handleTodoNameChange = this.handleTodoNameChange.bind(this);
    this.handleNewTodoList = this.handleNewTodoList.bind(this);
    this.handleTodoUpdate = this.handleTodoUpdate.bind(this);
    this.handleNavSelect = this.handleNavSelect.bind(this);
    
    this.state = {todos: [], todoToDisplayId: 0, newTodoName: ''};
  }

  handleTodoNameChange(event){
    this.setState({newTodoName: event.target.value});
  }

  handleNewTodoList(event){
    event.preventDefault();

    if(this.state.newTodoName.length === 0){
      return; 
    }

    const newTodo = new Todo(
      this.state.todos.length,
      this.state.newTodoName
    );

    this.setState(state => ({
      todos: state.todos.concat(newTodo),
      newTodoName: ''
    }));
  }

  handleNavSelect(todoListId){
    this.setState({todoToDisplayId: todoListId })
  }

  handleTodoUpdate(id, value){    
    const updatedTodos = this.state.todos;
    updatedTodos[id].addItem(value);
    this.setState({todos: updatedTodos});
  }

  render(){
    const todos = this.state.todos;
    const todoId = this.state.todoToDisplayId;

    return (
      <>
        <Navbar/>

        <div class="container-fluid">
          <div class="row">
            <div class="col">

              <SideNav todos={todos} onTodoSelect={this.handleNavSelect}>
                <form onSubmit={this.handleNewTodoList}>
                  <label htmlFor="newTodoList"/>
                    <input className="form-control bg-transparent text-light" placeholder="My new ToDo list" id="newTodoList" onChange={this.handleTodoNameChange} value={this.state.newTodoName}/>
                  {/* <button className="">Add list</button> */}
                </form>
              </SideNav> 
            </div>

            <Main>
              {this.state.todos.length > 0 &&          
                <div>              
                  <TodoList key={todoId} id={todoId} todo={todos[todoId]} onNewItem={this.handleTodoUpdate}/>
                </div>}
            </Main>

          </div>  
        </div>
      </>
    );
  }
}

export default App;
