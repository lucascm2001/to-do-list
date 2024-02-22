import { Project } from './taskLogic.js';
import { projectOnViewport } from './newTaskScreen.js';
import { updateStorage } from './localStorage.js';


export let projects = [];
const defaultProject = new Project('Default Project');
projects.push(defaultProject);

export function setProjects(val) {
    projects = val;
}


// updates the list of projects
export function updateProjectView() {
    const wrapperProjectDiv = document.querySelector('.project-list');
    wrapperProjectDiv.textContent = 'Projects';

    for (let proj of projects) {
        const projectDiv = document.createElement('div');
        projectDiv.textContent = `${proj.title}\n`;
        projectDiv.addEventListener('click', () => projectOnViewport(proj));


        const projectEditButton = document.createElement('button');
        projectEditButton.textContent = 'Edit';
        projectEditButton.addEventListener('click', () => newProjectField(proj));

        const projectDeleteButton = document.createElement('button');
        projectDeleteButton.textContent = 'Delete';
        projectDeleteButton.addEventListener('click', () => deleteProject(proj));

        wrapperProjectDiv.appendChild(projectDiv);
        wrapperProjectDiv.appendChild(projectEditButton);
        wrapperProjectDiv.appendChild(projectDeleteButton);

    }
}
// deletes project from projects and updates viewport
function deleteProject(proj) {
    projects = projects.filter((project) => project !== proj);
    updateProjectView();
    // projectOnViewport(proj);
}

// brings up the field to make a new project
export function newProjectField(proj = null) {

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

    // if the project is being edited
    if (proj !== null) {
        titleInput.value = proj.title;
        submitButton.textContent = 'Edit Project';
    }

    submitButton.addEventListener('click', (event) => {

        event.preventDefault();

        // if project is being edited aka not new
        if (proj !== null) {
            proj.title = titleInput.value;
        } else {
            const newProject = new Project(titleInput.value);
            projects.push(newProject);
        }
        // also updates viewport

        updateProjectView();
        updateStorage();
        wrapper.textContent = '';
    });

    const cancelButton = document.createElement('button');
    cancelButton.setAttribute('id', 'cancel-project-field');
    cancelButton.textContent = 'Cancel';

    cancelButton.addEventListener('click', (event) => {
        event.preventDefault();

        wrapper.textContent = '';
    })

    form.appendChild(titleLabel);
    form.appendChild(titleInput);
    form.appendChild(submitButton);
    form.appendChild(cancelButton);

    wrapper.appendChild(form);

    titleInput.focus();

}

