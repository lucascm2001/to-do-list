import { Task } from './taskLogic.js';
import { projects, updateProjectView, newProjectField } from './projects.js'
import { onPageLoad, updateStorage } from './localStorage.js';
// can't click new task multiple times if already open
// do the localStorage
// Time to fix the UI!!
// consolidate buttons into one thingy
// order tasks by date and priority (star versus no star)


export default function showProjectView() {

    onPageLoad();

    updateProjectView();

    const newProjectButton = document.querySelector('#new-project');
    newProjectButton.addEventListener('click', () => { newProjectField() });

}

// maybe have an updateviewport function whenever anything happens

// display clicked project to the viewport
export function projectOnViewport(project) {


    const mainViewport = document.querySelector('#main-viewport');
    mainViewport.textContent = '';

    const projectHeader = document.createElement('h3');
    projectHeader.textContent = `${project.title}`;

    // display tasks and new task button below project title
    const tasksInProject = document.createElement('div');

    for (let task of project.listTasks) {
        const taskDiv = createTaskForScreen(task);
        tasksInProject.appendChild(taskDiv);
    }

    // display tasks already in this project


    const newTaskButton = document.createElement('button');
    newTaskButton.setAttribute('id', 'new-task');
    newTaskButton.textContent = 'Add Task';
    newTaskButton.addEventListener('click', () => { 

        const taskQuestions = createInputField();
        newTaskButton.insertAdjacentElement('beforebegin', taskQuestions);
        document.querySelector('#title').focus();
    });

    mainViewport.appendChild(projectHeader);
    mainViewport.appendChild(tasksInProject);
    mainViewport.appendChild(newTaskButton);

    updateStorage();
}


function createTaskForScreen(task, wrapper = null) {

    if (wrapper == null) {
        wrapper = document.createElement('div');
    }

    const p = document.createElement('p');
    p.textContent = `title: ${task.title}
                     desc:  ${task.description}\n
                     Due date: ${task.dueDate}\n`;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit Task';

    editButton.addEventListener('click', () => {
        const taskInputField = createInputField(task, wrapper);
        wrapper.insertAdjacentElement('beforebegin', taskInputField);
        wrapper.textContent = '';
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        task.project.listTasks = task.project.listTasks.filter((t) => task !== t);
        projectOnViewport(task.project);
    })

    wrapper.appendChild(p);
    wrapper.appendChild(editButton);
    wrapper.appendChild(deleteButton);

    return wrapper;
}



// make it work for editing too
function createInputField(task = null, outerDiv = null) {

    const wrapper = document.createElement('div');
    wrapper.setAttribute('id', 'new-task-questions');

    const form = document.createElement('form');
    form.setAttribute('action', '');
    form.setAttribute('method', 'get');
    form.setAttribute('id', 'task-form');

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
    submitButton.setAttribute('id', 'create-new-task');
    submitButton.textContent = 'Create New Task';

    if (task != null) {

        titleInput.value = task.title;
        descInput.value = task.description;
        dateInput.value = task.dueDate;
        //projectInput.value = task.project.title;

        submitButton.textContent = 'Edit Task';
    }

    submitButton.addEventListener('click', (event) => {

        event.preventDefault();

        const title = document.querySelector('#title').value;
        const desc = document.querySelector('#desc').value; 
        const date = document.querySelector('#date').value;
        const project = document.querySelector('h3').textContent;

        const projectObject = projects.find((proj) => proj.title == project);


        if (task == null) {
            const newTask = new Task(title, desc, date, projectObject);
            projectObject.listTasks.push(newTask);
            projectOnViewport(projectObject);

        } else {
            task.editTitle(title);
            task.editDescription(desc);
            task.editDueDate(date);
            //task.editProject(projectObject);
            createTaskForScreen(task, outerDiv);
        }

        updateStorage();

        wrapper.textContent = '';
    });

    const cancelButton = document.createElement('button');
    cancelButton.setAttribute('id', 'cancel-project-field');
    cancelButton.textContent = 'Cancel';

    cancelButton.addEventListener('click', (event) => {
        event.preventDefault();

        wrapper.textContent = '';
        wrapper.remove();
        if (task !== null) { createTaskForScreen(task, outerDiv); }
    });

    form.appendChild(titleLabel);
    form.appendChild(titleInput);
    form.appendChild(descLabel);
    form.appendChild(descInput);
    form.appendChild(dateLabel);
    form.appendChild(dateInput);
    form.appendChild(submitButton);
    form.appendChild(cancelButton);

    wrapper.appendChild(form);

    return wrapper;
}
