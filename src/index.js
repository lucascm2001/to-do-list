import showNewTaskScreen from './newTask.js'

showNewTaskScreen();

let tasks = [];


class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.finished = false;
    }

    editTitle(newTitle) {
        this.title = newTitle;
    }

    editDescription(newDesc) {
        this.description = newDesc;
    }

    editDueDate(newDueDate) {
        this.dueDate = newDueDate;
    }

    addToProject(project) {
        project.listTodo.push(this);
    }

    deleteFromProject(project) {
        project.listTasks = project.listTasks.filter(task => this !== task);
    }

    taskFinished() {
        this.finished = true;
    }


}

// project should be an array perhaps, not a class

class Project {
    constructor(title, listTasks) {
        this.title = title;
        this.listTasks = listTasks;
    }
}

const newTaskButton = document.querySelector('#new-task');
const form = document.querySelector('#the-form');

newTaskButton.addEventListener('click', function (event) {

    event.preventDefault();
    // query for information for task
    const title = document.querySelector('#title').value;
    const desc = document.querySelector('#desc').value; 
    const date = document.querySelector('#date').value;
    const priority = document.querySelector('#priority').value;

    const newTask = new Task(title, desc, date, priority);
    tasks.push(newTask);
    taskToScreen(newTask);

    
});

function taskToScreen(task) {

    // needs edit button
    // needs finished button

    // click on a task and then you can edit its contents

    const taskView = document.querySelector('.tasks');

    const wrapper = document.createElement('div');

    // clicking each element will turn it into an input element to change
    const p = document.createElement('p');
    p.textContent = `title: ${task.title}
                     desc:  ${task.description}\n
                     Due date: ${task.dueDate}\n`;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit Task';
    // click button make a dropdown
    editButton.addEventListener('click', (task) => editDropdown(task));

    wrapper.appendChild(p);
    wrapper.appendChild(editButton);
    taskView.appendChild(wrapper);
}

function editDropdown(task) {
    // create dropdown for editing and change the task object
}



// change title
// place it into a project
// edit todos
// delete todo