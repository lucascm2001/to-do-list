import { Task, Project } from './taskLogic.js';

// view all projects

export let projects = [];
const defaultProject = new Project('Default Project');
projects.push(defaultProject);

export function updateProjectView() {

    const wrapperProjectDiv = document.querySelector('.project-list');
    wrapperProjectDiv.textContent = 'Projects';

    for (let proj of projects) {
        const projectDiv = document.createElement('div');
        projectDiv.textContent = `${proj.title}\n`;
        wrapperProjectDiv.appendChild(projectDiv);

        // add event listener for each div that brings up the nice viewport

        projectDiv.addEventListener('click', () => projectOnViewport(proj));
    }
}