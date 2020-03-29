import React from 'react';
import './App.css';
import './styles/dashboard.css';
import ToDoList from './components/ToDoList/ToDoList';
import SideNav from './components/SideNav/SideNav';
import NavBar from './components/NavBar/NavBar';
import Main from './components/Main/Main';
import ToDo from './modules/ToDo';
import PropTypes from 'prop-types';


class App extends React.Component{

  constructor(props){
    super(props);
    this.handleTodoNameChange = this.handleTodoNameChange.bind(this);
    this.handleNewTodoList = this.handleNewTodoList.bind(this);
    this.handleTodoItemAdd = this.handleTodoItemAdd.bind(this);
    this.handleTodoItemRemove = this.handleTodoItemRemove.bind(this);
    this.handleNavSelect = this.handleNavSelect.bind(this);
    
    this.state = {todos: this.props.todos, todoToDisplayId: 0, newTodoName: ''};
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

  handleTodoItemAdd(todoListId, value){    
    const updatedTodos = this.state.todos;
    updatedTodos[todoListId].addItem(value);
    this.setState({todos: updatedTodos});
  }

  handleTodoItemRemove(todoListId, itemId){    
    const updatedTodos = this.state.todos;
    updatedTodos[todoListId].removeItem(itemId);
    this.setState({todos: updatedTodos});
  }

  render(){
    const todos = this.state.todos;
    const todoId = this.state.todoToDisplayId;

    return (
      <>
        <NavBar/>

        <div className="container-fluid">
          <div className="row">
            <div className="col">

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
                  <ToDoList key={todoId} id={todoId} todo={todos[todoId]} onNewItem={this.handleTodoItemAdd} onRemoveItem={this.handleTodoItemRemove}/>
                </div>}
            </Main>

          </div>  
        </div>
      </>
    );
  }
}

App.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.instanceOf(ToDo)).isRequired
};

export default App;
