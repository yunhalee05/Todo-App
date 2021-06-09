import './App.css';
import React, { useEffect, useState } from 'react';
import TodoItem from './components/TodoItem';

function App() {

  const [todoItems, setTodoItems] = useState(null)
  const [newtask, setNewtask] = useState("")

  useEffect(() => {
    //do something on load
    console.log("Hey I've loaded up")
    if(!todoItems ){
      fetch('http://localhost:8080/api/todoItems').then(response=>response.json())
        .then(data=>{
          console.log("Todo items list : ",data);
          setTodoItems(data); 
        })
    }
  }, [todoItems])

  const addNewTaskHandler = (newtask) =>{
    if(newtask ===""){
      alert('Task must be written.')
      return;
    }
    fetch('http://localhost:8080/api/todoItems', {
        method:'POST',
        headers: {'content-type': 'application/json'}, 
        body:JSON.stringify(newtask)
      }).then(response=>response.json())
      .then(aTodoItem=>{
        console.log(aTodoItem);
        setTodoItems([...todoItems, aTodoItem]);
        setNewtask("");
      });

  }

  const deleteTodoItemHandler= (item)=>{
    const updatedTodoItems = todoItems.filter(x=>x.id!==item.id);
    setTodoItems([...updatedTodoItems])
  }

  
  return (
    <div className="todo-box">
      <h1>To Do List</h1>
      <div>
      {todoItems && todoItems.map(todoItem=>{
          return <TodoItem key = {todoItem.id} data = {todoItem} emitDeleteTodoItem = {deleteTodoItemHandler}> </TodoItem>
            })}
      </div>
      <div className="newtask"> 
        <input className="inputnew" type="text" value={newtask} onChange={(e)=> setNewtask(e.target.value)} />&nbsp;&nbsp;&nbsp;&nbsp;
        <button className="primary" onClick={() => addNewTaskHandler(newtask)}>Add</button>
      </div>
    </div>
  )
}

export default App;
