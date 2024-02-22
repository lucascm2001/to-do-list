/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/localStorage.js":
/*!*****************************!*\
  !*** ./src/localStorage.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   onPageLoad: () => (/* binding */ onPageLoad),
/* harmony export */   updateStorage: () => (/* binding */ updateStorage)
/* harmony export */ });
/* harmony import */ var _newTaskScreen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./newTaskScreen */ "./src/newTaskScreen.js");
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects */ "./src/projects.js");



function onPageLoad() {
    if (!localStorage.getItem('allProjects')) {
        updateStorage();
        // if there is no local storage, then populate it with what you want
    } else {
        // if there is local storage, update the page with stored values
        loadScreenFromStorage();
    }
}

function updateStorage() {
    // save all projects in local storage
    localStorage.setItem('allProjects', stringify2(_projects__WEBPACK_IMPORTED_MODULE_1__.projects));

    const project = document.querySelector('h3').textContent;

    if (project != null) {
        const projectObject = _projects__WEBPACK_IMPORTED_MODULE_1__.projects.find((proj) => proj.title == project);
        localStorage.setItem('currentProject', stringify2(projectObject));
    }
}

function loadScreenFromStorage() {
    (0,_projects__WEBPACK_IMPORTED_MODULE_1__.setProjects)(JSON.parse(localStorage.getItem('allProjects')));
    (0,_projects__WEBPACK_IMPORTED_MODULE_1__.updateProjectView)();

    console.log(localStorage.getItem('currentProject'));
    if (localStorage.getItem('currentProject')) {
        const curProj = JSON.parse(localStorage.getItem('currentProject'));
        (0,_newTaskScreen__WEBPACK_IMPORTED_MODULE_0__.projectOnViewport)(curProj);
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

/***/ }),

/***/ "./src/newTaskScreen.js":
/*!******************************!*\
  !*** ./src/newTaskScreen.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ showProjectView),
/* harmony export */   projectOnViewport: () => (/* binding */ projectOnViewport)
/* harmony export */ });
/* harmony import */ var _taskLogic_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./taskLogic.js */ "./src/taskLogic.js");
/* harmony import */ var _projects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects.js */ "./src/projects.js");
/* harmony import */ var _localStorage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./localStorage.js */ "./src/localStorage.js");



// can't click new task multiple times if already open
// do the localStorage
// Time to fix the UI!!
// consolidate buttons into one thingy
// order tasks by date and priority (star versus no star)


function showProjectView() {

    (0,_localStorage_js__WEBPACK_IMPORTED_MODULE_2__.onPageLoad)();

    (0,_projects_js__WEBPACK_IMPORTED_MODULE_1__.updateProjectView)();

    const newProjectButton = document.querySelector('#new-project');
    newProjectButton.addEventListener('click', () => { (0,_projects_js__WEBPACK_IMPORTED_MODULE_1__.newProjectField)() });

}

// maybe have an updateviewport function whenever anything happens

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

    (0,_localStorage_js__WEBPACK_IMPORTED_MODULE_2__.updateStorage)();
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

        const projectObject = _projects_js__WEBPACK_IMPORTED_MODULE_1__.projects.find((proj) => proj.title == project);


        if (task == null) {
            const newTask = new _taskLogic_js__WEBPACK_IMPORTED_MODULE_0__.Task(title, desc, date, projectObject);
            projectObject.listTasks.push(newTask);
            projectOnViewport(projectObject);

        } else {
            task.editTitle(title);
            task.editDescription(desc);
            task.editDueDate(date);
            //task.editProject(projectObject);
            createTaskForScreen(task, outerDiv);
        }

        (0,_localStorage_js__WEBPACK_IMPORTED_MODULE_2__.updateStorage)();

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


/***/ }),

/***/ "./src/projects.js":
/*!*************************!*\
  !*** ./src/projects.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   newProjectField: () => (/* binding */ newProjectField),
/* harmony export */   projects: () => (/* binding */ projects),
/* harmony export */   setProjects: () => (/* binding */ setProjects),
/* harmony export */   updateProjectView: () => (/* binding */ updateProjectView)
/* harmony export */ });
/* harmony import */ var _taskLogic_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./taskLogic.js */ "./src/taskLogic.js");
/* harmony import */ var _newTaskScreen_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./newTaskScreen.js */ "./src/newTaskScreen.js");
/* harmony import */ var _localStorage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./localStorage.js */ "./src/localStorage.js");





let projects = [];
const defaultProject = new _taskLogic_js__WEBPACK_IMPORTED_MODULE_0__.Project('Default Project');
projects.push(defaultProject);

function setProjects(val) {
    projects = val;
}


// updates the list of projects
function updateProjectView() {
    const wrapperProjectDiv = document.querySelector('.project-list');
    wrapperProjectDiv.textContent = 'Projects';

    for (let proj of projects) {
        const projectDiv = document.createElement('div');
        projectDiv.textContent = `${proj.title}\n`;
        projectDiv.addEventListener('click', () => (0,_newTaskScreen_js__WEBPACK_IMPORTED_MODULE_1__.projectOnViewport)(proj));


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
function newProjectField(proj = null) {

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
            const newProject = new _taskLogic_js__WEBPACK_IMPORTED_MODULE_0__.Project(titleInput.value);
            projects.push(newProject);
        }
        // also updates viewport

        updateProjectView();
        (0,_localStorage_js__WEBPACK_IMPORTED_MODULE_2__.updateStorage)();
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



/***/ }),

/***/ "./src/taskLogic.js":
/*!**************************!*\
  !*** ./src/taskLogic.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Project: () => (/* binding */ Project),
/* harmony export */   Task: () => (/* binding */ Task)
/* harmony export */ });
class Task {

    constructor(title, description, dueDate, project) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.project = project;

        this.priority = 1;
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


    editProject(newProj) {
        this.project.listTasks = this.project.listTasks.filter(task => this !== task);
        this.project = newProj;
        this.project.listTasks.push(this);
        
    }
    addToProject(project) {
        this.project = project;
        this.project.listTasks.push(this);
    }

    taskFinished() {
        this.finished = true;
    }


}

// project should be an array perhaps, not a class

class Project {
    constructor(title) {
        this.title = title;
        this.listTasks = [];
    }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _newTaskScreen_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./newTaskScreen.js */ "./src/newTaskScreen.js");


(0,_newTaskScreen_js__WEBPACK_IMPORTED_MODULE_0__["default"])();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFVO0FBQ1YsbUNBQW1DLGtEQUFPO0FBQzFDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVEsK0RBQWE7QUFDckI7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoSE87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7VUNsREE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05pRDs7QUFFakQsNkRBQWUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2xvY2FsU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL25ld1Rhc2tTY3JlZW4uanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3Rhc2tMb2dpYy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwcm9qZWN0T25WaWV3cG9ydCB9IGZyb20gJy4vbmV3VGFza1NjcmVlbic7XG5pbXBvcnQgeyBwcm9qZWN0cywgdXBkYXRlUHJvamVjdFZpZXcsIHNldFByb2plY3RzIH0gZnJvbSAnLi9wcm9qZWN0cyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBvblBhZ2VMb2FkKCkge1xuICAgIGlmICghbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FsbFByb2plY3RzJykpIHtcbiAgICAgICAgdXBkYXRlU3RvcmFnZSgpO1xuICAgICAgICAvLyBpZiB0aGVyZSBpcyBubyBsb2NhbCBzdG9yYWdlLCB0aGVuIHBvcHVsYXRlIGl0IHdpdGggd2hhdCB5b3Ugd2FudFxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGlmIHRoZXJlIGlzIGxvY2FsIHN0b3JhZ2UsIHVwZGF0ZSB0aGUgcGFnZSB3aXRoIHN0b3JlZCB2YWx1ZXNcbiAgICAgICAgbG9hZFNjcmVlbkZyb21TdG9yYWdlKCk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlU3RvcmFnZSgpIHtcbiAgICAvLyBzYXZlIGFsbCBwcm9qZWN0cyBpbiBsb2NhbCBzdG9yYWdlXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FsbFByb2plY3RzJywgc3RyaW5naWZ5Mihwcm9qZWN0cykpO1xuXG4gICAgY29uc3QgcHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gzJykudGV4dENvbnRlbnQ7XG5cbiAgICBpZiAocHJvamVjdCAhPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IHByb2plY3RPYmplY3QgPSBwcm9qZWN0cy5maW5kKChwcm9qKSA9PiBwcm9qLnRpdGxlID09IHByb2plY3QpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VycmVudFByb2plY3QnLCBzdHJpbmdpZnkyKHByb2plY3RPYmplY3QpKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGxvYWRTY3JlZW5Gcm9tU3RvcmFnZSgpIHtcbiAgICBzZXRQcm9qZWN0cyhKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhbGxQcm9qZWN0cycpKSk7XG4gICAgdXBkYXRlUHJvamVjdFZpZXcoKTtcblxuICAgIGNvbnNvbGUubG9nKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50UHJvamVjdCcpKTtcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRQcm9qZWN0JykpIHtcbiAgICAgICAgY29uc3QgY3VyUHJvaiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRQcm9qZWN0JykpO1xuICAgICAgICBwcm9qZWN0T25WaWV3cG9ydChjdXJQcm9qKTtcbiAgICAgICAgY29uc29sZS5sb2coY3VyUHJvaik7XG4gICAgfVxuXG59XG4vLyBlbGltaW5hdGVzIGhhdmluZyBjaXJjdWxhciBvYmplY3QgaW4gSlNPTiBlcnJvclxuZnVuY3Rpb24gc3RyaW5naWZ5MihvYmopIHtcbiAgICBsZXQgY2FjaGUgPSBbXTtcbiAgICBsZXQgc3RyID0gSlNPTi5zdHJpbmdpZnkob2JqLCBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIGlmIChjYWNoZS5pbmRleE9mKHZhbHVlKSAhPT0gLTEpIHtcbiAgICAgICAgICAvLyBDaXJjdWxhciByZWZlcmVuY2UgZm91bmQsIGRpc2NhcmQga2V5XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFN0b3JlIHZhbHVlIGluIG91ciBjb2xsZWN0aW9uXG4gICAgICAgIGNhY2hlLnB1c2godmFsdWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0pO1xuICAgIGNhY2hlID0gbnVsbDsgLy8gcmVzZXQgdGhlIGNhY2hlXG4gICAgcmV0dXJuIHN0cjtcbiAgfVxuXG5cbi8vIG5ldyBwcm9qZWN0IG1hZGUgbmVlZHMgdG8gYmUgc2VudCB0byBsb2NhbCBzdG9yYWdlXG4vLyBvbmUgYXJyYXkgdGhhdCBob2xkcyBhbGwgdGhlIHByb2plY3RzP1xuXG4vLyBuZWVkIHRvIHN0b3JlIHRoZSBwcm9qZWN0cyB3ZSBoYXZlIHdoaWNoIGFsc28gaW5jbHVkZXMgdGhlIHRhc2tzXG4vLyBuZWVkIHRvIHJlbWVtYmVyIHRoZSBjdXJyZW50IHByb2plY3QgeW91IHdlcmUgb24gdG9vIHRvIGRpc3BsYXkgaXQuIiwiaW1wb3J0IHsgVGFzayB9IGZyb20gJy4vdGFza0xvZ2ljLmpzJztcbmltcG9ydCB7IHByb2plY3RzLCB1cGRhdGVQcm9qZWN0VmlldywgbmV3UHJvamVjdEZpZWxkIH0gZnJvbSAnLi9wcm9qZWN0cy5qcydcbmltcG9ydCB7IG9uUGFnZUxvYWQsIHVwZGF0ZVN0b3JhZ2UgfSBmcm9tICcuL2xvY2FsU3RvcmFnZS5qcyc7XG4vLyBjYW4ndCBjbGljayBuZXcgdGFzayBtdWx0aXBsZSB0aW1lcyBpZiBhbHJlYWR5IG9wZW5cbi8vIGRvIHRoZSBsb2NhbFN0b3JhZ2Vcbi8vIFRpbWUgdG8gZml4IHRoZSBVSSEhXG4vLyBjb25zb2xpZGF0ZSBidXR0b25zIGludG8gb25lIHRoaW5neVxuLy8gb3JkZXIgdGFza3MgYnkgZGF0ZSBhbmQgcHJpb3JpdHkgKHN0YXIgdmVyc3VzIG5vIHN0YXIpXG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2hvd1Byb2plY3RWaWV3KCkge1xuXG4gICAgb25QYWdlTG9hZCgpO1xuXG4gICAgdXBkYXRlUHJvamVjdFZpZXcoKTtcblxuICAgIGNvbnN0IG5ld1Byb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV3LXByb2plY3QnKTtcbiAgICBuZXdQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4geyBuZXdQcm9qZWN0RmllbGQoKSB9KTtcblxufVxuXG4vLyBtYXliZSBoYXZlIGFuIHVwZGF0ZXZpZXdwb3J0IGZ1bmN0aW9uIHdoZW5ldmVyIGFueXRoaW5nIGhhcHBlbnNcblxuLy8gZGlzcGxheSBjbGlja2VkIHByb2plY3QgdG8gdGhlIHZpZXdwb3J0XG5leHBvcnQgZnVuY3Rpb24gcHJvamVjdE9uVmlld3BvcnQocHJvamVjdCkge1xuXG5cbiAgICBjb25zdCBtYWluVmlld3BvcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbi12aWV3cG9ydCcpO1xuICAgIG1haW5WaWV3cG9ydC50ZXh0Q29udGVudCA9ICcnO1xuXG4gICAgY29uc3QgcHJvamVjdEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgcHJvamVjdEhlYWRlci50ZXh0Q29udGVudCA9IGAke3Byb2plY3QudGl0bGV9YDtcblxuICAgIC8vIGRpc3BsYXkgdGFza3MgYW5kIG5ldyB0YXNrIGJ1dHRvbiBiZWxvdyBwcm9qZWN0IHRpdGxlXG4gICAgY29uc3QgdGFza3NJblByb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIGZvciAobGV0IHRhc2sgb2YgcHJvamVjdC5saXN0VGFza3MpIHtcbiAgICAgICAgY29uc3QgdGFza0RpdiA9IGNyZWF0ZVRhc2tGb3JTY3JlZW4odGFzayk7XG4gICAgICAgIHRhc2tzSW5Qcm9qZWN0LmFwcGVuZENoaWxkKHRhc2tEaXYpO1xuICAgIH1cblxuICAgIC8vIGRpc3BsYXkgdGFza3MgYWxyZWFkeSBpbiB0aGlzIHByb2plY3RcblxuXG4gICAgY29uc3QgbmV3VGFza0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIG5ld1Rhc2tCdXR0b24uc2V0QXR0cmlidXRlKCdpZCcsICduZXctdGFzaycpO1xuICAgIG5ld1Rhc2tCdXR0b24udGV4dENvbnRlbnQgPSAnQWRkIFRhc2snO1xuICAgIG5ld1Rhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7IFxuXG4gICAgICAgIGNvbnN0IHRhc2tRdWVzdGlvbnMgPSBjcmVhdGVJbnB1dEZpZWxkKCk7XG4gICAgICAgIG5ld1Rhc2tCdXR0b24uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmViZWdpbicsIHRhc2tRdWVzdGlvbnMpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGl0bGUnKS5mb2N1cygpO1xuICAgIH0pO1xuXG4gICAgbWFpblZpZXdwb3J0LmFwcGVuZENoaWxkKHByb2plY3RIZWFkZXIpO1xuICAgIG1haW5WaWV3cG9ydC5hcHBlbmRDaGlsZCh0YXNrc0luUHJvamVjdCk7XG4gICAgbWFpblZpZXdwb3J0LmFwcGVuZENoaWxkKG5ld1Rhc2tCdXR0b24pO1xuXG4gICAgdXBkYXRlU3RvcmFnZSgpO1xufVxuXG5cbmZ1bmN0aW9uIGNyZWF0ZVRhc2tGb3JTY3JlZW4odGFzaywgd3JhcHBlciA9IG51bGwpIHtcblxuICAgIGlmICh3cmFwcGVyID09IG51bGwpIHtcbiAgICAgICAgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIH1cblxuICAgIGNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgcC50ZXh0Q29udGVudCA9IGB0aXRsZTogJHt0YXNrLnRpdGxlfVxuICAgICAgICAgICAgICAgICAgICAgZGVzYzogICR7dGFzay5kZXNjcmlwdGlvbn1cXG5cbiAgICAgICAgICAgICAgICAgICAgIER1ZSBkYXRlOiAke3Rhc2suZHVlRGF0ZX1cXG5gO1xuXG4gICAgY29uc3QgZWRpdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGVkaXRCdXR0b24udGV4dENvbnRlbnQgPSAnRWRpdCBUYXNrJztcblxuICAgIGVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHRhc2tJbnB1dEZpZWxkID0gY3JlYXRlSW5wdXRGaWVsZCh0YXNrLCB3cmFwcGVyKTtcbiAgICAgICAgd3JhcHBlci5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWJlZ2luJywgdGFza0lucHV0RmllbGQpO1xuICAgICAgICB3cmFwcGVyLnRleHRDb250ZW50ID0gJyc7XG4gICAgfSk7XG5cbiAgICBjb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBkZWxldGVCdXR0b24udGV4dENvbnRlbnQgPSAnRGVsZXRlJztcbiAgICBkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHRhc2sucHJvamVjdC5saXN0VGFza3MgPSB0YXNrLnByb2plY3QubGlzdFRhc2tzLmZpbHRlcigodCkgPT4gdGFzayAhPT0gdCk7XG4gICAgICAgIHByb2plY3RPblZpZXdwb3J0KHRhc2sucHJvamVjdCk7XG4gICAgfSlcblxuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQocCk7XG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZChlZGl0QnV0dG9uKTtcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGRlbGV0ZUJ1dHRvbik7XG5cbiAgICByZXR1cm4gd3JhcHBlcjtcbn1cblxuXG5cbi8vIG1ha2UgaXQgd29yayBmb3IgZWRpdGluZyB0b29cbmZ1bmN0aW9uIGNyZWF0ZUlucHV0RmllbGQodGFzayA9IG51bGwsIG91dGVyRGl2ID0gbnVsbCkge1xuXG4gICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHdyYXBwZXIuc2V0QXR0cmlidXRlKCdpZCcsICduZXctdGFzay1xdWVzdGlvbnMnKTtcblxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgZm9ybS5zZXRBdHRyaWJ1dGUoJ2FjdGlvbicsICcnKTtcbiAgICBmb3JtLnNldEF0dHJpYnV0ZSgnbWV0aG9kJywgJ2dldCcpO1xuICAgIGZvcm0uc2V0QXR0cmlidXRlKCdpZCcsICd0YXNrLWZvcm0nKTtcblxuICAgIGNvbnN0IHRpdGxlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIHRpdGxlTGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCAndGl0bGUnKTtcbiAgICB0aXRsZUxhYmVsLnRleHRDb250ZW50ID0gJ1RpdGxlJztcbiAgICBjb25zdCB0aXRsZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICB0aXRsZUlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XG4gICAgdGl0bGVJbnB1dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAndGl0bGUnKTtcbiAgICB0aXRsZUlucHV0LnNldEF0dHJpYnV0ZSgnaWQnLCAndGl0bGUnKTtcblxuICAgIGNvbnN0IGRlc2NMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgZGVzY0xhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywgJ2Rlc2MnKTtcbiAgICBkZXNjTGFiZWwudGV4dENvbnRlbnQgPSAnRGVzY3JpcHRpb24nO1xuICAgIGNvbnN0IGRlc2NJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgZGVzY0lucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XG4gICAgZGVzY0lucHV0LnNldEF0dHJpYnV0ZSgnbmFtZScsICdkZXNjJyk7XG4gICAgZGVzY0lucHV0LnNldEF0dHJpYnV0ZSgnaWQnLCAnZGVzYycpO1xuXG4gICAgY29uc3QgZGF0ZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICBkYXRlTGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCAnZGF0ZScpO1xuICAgIGRhdGVMYWJlbC50ZXh0Q29udGVudCA9ICdEdWUgRGF0ZSc7XG4gICAgY29uc3QgZGF0ZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBkYXRlSW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2RhdGUnKTtcbiAgICBkYXRlSW5wdXQuc2V0QXR0cmlidXRlKCduYW1lJywgJ2RhdGUnKTtcbiAgICBkYXRlSW5wdXQuc2V0QXR0cmlidXRlKCdpZCcsICdkYXRlJyk7XG5cbiAgICBjb25zdCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBzdWJtaXRCdXR0b24uc2V0QXR0cmlidXRlKCdpZCcsICdjcmVhdGUtbmV3LXRhc2snKTtcbiAgICBzdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSAnQ3JlYXRlIE5ldyBUYXNrJztcblxuICAgIGlmICh0YXNrICE9IG51bGwpIHtcblxuICAgICAgICB0aXRsZUlucHV0LnZhbHVlID0gdGFzay50aXRsZTtcbiAgICAgICAgZGVzY0lucHV0LnZhbHVlID0gdGFzay5kZXNjcmlwdGlvbjtcbiAgICAgICAgZGF0ZUlucHV0LnZhbHVlID0gdGFzay5kdWVEYXRlO1xuICAgICAgICAvL3Byb2plY3RJbnB1dC52YWx1ZSA9IHRhc2sucHJvamVjdC50aXRsZTtcblxuICAgICAgICBzdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSAnRWRpdCBUYXNrJztcbiAgICB9XG5cbiAgICBzdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpdGxlJykudmFsdWU7XG4gICAgICAgIGNvbnN0IGRlc2MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVzYycpLnZhbHVlOyBcbiAgICAgICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkYXRlJykudmFsdWU7XG4gICAgICAgIGNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoMycpLnRleHRDb250ZW50O1xuXG4gICAgICAgIGNvbnN0IHByb2plY3RPYmplY3QgPSBwcm9qZWN0cy5maW5kKChwcm9qKSA9PiBwcm9qLnRpdGxlID09IHByb2plY3QpO1xuXG5cbiAgICAgICAgaWYgKHRhc2sgPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgbmV3VGFzayA9IG5ldyBUYXNrKHRpdGxlLCBkZXNjLCBkYXRlLCBwcm9qZWN0T2JqZWN0KTtcbiAgICAgICAgICAgIHByb2plY3RPYmplY3QubGlzdFRhc2tzLnB1c2gobmV3VGFzayk7XG4gICAgICAgICAgICBwcm9qZWN0T25WaWV3cG9ydChwcm9qZWN0T2JqZWN0KTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGFzay5lZGl0VGl0bGUodGl0bGUpO1xuICAgICAgICAgICAgdGFzay5lZGl0RGVzY3JpcHRpb24oZGVzYyk7XG4gICAgICAgICAgICB0YXNrLmVkaXREdWVEYXRlKGRhdGUpO1xuICAgICAgICAgICAgLy90YXNrLmVkaXRQcm9qZWN0KHByb2plY3RPYmplY3QpO1xuICAgICAgICAgICAgY3JlYXRlVGFza0ZvclNjcmVlbih0YXNrLCBvdXRlckRpdik7XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVTdG9yYWdlKCk7XG5cbiAgICAgICAgd3JhcHBlci50ZXh0Q29udGVudCA9ICcnO1xuICAgIH0pO1xuXG4gICAgY29uc3QgY2FuY2VsQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgY2FuY2VsQnV0dG9uLnNldEF0dHJpYnV0ZSgnaWQnLCAnY2FuY2VsLXByb2plY3QtZmllbGQnKTtcbiAgICBjYW5jZWxCdXR0b24udGV4dENvbnRlbnQgPSAnQ2FuY2VsJztcblxuICAgIGNhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHdyYXBwZXIudGV4dENvbnRlbnQgPSAnJztcbiAgICAgICAgd3JhcHBlci5yZW1vdmUoKTtcbiAgICAgICAgaWYgKHRhc2sgIT09IG51bGwpIHsgY3JlYXRlVGFza0ZvclNjcmVlbih0YXNrLCBvdXRlckRpdik7IH1cbiAgICB9KTtcblxuICAgIGZvcm0uYXBwZW5kQ2hpbGQodGl0bGVMYWJlbCk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZCh0aXRsZUlucHV0KTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGRlc2NMYWJlbCk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChkZXNjSW5wdXQpO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZGF0ZUxhYmVsKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGRhdGVJbnB1dCk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChzdWJtaXRCdXR0b24pO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoY2FuY2VsQnV0dG9uKTtcblxuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoZm9ybSk7XG5cbiAgICByZXR1cm4gd3JhcHBlcjtcbn1cbiIsImltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuL3Rhc2tMb2dpYy5qcyc7XG5pbXBvcnQgeyBwcm9qZWN0T25WaWV3cG9ydCB9IGZyb20gJy4vbmV3VGFza1NjcmVlbi5qcyc7XG5pbXBvcnQgeyB1cGRhdGVTdG9yYWdlIH0gZnJvbSAnLi9sb2NhbFN0b3JhZ2UuanMnO1xuXG5cbmV4cG9ydCBsZXQgcHJvamVjdHMgPSBbXTtcbmNvbnN0IGRlZmF1bHRQcm9qZWN0ID0gbmV3IFByb2plY3QoJ0RlZmF1bHQgUHJvamVjdCcpO1xucHJvamVjdHMucHVzaChkZWZhdWx0UHJvamVjdCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRQcm9qZWN0cyh2YWwpIHtcbiAgICBwcm9qZWN0cyA9IHZhbDtcbn1cblxuXG4vLyB1cGRhdGVzIHRoZSBsaXN0IG9mIHByb2plY3RzXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlUHJvamVjdFZpZXcoKSB7XG4gICAgY29uc3Qgd3JhcHBlclByb2plY3REaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1saXN0Jyk7XG4gICAgd3JhcHBlclByb2plY3REaXYudGV4dENvbnRlbnQgPSAnUHJvamVjdHMnO1xuXG4gICAgZm9yIChsZXQgcHJvaiBvZiBwcm9qZWN0cykge1xuICAgICAgICBjb25zdCBwcm9qZWN0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHByb2plY3REaXYudGV4dENvbnRlbnQgPSBgJHtwcm9qLnRpdGxlfVxcbmA7XG4gICAgICAgIHByb2plY3REaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBwcm9qZWN0T25WaWV3cG9ydChwcm9qKSk7XG5cblxuICAgICAgICBjb25zdCBwcm9qZWN0RWRpdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBwcm9qZWN0RWRpdEJ1dHRvbi50ZXh0Q29udGVudCA9ICdFZGl0JztcbiAgICAgICAgcHJvamVjdEVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBuZXdQcm9qZWN0RmllbGQocHJvaikpO1xuXG4gICAgICAgIGNvbnN0IHByb2plY3REZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgcHJvamVjdERlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9ICdEZWxldGUnO1xuICAgICAgICBwcm9qZWN0RGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gZGVsZXRlUHJvamVjdChwcm9qKSk7XG5cbiAgICAgICAgd3JhcHBlclByb2plY3REaXYuYXBwZW5kQ2hpbGQocHJvamVjdERpdik7XG4gICAgICAgIHdyYXBwZXJQcm9qZWN0RGl2LmFwcGVuZENoaWxkKHByb2plY3RFZGl0QnV0dG9uKTtcbiAgICAgICAgd3JhcHBlclByb2plY3REaXYuYXBwZW5kQ2hpbGQocHJvamVjdERlbGV0ZUJ1dHRvbik7XG5cbiAgICB9XG59XG4vLyBkZWxldGVzIHByb2plY3QgZnJvbSBwcm9qZWN0cyBhbmQgdXBkYXRlcyB2aWV3cG9ydFxuZnVuY3Rpb24gZGVsZXRlUHJvamVjdChwcm9qKSB7XG4gICAgcHJvamVjdHMgPSBwcm9qZWN0cy5maWx0ZXIoKHByb2plY3QpID0+IHByb2plY3QgIT09IHByb2opO1xuICAgIHVwZGF0ZVByb2plY3RWaWV3KCk7XG4gICAgLy8gcHJvamVjdE9uVmlld3BvcnQocHJvaik7XG59XG5cbi8vIGJyaW5ncyB1cCB0aGUgZmllbGQgdG8gbWFrZSBhIG5ldyBwcm9qZWN0XG5leHBvcnQgZnVuY3Rpb24gbmV3UHJvamVjdEZpZWxkKHByb2ogPSBudWxsKSB7XG5cbiAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ldy1wcm9qZWN0LXF1ZXN0aW9ucycpO1xuXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICBmb3JtLnNldEF0dHJpYnV0ZSgnYWN0aW9uJywgJycpO1xuICAgIGZvcm0uc2V0QXR0cmlidXRlKCdtZXRob2QnLCAnZ2V0Jyk7XG4gICAgZm9ybS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Byb2plY3QtZm9ybScpO1xuXG4gICAgY29uc3QgdGl0bGVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgdGl0bGVMYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsICd0aXRsZScpO1xuICAgIHRpdGxlTGFiZWwudGV4dENvbnRlbnQgPSAnVGl0bGUnO1xuICAgIGNvbnN0IHRpdGxlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHRpdGxlSW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcbiAgICB0aXRsZUlucHV0LnNldEF0dHJpYnV0ZSgnbmFtZScsICd0aXRsZScpO1xuICAgIHRpdGxlSW5wdXQuc2V0QXR0cmlidXRlKCdpZCcsICd0aXRsZScpO1xuXG5cbiAgICBjb25zdCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBzdWJtaXRCdXR0b24uc2V0QXR0cmlidXRlKCdpZCcsICdjcmVhdGUtbmV3LXByb2plY3QnKTtcbiAgICBzdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSAnQ3JlYXRlIE5ldyBQcm9qZWN0JztcblxuICAgIC8vIGlmIHRoZSBwcm9qZWN0IGlzIGJlaW5nIGVkaXRlZFxuICAgIGlmIChwcm9qICE9PSBudWxsKSB7XG4gICAgICAgIHRpdGxlSW5wdXQudmFsdWUgPSBwcm9qLnRpdGxlO1xuICAgICAgICBzdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSAnRWRpdCBQcm9qZWN0JztcbiAgICB9XG5cbiAgICBzdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIC8vIGlmIHByb2plY3QgaXMgYmVpbmcgZWRpdGVkIGFrYSBub3QgbmV3XG4gICAgICAgIGlmIChwcm9qICE9PSBudWxsKSB7XG4gICAgICAgICAgICBwcm9qLnRpdGxlID0gdGl0bGVJbnB1dC52YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdCh0aXRsZUlucHV0LnZhbHVlKTtcbiAgICAgICAgICAgIHByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gYWxzbyB1cGRhdGVzIHZpZXdwb3J0XG5cbiAgICAgICAgdXBkYXRlUHJvamVjdFZpZXcoKTtcbiAgICAgICAgdXBkYXRlU3RvcmFnZSgpO1xuICAgICAgICB3cmFwcGVyLnRleHRDb250ZW50ID0gJyc7XG4gICAgfSk7XG5cbiAgICBjb25zdCBjYW5jZWxCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBjYW5jZWxCdXR0b24uc2V0QXR0cmlidXRlKCdpZCcsICdjYW5jZWwtcHJvamVjdC1maWVsZCcpO1xuICAgIGNhbmNlbEJ1dHRvbi50ZXh0Q29udGVudCA9ICdDYW5jZWwnO1xuXG4gICAgY2FuY2VsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgd3JhcHBlci50ZXh0Q29udGVudCA9ICcnO1xuICAgIH0pXG5cbiAgICBmb3JtLmFwcGVuZENoaWxkKHRpdGxlTGFiZWwpO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQodGl0bGVJbnB1dCk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChzdWJtaXRCdXR0b24pO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoY2FuY2VsQnV0dG9uKTtcblxuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoZm9ybSk7XG5cbiAgICB0aXRsZUlucHV0LmZvY3VzKCk7XG5cbn1cblxuIiwiZXhwb3J0IGNsYXNzIFRhc2sge1xuXG4gICAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcm9qZWN0KSB7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgICAgICB0aGlzLnByb2plY3QgPSBwcm9qZWN0O1xuXG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSAxO1xuICAgICAgICB0aGlzLmZpbmlzaGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZWRpdFRpdGxlKG5ld1RpdGxlKSB7XG4gICAgICAgIHRoaXMudGl0bGUgPSBuZXdUaXRsZTtcbiAgICB9XG5cbiAgICBlZGl0RGVzY3JpcHRpb24obmV3RGVzYykge1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gbmV3RGVzYztcbiAgICB9XG5cbiAgICBlZGl0RHVlRGF0ZShuZXdEdWVEYXRlKSB7XG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9IG5ld0R1ZURhdGU7XG4gICAgfVxuXG5cbiAgICBlZGl0UHJvamVjdChuZXdQcm9qKSB7XG4gICAgICAgIHRoaXMucHJvamVjdC5saXN0VGFza3MgPSB0aGlzLnByb2plY3QubGlzdFRhc2tzLmZpbHRlcih0YXNrID0+IHRoaXMgIT09IHRhc2spO1xuICAgICAgICB0aGlzLnByb2plY3QgPSBuZXdQcm9qO1xuICAgICAgICB0aGlzLnByb2plY3QubGlzdFRhc2tzLnB1c2godGhpcyk7XG4gICAgICAgIFxuICAgIH1cbiAgICBhZGRUb1Byb2plY3QocHJvamVjdCkge1xuICAgICAgICB0aGlzLnByb2plY3QgPSBwcm9qZWN0O1xuICAgICAgICB0aGlzLnByb2plY3QubGlzdFRhc2tzLnB1c2godGhpcyk7XG4gICAgfVxuXG4gICAgdGFza0ZpbmlzaGVkKCkge1xuICAgICAgICB0aGlzLmZpbmlzaGVkID0gdHJ1ZTtcbiAgICB9XG5cblxufVxuXG4vLyBwcm9qZWN0IHNob3VsZCBiZSBhbiBhcnJheSBwZXJoYXBzLCBub3QgYSBjbGFzc1xuXG5leHBvcnQgY2xhc3MgUHJvamVjdCB7XG4gICAgY29uc3RydWN0b3IodGl0bGUpIHtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgICAgICB0aGlzLmxpc3RUYXNrcyA9IFtdO1xuICAgIH1cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBzaG93UHJvamVjdFZpZXcgZnJvbSAnLi9uZXdUYXNrU2NyZWVuLmpzJztcblxuc2hvd1Byb2plY3RWaWV3KCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=