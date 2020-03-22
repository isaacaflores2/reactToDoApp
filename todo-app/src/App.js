import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoList from './TodoList'
import SideNav from './SideNav';
import Todo from './modules/Todo';
import {Navbar, Container, Row, Col} from 'react-bootstrap';

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
        <>
        <Navbar bg="dark" variant="dark">
              <Navbar.Brand href="#home">To Do</Navbar.Brand>
        </Navbar>
        
        <Container fluid>
          <Row>
            <Col md="auto">
            <SideNav todos={todos} onTodoSelect={this.handleNavSelect}/>
              <form onSubmit={this.handleNewTodoList}>
                <label htmlFor="newTodoList"/>
                <input id="newTodoList" onChange={this.handleTodoNameChange} value={this.state.newTodoName}/>
                <button>Add list</button>
              </form> 
            </Col>          
            <Col>
              {this.state.todos.length > 0 &&          
                  <div>              
                    <TodoList key={todoId} id={todoId} todo={todos[todoId]} onNewItem={this.handleTodoUpdate}/>
                  </div>
              }                 
            </Col>
          </Row>  
        </Container>
        </>
    );
  }
}

export default App;
