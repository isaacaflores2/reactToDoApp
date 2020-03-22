import React from 'react';
import './App.css';
import TodoList from './TodoList'
import SideNav from './SideNav';
import Todo from './modules/Todo';
import Header from './Header';

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
      todos: this.state.todos.concat(newTodo),
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
        <div className="container-fluid">
          <Header/>
          <div className="row">          
            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
              <SideNav todos={todos} onTodoSelect={this.handleNavSelect}/>
            </nav>
            <div className="col">
              {this.state.todos.length > 0 &&          
                  <div>              
                    <TodoList key={todoId} id={todoId} todo={todos[todoId]} onNewItem={this.handleTodoUpdate}/>
                  </div>
              }

              <form onSubmit={this.handleNewTodoList}>
                <label htmlFor="newTodoList"/>
                <input id="newTodoList" onChange={this.handleTodoNameChange} value={this.state.newTodoName}/>
                <button>Add list</button>
              </form>    
            </div>
          </div>  
        </div>
            
    );
  }
}

export default App;
