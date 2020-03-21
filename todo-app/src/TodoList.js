import React from 'react';
import ToDoItem from "./ToDoItem";

function Todolist ({name, items}){
    return(
        <div>
            <header>
                <h1>{name}</h1>
            </header>

            {items.map((item,i) => 
                    <ToDoItem name={item} id={i}/>
                
            )}  

        </div>
    );
}

export default Todolist;