import React from 'react';
import './App.css';
import './styles/dashboard.css';
import TodoList from './components/ToDoList/ToDoList';
import SideNav from './components/SideNav/SideNav';
import NavBar from './components/NavBar/NavBar';
import Main from './components/Main/Main';
import ToDo from './modules/Todo';

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

    const newTodo = new ToDo(
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
        <NavBar data-testid='navbar'/>

        <div className="container-fluid">
          <div className="row">
            <div className="col">

              <SideNav data-testid='sidenav' todos={todos} onTodoSelect={this.handleNavSelect}>
                <form onSubmit={this.handleNewTodoList}>
                  <label htmlFor="newTodoList"/>
                    <input className="form-control bg-transparent text-light" placeholder="My new ToDo list" id="newTodoList" onChange={this.handleTodoNameChange} value={this.state.newTodoName}/>
                  {/* <button className="">Add list</button> */}
                </form>
              </SideNav> 
            </div>

            <Main data-testid='main'>
              {this.state.todos.length > 0 &&          
                <div>              
                  <ToDoList key={todoId} id={todoId} todo={todos[todoId]} onNewItem={this.handleTodoUpdate}/>
                </div>}
            </Main>

          </div>  
        </div>
      </>
    );
  }
}

export default App;
