const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage on page load
window.onload = function() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToDOM(task.text, task.completed);
    });
};

addTaskButton.addEventListener('click', function() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTaskToDOM(taskText, false);
        saveTaskToLocalStorage(taskText, false);
        taskInput.value = '';
    }
});

function addTaskToDOM(text, completed) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
    if (completed) taskItem.classList.add('completed');

    taskItem.innerHTML = `
        <span class="task-text">${text}</span>
        <button class="remove-task">Remove</button>
    `;

    taskItem.querySelector('.task-text').addEventListener('click', function() {
        taskItem.classList.toggle('completed');
        updateLocalStorage();
    });

    taskItem.querySelector('.remove-task').addEventListener('click', function() {
        taskList.removeChild(taskItem);
        updateLocalStorage();
    });

    taskList.appendChild(taskItem);
}

function saveTaskToLocalStorage(text, completed) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text, completed });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateLocalStorage() {
    const tasks = Array.from(taskList.children).map(item => {
        return {
            text: item.querySelector('.task-text').innerText,
            completed: item.classList.contains('completed')
        };
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}