import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ToDo from './modules/ToDo';
import * as serviceWorker from './serviceWorker';


const todos = [
  new ToDo(0, 'Work'),
  new ToDo(1, 'Chores'),
];
todos[0].addItem('Code');
todos[0].addItem('Attend meeting');
todos[0].addItem('Watch tutorial');
todos[0].addItem('Submit PR');
todos[0].addItem('A really long task I need to complete today before I leave work');
todos[1].addItem('Dishes');
todos[1].addItem('Mow lawn');
todos[1].addItem('Laundry');

ReactDOM.render(<App todos={todos} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
