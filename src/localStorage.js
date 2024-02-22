import { projectOnViewport } from './newTaskScreen';
import { projects, updateProjectView, setProjects } from './projects';

export function onPageLoad() {
    if (!localStorage.getItem('allProjects')) {
        updateStorage();
        // if there is no local storage, then populate it with what you want
    } else {
        // if there is local storage, update the page with stored values
        loadScreenFromStorage();
    }
}

export function updateStorage() {
    // save all projects in local storage
    localStorage.setItem('allProjects', stringify2(projects));

    const project = document.querySelector('h3').textContent;

    if (project != null) {
        const projectObject = projects.find((proj) => proj.title == project);
        localStorage.setItem('currentProject', stringify2(projectObject));
    }
}

function loadScreenFromStorage() {
    setProjects(JSON.parse(localStorage.getItem('allProjects')));
    updateProjectView();

    console.log(localStorage.getItem('currentProject'));
    if (localStorage.getItem('currentProject')) {
        const curProj = JSON.parse(localStorage.getItem('currentProject'));
        projectOnViewport(curProj);
        console.log(curProj);
    }

}
// eliminates having circular object in JSON error
function stringify2(obj) {
    let cache = [];
    let str = JSON.stringify(obj, function(key, value) {
      if (typeof value === "object" && value !== null) {
        if (cache.indexOf(value) !== -1) {
          // Circular reference found, discard key
          return;
        }
        // Store value in our collection
        cache.push(value);
      }
      return value;
    });
    cache = null; // reset the cache
    return str;
  }


// new project made needs to be sent to local storage
// one array that holds all the projects?

// need to store the projects we have which also includes the tasks
// need to remember the current project you were on too to display it.