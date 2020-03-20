import React from 'react';

function Todolist ({name}){
    return(
        <div>
            <header>
                <h1>{name}</h1>
            </header>            
            <input type="checkbox" id="item1" ></input>
            <label for="item1">Clean room</label>
        </div>
    );
}

export default Todolist;