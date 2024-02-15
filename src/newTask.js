


export default function showNewTaskScreen() {

    const newTaskButton = document.querySelector('#new-task');

    newTaskButton.addEventListener('click', createInputField);
}

function createInputField() {
    const wrapper = document.querySelector('.new-task-questions');

    const form = document.createElement('form');
    form.setAttribute('action', '');
    form.setAttribute('method', 'get');
    form.setAttribute('id', 'the-form');

    const titleLabel = document.createElement('label');
    titleLabel.setAttribute('for', 'title');
    titleLabel.textContent = 'Title';
    const titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('name', 'title');
    titleInput.setAttribute('id', 'title');

    const descLabel = document.createElement('label');
    descLabel.setAttribute('for', 'desc');
    descLabel.textContent = 'Description';
    const descInput = document.createElement('input');
    descInput.setAttribute('type', 'text');
    descInput.setAttribute('name', 'desc');
    descInput.setAttribute('id', 'desc');

    const dateLabel = document.createElement('label');
    dateLabel.setAttribute('for', 'date');
    dateLabel.textContent = 'Due Date';
    const dateInput = document.createElement('input');
    dateInput.setAttribute('type', 'date');
    dateInput.setAttribute('name', 'date');
    dateInput.setAttribute('id', 'date');

    const submitButton = document.createElement('button');
    submitButton.setAttribute('id', 'new-task');
    submitButton.textContent = 'Create New Task';

    form.appendChild(titleLabel);
    form.appendChild(titleInput);
    form.appendChild(descLabel);
    form.appendChild(descInput);
    form.appendChild(dateLabel);
    form.appendChild(dateInput);
    form.appendChild(submitButton);

    wrapper.appendChild(form);
}

// when clicking Create new task, delete input form and add new task

/*
<form action="" method="get" id="the-form">

            <label for="title">Title</label>
            <input type="text" name="title" id="title">

            <label for="desc">Description</label>
            <input type="text" name="desc" id="desc">

            <label for="date">Due Date</label>
            <input type="date" name="date" id="date">

            <label for="priority">Priority</label>
            <input type="range" name="priority" id="priority">

            <button id="new-task">Create New Task</button>
        </form>
*/