import { Task, Project } from './taskLogic.js';
import { projects, updateProjectView } from './projects.js'

// create a common viewport. use it to view current project



export default function showNewTaskScreen() {

    updateProjectView();

    const newProjectButton = document.querySelector('#new-project');
    newProjectButton.addEventListener('click', () => { newProjectField() });

}

// display clicked project to the viewport
function projectOnViewport(project) {


    const mainViewport = document.querySelector('#main-viewport');
    mainViewport.textContent = '';

    const projectHeader = document.createElement('h3');
    projectHeader.textContent = `${project.title}`;

    // display tasks and new task button below project title
    const tasksInProject = document.createElement('div');

    for (let task of project.listTasks) {
        const taskDiv = createTaskForScreen(task);
        console.log(taskDiv);
        tasksInProject.appendChild(taskDiv);
    }

    // display tasks already in this project


    const newTaskButton = document.createElement('button');
    newTaskButton.setAttribute('id', 'new-task');
    newTaskButton.textContent = 'Add Task';
    newTaskButton.addEventListener('click', () => { 

        const taskQuestions = createInputField();
        newTaskButton.insertAdjacentElement('beforebegin', taskQuestions);
    });

    mainViewport.appendChild(projectHeader);
    mainViewport.appendChild(tasksInProject);
    mainViewport.appendChild(newTaskButton);


}

function createTaskForScreen(task) {

    const wrapper = document.createElement('div');

    const p = document.createElement('p');
    p.textContent = `title: ${task.title}
                     desc:  ${task.description}\n
                     Due date: ${task.dueDate}\n`;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit Task';

    editButton.addEventListener('click', () => { 
        // grab div around it
        createInputField(task, wrapper);  //wrapper

        // need to reference the original div for the task
    });

    wrapper.appendChild(p);
    wrapper.appendChild(editButton);

    return wrapper;
}

function newProjectField() {
    // ask for name of project.

    // add any existing tasks to project

    const wrapper = document.querySelector('.new-project-questions');

    const form = document.createElement('form');
    form.setAttribute('action', '');
    form.setAttribute('method', 'get');
    form.setAttribute('id', 'project-form');

    const titleLabel = document.createElement('label');
    titleLabel.setAttribute('for', 'title');
    titleLabel.textContent = 'Title';
    const titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('name', 'title');
    titleInput.setAttribute('id', 'title');

    const submitButton = document.createElement('button');
    submitButton.setAttribute('id', 'create-new-project');
    submitButton.textContent = 'Create New Project';

    submitButton.addEventListener('click', (event) => {

        event.preventDefault();

        const title = document.querySelector('#title').value;
        const newProject = new Project(title);
        projects.push(newProject);
        updateProjectView();

    
        // clear this form, submit this to the logic and the screen

        // clearing input field
        wrapper.textContent = '';
    });

    form.appendChild(titleLabel);
    form.appendChild(titleInput);
    form.appendChild(submitButton);

    wrapper.appendChild(form);



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

    const projectLabel = document.createElement('label');
    projectLabel.setAttribute('for', 'projects');
    projectLabel.textContent = 'Project';

    const projectInput = document.createElement('select');
    projectInput.setAttribute('name', 'projects');
    projectInput.setAttribute('id', 'projects');

    for (let project of projects) {
        const option = document.createElement('option');
        option.setAttribute('value', project.title);
        option.textContent = `${project.title}`;
        projectInput.appendChild(option);
    }
    

    const submitButton = document.createElement('button');
    submitButton.setAttribute('id', 'create-new-task');
    submitButton.textContent = 'Create New Task';

    if (task != null) {

        titleInput.value = task.title;
        descInput.value = task.description;
        dateInput.value = task.dueDate;
        projectInput.value = task.project.title;

        submitButton.textContent = 'Edit Task';
    }

    submitButton.addEventListener('click', (event) => {

        event.preventDefault();

        const title = document.querySelector('#title').value;
        const desc = document.querySelector('#desc').value; 
        const date = document.querySelector('#date').value;
        const project = document.querySelector('#projects').value;

        const projectObject = projects.find((proj) => proj.title == project);


        if (task == null) {
            const newTask = new Task(title, desc, date, projectObject);
            projectObject.listTasks.push(newTask);
            //newTask.addToProject(project);
            // FIX THIS LINE RIGHT HERE, TASK TO COME ABOVE BUTTON
            projectOnViewport(projectObject);

        } else {
            task.editTitle(title);
            task.editDescription(desc);
            task.editDueDate(date);
            //task.editProject(projectObject);
            editTaskToScreen(task, outerDiv);
        }

        wrapper.textContent = '';
    });

    form.appendChild(titleLabel);
    form.appendChild(titleInput);
    form.appendChild(descLabel);
    form.appendChild(descInput);
    form.appendChild(dateLabel);
    form.appendChild(dateInput);
    form.appendChild(projectLabel);
    form.appendChild(projectInput);
    form.appendChild(submitButton);

    wrapper.appendChild(form);

    return wrapper;
}

function editTaskToScreen(task, wrapper) {
    
    wrapper.children[0].textContent = `title: ${task.title}
    desc:  ${task.description}\n
    Due date: ${task.dueDate}\n`;
}
