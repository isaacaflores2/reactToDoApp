import React from 'react';
import './App.css';
import TodoList from './TodoList'

class App extends React.Component{

  constructor(props){
    super(props);
    this.handleTodoNameChange = this.handleTodoNameChange.bind(this);
    this.handleNewTodoList = this.handleNewTodoList.bind(this);
    this.state = {todos: [], newTodoName: ''};
  }

  handleTodoNameChange(event){
    this.setState({newTodoName: event.target.value});
  }

  handleNewTodoList(event){
    event.preventDefault();
    const newTodoListName = this.state.newTodoName;
    this.setState(state => ({
      todos: this.state.todos.concat(newTodoListName),
      newTodoName: ''
    }));
  }

  render(){
    const todos = this.state.todos;
    return (
      <div className="App">
        {todos.map(todoName => 
          <TodoList key={todoName} name={todoName}/>
        )}

        <form onSubmit={this.handleNewTodoList}>
          <label htmlFor="newTodoList"/>
          <input id="newTodoList" onChange={this.handleTodoNameChange} value={this.state.newTodoName}/>
          <button>Add list</button>
        </form>        
      </div>
      
    );
  }
}

export default App;
