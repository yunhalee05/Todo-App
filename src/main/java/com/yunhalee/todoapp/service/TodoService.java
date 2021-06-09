package com.yunhalee.todoapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yunhalee.todoapp.domain.TodoItem;
import com.yunhalee.todoapp.repository.TodoRepository;

@Service
public class TodoService {
	
	@Autowired
	private TodoRepository todoRepo;

	public List<TodoItem> fetchAllTodoItems(){
		return todoRepo.fetchAllTodoItems();
	}
	
	public TodoItem updateTodoItem(Integer id, TodoItem todoItem){
		Optional<TodoItem> todoOpt = todoRepo.fetchAllTodoItems()
											.stream()
											.filter(item-> item.getId().equals(id))
											.findAny();
		if(todoOpt.isPresent()) {
			TodoItem item = todoOpt.get();
			item.setIsDone(todoItem.getIsDone());
			item.setTask(todoItem.getTask());
			return item;
		}
		return null;
	}
	
	public TodoItem createTodoItem(String task) {
		TodoItem todoItem = new TodoItem();
		
		todoItem.setIsDone(false);
		todoItem.setTask(task);
		todoItem = todoRepo.save(todoItem);
		
		return todoItem;
	}
	
	public void deleteTodoItem(Integer id) {
		todoRepo.delete(id);
	}
}
