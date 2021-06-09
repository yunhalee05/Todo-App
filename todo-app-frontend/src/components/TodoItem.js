import React, { useEffect, useState } from 'react'
import {FaTrashAlt,FaRegCircle,FaRegCheckCircle}  from "react-icons/fa";

function TodoItem(props) {
    const {emitDeleteTodoItem} = props;
    const [todoItem, setTodoItem] = useState(props.data);
    const [isModified, setIsModified] = useState(false)

    useEffect(() => {
        if(isModified){
            fetch(`http://localhost:8080/api/todoItems/${todoItem.id}`, {method:'PUT', headers:{'content-type' :' application/json'},body: JSON.stringify(todoItem)})
                .then(response=>response.json())
                .then(data=>{
                    setIsModified(false)
                    setTodoItem(data);
                })
        }
    }, [todoItem, isModified])

    const updateIsDone=()=>{
        setTodoItem({...todoItem, isDone: !todoItem.isDone})
        setIsModified(true);
    }

    const updateTask=(e)=>{
        setTodoItem({...todoItem, task: e.target.value});
        setIsModified(true);
        
    }
    const deleteTodoItem= (todoItem)=>{
        fetch(`http://localhost:8080/api/todoItems/${todoItem.id}`, {method:'DELETE', headers:{'content-type' :' application/json'}})
        .then(response=>
        emitDeleteTodoItem(todoItem)
        )

    }

    return(
       <div className="task">
        <input classname="task-check" type="checkbox" checked={todoItem.isDone} onChange={updateIsDone}  />{" "} 
        {
            todoItem.isDone? 
            <span className="finishedtask" >{todoItem.task}</span> :
            <input className="input" type="text" value = {todoItem.task} onChange={updateTask}/>
        }

        <FaTrashAlt className="icons" size="22" onClick={()=>deleteTodoItem(todoItem)}></FaTrashAlt>
       </div>
    );
};

export default TodoItem