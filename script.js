// DOM Elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');

// Array to store tasks
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to save tasks to localStorage
const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateTaskCount();
};

// Function to update task count
const updateTaskCount = () => {
    const count = tasks.length;
    taskCount.textContent = `${count} ${count === 1 ? 'task' : 'tasks'}`;
};

// Function to create a new task element
const createTaskElement = (taskText, index) => {
    const li = document.createElement('li');
    li.className = 'task-item';
    
    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = taskText;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.onclick = () => deleteTask(index);
    
    li.appendChild(span);
    li.appendChild(deleteBtn);
    
    return li;
};

// Function to render tasks
const renderTasks = () => {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskElement = createTaskElement(task, index);
        taskList.appendChild(taskElement);
    });
    updateTaskCount();
};

// Function to add a new task
const addTask = () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push(taskText);
        saveTasks();
        renderTasks();
        taskInput.value = '';
        taskInput.focus();
    }
};

// Function to delete a task
const deleteTask = (index) => {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
};

// Event Listeners
addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Initial render
renderTasks();