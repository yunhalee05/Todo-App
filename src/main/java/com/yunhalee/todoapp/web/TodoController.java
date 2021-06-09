package com.yunhalee.todoapp.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.yunhalee.todoapp.domain.TodoItem;
import com.yunhalee.todoapp.service.TodoService;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class TodoController {
	
	//front-end ---> java-server
	//HttpRequest ---> Controller --->Service ---> Repository
	//front-end <--- Controller <--- Service <--- Repository   
	
	@Autowired
	private TodoService todoService;
	
	//fetch all todo items (from database)
	@GetMapping("/api/todoItems")
	public ResponseEntity<?> fetchAllTodoItems(){
		List <TodoItem> todoItems = todoService.fetchAllTodoItems();
		
		return ResponseEntity.status(HttpStatus.OK).body(todoItems);
		
	}
	
	@PostMapping("/api/todoItems")
	public ResponseEntity<?> createNewTodoItem(@RequestBody String task){
		TodoItem todoItem = todoService.createTodoItem(task);
		return ResponseEntity.ok(todoItem);
		
	}
	
	 
	@PutMapping("/api/todoItems/{id}")
	public ResponseEntity<?> updateTodoItem(@PathVariable Integer id, @RequestBody TodoItem todoItem){
		TodoItem updatedTodoItem = todoService.updateTodoItem(id, todoItem);
		return ResponseEntity.ok(updatedTodoItem);
	}
	
	@DeleteMapping("/api/todoItems/{id}")
	public ResponseEntity<?> deleteTodoItem(@PathVariable Integer id){
		todoService.deleteTodoItem(id);
		return ResponseEntity.ok("ok");
	}

}
