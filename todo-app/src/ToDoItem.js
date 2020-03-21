import React from "react";

function ToDoItem ({name, id}){
    return (
        <div>          
            <input type="checkbox" id={id} value={name}></input>
            <label htmlFor={name}>{name}</label>
        </div>
    )
}

export default ToDoItem;