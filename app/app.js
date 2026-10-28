document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const errorMsg = document.getElementById('error-msg');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function showError(message) {
        errorMsg.textContent = message;
        errorMsg.hidden = false;
    }

    function clearError() {
        errorMsg.textContent = '';
        errorMsg.hidden = true;
    }

    function renderTasks() {
        taskList.innerHTML = '';
        
        if (tasks.length === 0) {
            return;
        }

        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            
            const divContent = document.createElement('div');
            divContent.className = 'task-content';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.setAttribute('aria-label', `Marcar "${task.text}" como completada`);
            checkbox.addEventListener('change', () => {
                toggleTaskCompletion(index);
            });

            const span = document.createElement('span');
            span.textContent = task.text;

            divContent.appendChild(checkbox);
            divContent.appendChild(span);

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'Eliminar';
            deleteBtn.setAttribute('aria-label', `Eliminar tarea "${task.text}"`);
            deleteBtn.addEventListener('click', () => {
                deleteTask(index);
            });

            li.appendChild(divContent);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }

    function addTask(text) {
        tasks.push({ text: text.trim(), completed: false });
        saveTasks();
        renderTasks();
    }

    function toggleTaskCompletion(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = taskInput.value.trim();

        if (text === '') {
            showError('La tarea no puede estar vacía.');
            taskInput.focus();
            return;
        }

        clearError();
        addTask(text);
        taskInput.value = '';
        taskInput.focus();
    });

    // Render inicial
    renderTasks();
});
