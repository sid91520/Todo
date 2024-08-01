document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form-todo');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const viewTasksBtn = document.getElementById('view-tasks-btn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const task = todoInput.value.trim();
        if (task) {
            addTask(task);
            saveTask(task);
            todoInput.value = '';
        }
    });

    viewTasksBtn.addEventListener('click', () => {
        displayTasks();
    });

    todoList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const taskItem = e.target.parentElement;
            const task = taskItem.firstChild.textContent;
            deleteTask(task);
            taskItem.remove();
        }
    });

    function addTask(task) {
        const li = document.createElement('li');
        li.textContent = task;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    }

    function saveTask(task) {
        let tasks = localStorage.getItem('tasks');
        if (!tasks) {
            tasks = [];
        } else {
            tasks = JSON.parse(tasks);
        }
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function deleteTask(task) {
        let tasks = localStorage.getItem('tasks');
        if (tasks) {
            tasks = JSON.parse(tasks);
            tasks = tasks.filter(t => t !== task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    function displayTasks() {
        todoList.innerHTML = '';
        let tasks = localStorage.getItem('tasks');
        if (tasks) {
            tasks = JSON.parse(tasks);
            tasks.forEach(task => addTask(task));
        }
    }
});
