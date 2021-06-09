import React, { useEffect, useState } from 'react'
import TodoItem from '../components/TodoItem';

function LandingPage() {

  const [todoItems, setTodoItems] = useState(null)
  const [isModified, setIsModified] = useState(false)

  useEffect(() => {
    //do something on load
    console.log("Hey I've loaded up")
    if(!todoItems || isModified){
        fetch('http://localhost:8080/api/todoItems')
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
          setTodoItems(data); 
          setIsModified(false);
        })
    }

  }, [todoItems, isModified])

    const addNewTaskHandler = () =>{
        fetch('http://localhost:8080/api/todoItems', 
        {
            method:'POST',
            headers: {'content-type': 'application/json'}, 
        // body:JSON.stringify(requestBody)
        })
        .then(response=>response.json())
        .then(item=>{
        console.log(item);
        setIsModified(true);
        });
    }

    const deleteTodoItem= (id)=>{
        fetch(`http://localhost:8080/api/todoItems/${id}`, {method:'DELETE', headers:{'content-type' :' application/json'}})
        .then(data=>{
            setTodoItems(data);
        })
    }

    return (
        <div>
            <div>
                <h3>To Do List</h3>
                {todoItems && todoItems.map(todoItem=>
                    (
                        <div>
                            <TodoItem key = {todoItem.id} data = {todoItem} ></TodoItem>
                            <span style={{marginLeft:'2rem' , cursor:'pointer'}} onClick={deleteTodoItem(todoItem.id)}>🗑️</span>        
                        </div>
                    )
                )}
            </div>
            <div>
                <button onClick={addNewTaskHandler}> Add New Task </button>
            </div>
        </div>
    )
}

export default LandingPage
