import React from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from './TodoList'

function App ({items}){
    return (
      <div className="App">
        <TodoList name="My Chores" items={items}/>
      </div>
      
    );
}

export default App;
