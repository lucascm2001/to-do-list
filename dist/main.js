/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/newTaskScreen.js":
/*!******************************!*\
  !*** ./src/newTaskScreen.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ showNewTaskScreen)
/* harmony export */ });
/* harmony import */ var _taskLogic_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./taskLogic.js */ "./src/taskLogic.js");
/* harmony import */ var _projects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects.js */ "./src/projects.js");



// create a common viewport. use it to view current project



function showNewTaskScreen() {

    (0,_projects_js__WEBPACK_IMPORTED_MODULE_1__.updateProjectView)();

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
        const newProject = new _taskLogic_js__WEBPACK_IMPORTED_MODULE_0__.Project(title);
        _projects_js__WEBPACK_IMPORTED_MODULE_1__.projects.push(newProject);
        (0,_projects_js__WEBPACK_IMPORTED_MODULE_1__.updateProjectView)();

    
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

    for (let project of _projects_js__WEBPACK_IMPORTED_MODULE_1__.projects) {
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

        const projectObject = _projects_js__WEBPACK_IMPORTED_MODULE_1__.projects.find((proj) => proj.title == project);


        if (task == null) {
            const newTask = new _taskLogic_js__WEBPACK_IMPORTED_MODULE_0__.Task(title, desc, date, projectObject);
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


/***/ }),

/***/ "./src/projects.js":
/*!*************************!*\
  !*** ./src/projects.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   projects: () => (/* binding */ projects),
/* harmony export */   updateProjectView: () => (/* binding */ updateProjectView)
/* harmony export */ });
/* harmony import */ var _taskLogic_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./taskLogic.js */ "./src/taskLogic.js");


// view all projects

let projects = [];
const defaultProject = new _taskLogic_js__WEBPACK_IMPORTED_MODULE_0__.Project('Default Project');
projects.push(defaultProject);

function updateProjectView() {

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







// change title
// place it into a project
// edit todos
// delete todo
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQStDO0FBQ1k7O0FBRTNEOzs7O0FBSWU7O0FBRWYsSUFBSSwrREFBaUI7O0FBRXJCO0FBQ0EsdURBQXVELG1CQUFtQjs7QUFFMUU7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBLG1DQUFtQyxjQUFjOztBQUVqRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSw4QkFBOEI7QUFDOUIsOEJBQThCLGlCQUFpQjtBQUMvQyxpQ0FBaUMsYUFBYTs7QUFFOUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMENBQTBDOztBQUUxQztBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0EsK0JBQStCLGtEQUFPO0FBQ3RDLFFBQVEsa0RBQVE7QUFDaEIsUUFBUSwrREFBaUI7O0FBRXpCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBOzs7O0FBSUE7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdCQUF3QixrREFBUTtBQUNoQztBQUNBO0FBQ0EsZ0NBQWdDLGNBQWM7QUFDOUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhCQUE4QixrREFBUTs7O0FBR3RDO0FBQ0EsZ0NBQWdDLCtDQUFJO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQsYUFBYSxpQkFBaUI7QUFDOUIsZ0JBQWdCLGFBQWE7QUFDN0I7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDclArQzs7QUFFL0M7O0FBRU87QUFDUCwyQkFBMkIsa0RBQU87QUFDbEM7O0FBRU87O0FBRVA7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0NBQW9DLFdBQVc7QUFDL0M7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUN0Qk87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7VUNsREE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05tRDs7QUFFbkQsNkRBQWlCOzs7Ozs7OztBQVFqQjtBQUNBO0FBQ0E7QUFDQSxjIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9uZXdUYXNrU2NyZWVuLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy90YXNrTG9naWMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGFzaywgUHJvamVjdCB9IGZyb20gJy4vdGFza0xvZ2ljLmpzJztcbmltcG9ydCB7IHByb2plY3RzLCB1cGRhdGVQcm9qZWN0VmlldyB9IGZyb20gJy4vcHJvamVjdHMuanMnXG5cbi8vIGNyZWF0ZSBhIGNvbW1vbiB2aWV3cG9ydC4gdXNlIGl0IHRvIHZpZXcgY3VycmVudCBwcm9qZWN0XG5cblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzaG93TmV3VGFza1NjcmVlbigpIHtcblxuICAgIHVwZGF0ZVByb2plY3RWaWV3KCk7XG5cbiAgICBjb25zdCBuZXdQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ldy1wcm9qZWN0Jyk7XG4gICAgbmV3UHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHsgbmV3UHJvamVjdEZpZWxkKCkgfSk7XG5cbn1cblxuLy8gZGlzcGxheSBjbGlja2VkIHByb2plY3QgdG8gdGhlIHZpZXdwb3J0XG5mdW5jdGlvbiBwcm9qZWN0T25WaWV3cG9ydChwcm9qZWN0KSB7XG5cblxuICAgIGNvbnN0IG1haW5WaWV3cG9ydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluLXZpZXdwb3J0Jyk7XG4gICAgbWFpblZpZXdwb3J0LnRleHRDb250ZW50ID0gJyc7XG5cbiAgICBjb25zdCBwcm9qZWN0SGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICBwcm9qZWN0SGVhZGVyLnRleHRDb250ZW50ID0gYCR7cHJvamVjdC50aXRsZX1gO1xuXG4gICAgLy8gZGlzcGxheSB0YXNrcyBhbmQgbmV3IHRhc2sgYnV0dG9uIGJlbG93IHByb2plY3QgdGl0bGVcbiAgICBjb25zdCB0YXNrc0luUHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgZm9yIChsZXQgdGFzayBvZiBwcm9qZWN0Lmxpc3RUYXNrcykge1xuICAgICAgICBjb25zdCB0YXNrRGl2ID0gY3JlYXRlVGFza0ZvclNjcmVlbih0YXNrKTtcbiAgICAgICAgY29uc29sZS5sb2codGFza0Rpdik7XG4gICAgICAgIHRhc2tzSW5Qcm9qZWN0LmFwcGVuZENoaWxkKHRhc2tEaXYpO1xuICAgIH1cblxuICAgIC8vIGRpc3BsYXkgdGFza3MgYWxyZWFkeSBpbiB0aGlzIHByb2plY3RcblxuXG4gICAgY29uc3QgbmV3VGFza0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIG5ld1Rhc2tCdXR0b24uc2V0QXR0cmlidXRlKCdpZCcsICduZXctdGFzaycpO1xuICAgIG5ld1Rhc2tCdXR0b24udGV4dENvbnRlbnQgPSAnQWRkIFRhc2snO1xuICAgIG5ld1Rhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7IFxuXG4gICAgICAgIGNvbnN0IHRhc2tRdWVzdGlvbnMgPSBjcmVhdGVJbnB1dEZpZWxkKCk7XG4gICAgICAgIG5ld1Rhc2tCdXR0b24uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmViZWdpbicsIHRhc2tRdWVzdGlvbnMpO1xuICAgIH0pO1xuXG4gICAgbWFpblZpZXdwb3J0LmFwcGVuZENoaWxkKHByb2plY3RIZWFkZXIpO1xuICAgIG1haW5WaWV3cG9ydC5hcHBlbmRDaGlsZCh0YXNrc0luUHJvamVjdCk7XG4gICAgbWFpblZpZXdwb3J0LmFwcGVuZENoaWxkKG5ld1Rhc2tCdXR0b24pO1xuXG5cbn1cblxuZnVuY3Rpb24gY3JlYXRlVGFza0ZvclNjcmVlbih0YXNrKSB7XG5cbiAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHAudGV4dENvbnRlbnQgPSBgdGl0bGU6ICR7dGFzay50aXRsZX1cbiAgICAgICAgICAgICAgICAgICAgIGRlc2M6ICAke3Rhc2suZGVzY3JpcHRpb259XFxuXG4gICAgICAgICAgICAgICAgICAgICBEdWUgZGF0ZTogJHt0YXNrLmR1ZURhdGV9XFxuYDtcblxuICAgIGNvbnN0IGVkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBlZGl0QnV0dG9uLnRleHRDb250ZW50ID0gJ0VkaXQgVGFzayc7XG5cbiAgICBlZGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4geyBcbiAgICAgICAgLy8gZ3JhYiBkaXYgYXJvdW5kIGl0XG4gICAgICAgIGNyZWF0ZUlucHV0RmllbGQodGFzaywgd3JhcHBlcik7ICAvL3dyYXBwZXJcblxuICAgICAgICAvLyBuZWVkIHRvIHJlZmVyZW5jZSB0aGUgb3JpZ2luYWwgZGl2IGZvciB0aGUgdGFza1xuICAgIH0pO1xuXG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZChwKTtcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGVkaXRCdXR0b24pO1xuXG4gICAgcmV0dXJuIHdyYXBwZXI7XG59XG5cbmZ1bmN0aW9uIG5ld1Byb2plY3RGaWVsZCgpIHtcbiAgICAvLyBhc2sgZm9yIG5hbWUgb2YgcHJvamVjdC5cblxuICAgIC8vIGFkZCBhbnkgZXhpc3RpbmcgdGFza3MgdG8gcHJvamVjdFxuXG4gICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXctcHJvamVjdC1xdWVzdGlvbnMnKTtcblxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgZm9ybS5zZXRBdHRyaWJ1dGUoJ2FjdGlvbicsICcnKTtcbiAgICBmb3JtLnNldEF0dHJpYnV0ZSgnbWV0aG9kJywgJ2dldCcpO1xuICAgIGZvcm0uc2V0QXR0cmlidXRlKCdpZCcsICdwcm9qZWN0LWZvcm0nKTtcblxuICAgIGNvbnN0IHRpdGxlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIHRpdGxlTGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCAndGl0bGUnKTtcbiAgICB0aXRsZUxhYmVsLnRleHRDb250ZW50ID0gJ1RpdGxlJztcbiAgICBjb25zdCB0aXRsZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICB0aXRsZUlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XG4gICAgdGl0bGVJbnB1dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAndGl0bGUnKTtcbiAgICB0aXRsZUlucHV0LnNldEF0dHJpYnV0ZSgnaWQnLCAndGl0bGUnKTtcblxuICAgIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHN1Ym1pdEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2NyZWF0ZS1uZXctcHJvamVjdCcpO1xuICAgIHN1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9ICdDcmVhdGUgTmV3IFByb2plY3QnO1xuXG4gICAgc3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aXRsZScpLnZhbHVlO1xuICAgICAgICBjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QodGl0bGUpO1xuICAgICAgICBwcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpO1xuICAgICAgICB1cGRhdGVQcm9qZWN0VmlldygpO1xuXG4gICAgXG4gICAgICAgIC8vIGNsZWFyIHRoaXMgZm9ybSwgc3VibWl0IHRoaXMgdG8gdGhlIGxvZ2ljIGFuZCB0aGUgc2NyZWVuXG5cbiAgICAgICAgLy8gY2xlYXJpbmcgaW5wdXQgZmllbGRcbiAgICAgICAgd3JhcHBlci50ZXh0Q29udGVudCA9ICcnO1xuICAgIH0pO1xuXG4gICAgZm9ybS5hcHBlbmRDaGlsZCh0aXRsZUxhYmVsKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKHRpdGxlSW5wdXQpO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoc3VibWl0QnV0dG9uKTtcblxuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoZm9ybSk7XG5cblxuXG59XG5cblxuLy8gbWFrZSBpdCB3b3JrIGZvciBlZGl0aW5nIHRvb1xuZnVuY3Rpb24gY3JlYXRlSW5wdXRGaWVsZCh0YXNrID0gbnVsbCwgb3V0ZXJEaXYgPSBudWxsKSB7XG5cbiAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgd3JhcHBlci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25ldy10YXNrLXF1ZXN0aW9ucycpO1xuXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICBmb3JtLnNldEF0dHJpYnV0ZSgnYWN0aW9uJywgJycpO1xuICAgIGZvcm0uc2V0QXR0cmlidXRlKCdtZXRob2QnLCAnZ2V0Jyk7XG4gICAgZm9ybS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Rhc2stZm9ybScpO1xuXG4gICAgY29uc3QgdGl0bGVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgdGl0bGVMYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsICd0aXRsZScpO1xuICAgIHRpdGxlTGFiZWwudGV4dENvbnRlbnQgPSAnVGl0bGUnO1xuICAgIGNvbnN0IHRpdGxlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHRpdGxlSW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcbiAgICB0aXRsZUlucHV0LnNldEF0dHJpYnV0ZSgnbmFtZScsICd0aXRsZScpO1xuICAgIHRpdGxlSW5wdXQuc2V0QXR0cmlidXRlKCdpZCcsICd0aXRsZScpO1xuXG4gICAgY29uc3QgZGVzY0xhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICBkZXNjTGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCAnZGVzYycpO1xuICAgIGRlc2NMYWJlbC50ZXh0Q29udGVudCA9ICdEZXNjcmlwdGlvbic7XG4gICAgY29uc3QgZGVzY0lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBkZXNjSW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcbiAgICBkZXNjSW5wdXQuc2V0QXR0cmlidXRlKCduYW1lJywgJ2Rlc2MnKTtcbiAgICBkZXNjSW5wdXQuc2V0QXR0cmlidXRlKCdpZCcsICdkZXNjJyk7XG5cbiAgICBjb25zdCBkYXRlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIGRhdGVMYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsICdkYXRlJyk7XG4gICAgZGF0ZUxhYmVsLnRleHRDb250ZW50ID0gJ0R1ZSBEYXRlJztcbiAgICBjb25zdCBkYXRlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGRhdGVJbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnZGF0ZScpO1xuICAgIGRhdGVJbnB1dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnZGF0ZScpO1xuICAgIGRhdGVJbnB1dC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2RhdGUnKTtcblxuICAgIGNvbnN0IHByb2plY3RMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgcHJvamVjdExhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywgJ3Byb2plY3RzJyk7XG4gICAgcHJvamVjdExhYmVsLnRleHRDb250ZW50ID0gJ1Byb2plY3QnO1xuXG4gICAgY29uc3QgcHJvamVjdElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XG4gICAgcHJvamVjdElucHV0LnNldEF0dHJpYnV0ZSgnbmFtZScsICdwcm9qZWN0cycpO1xuICAgIHByb2plY3RJbnB1dC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Byb2plY3RzJyk7XG5cbiAgICBmb3IgKGxldCBwcm9qZWN0IG9mIHByb2plY3RzKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgICBvcHRpb24uc2V0QXR0cmlidXRlKCd2YWx1ZScsIHByb2plY3QudGl0bGUpO1xuICAgICAgICBvcHRpb24udGV4dENvbnRlbnQgPSBgJHtwcm9qZWN0LnRpdGxlfWA7XG4gICAgICAgIHByb2plY3RJbnB1dC5hcHBlbmRDaGlsZChvcHRpb24pO1xuICAgIH1cbiAgICBcblxuICAgIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHN1Ym1pdEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2NyZWF0ZS1uZXctdGFzaycpO1xuICAgIHN1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9ICdDcmVhdGUgTmV3IFRhc2snO1xuXG4gICAgaWYgKHRhc2sgIT0gbnVsbCkge1xuXG4gICAgICAgIHRpdGxlSW5wdXQudmFsdWUgPSB0YXNrLnRpdGxlO1xuICAgICAgICBkZXNjSW5wdXQudmFsdWUgPSB0YXNrLmRlc2NyaXB0aW9uO1xuICAgICAgICBkYXRlSW5wdXQudmFsdWUgPSB0YXNrLmR1ZURhdGU7XG4gICAgICAgIHByb2plY3RJbnB1dC52YWx1ZSA9IHRhc2sucHJvamVjdC50aXRsZTtcblxuICAgICAgICBzdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSAnRWRpdCBUYXNrJztcbiAgICB9XG5cbiAgICBzdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpdGxlJykudmFsdWU7XG4gICAgICAgIGNvbnN0IGRlc2MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVzYycpLnZhbHVlOyBcbiAgICAgICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkYXRlJykudmFsdWU7XG4gICAgICAgIGNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdHMnKS52YWx1ZTtcblxuICAgICAgICBjb25zdCBwcm9qZWN0T2JqZWN0ID0gcHJvamVjdHMuZmluZCgocHJvaikgPT4gcHJvai50aXRsZSA9PSBwcm9qZWN0KTtcblxuXG4gICAgICAgIGlmICh0YXNrID09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1Rhc2sgPSBuZXcgVGFzayh0aXRsZSwgZGVzYywgZGF0ZSwgcHJvamVjdE9iamVjdCk7XG4gICAgICAgICAgICBwcm9qZWN0T2JqZWN0Lmxpc3RUYXNrcy5wdXNoKG5ld1Rhc2spO1xuICAgICAgICAgICAgLy9uZXdUYXNrLmFkZFRvUHJvamVjdChwcm9qZWN0KTtcbiAgICAgICAgICAgIC8vIEZJWCBUSElTIExJTkUgUklHSFQgSEVSRSwgVEFTSyBUTyBDT01FIEFCT1ZFIEJVVFRPTlxuICAgICAgICAgICAgcHJvamVjdE9uVmlld3BvcnQocHJvamVjdE9iamVjdCk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRhc2suZWRpdFRpdGxlKHRpdGxlKTtcbiAgICAgICAgICAgIHRhc2suZWRpdERlc2NyaXB0aW9uKGRlc2MpO1xuICAgICAgICAgICAgdGFzay5lZGl0RHVlRGF0ZShkYXRlKTtcbiAgICAgICAgICAgIC8vdGFzay5lZGl0UHJvamVjdChwcm9qZWN0T2JqZWN0KTtcbiAgICAgICAgICAgIGVkaXRUYXNrVG9TY3JlZW4odGFzaywgb3V0ZXJEaXYpO1xuICAgICAgICB9XG5cbiAgICAgICAgd3JhcHBlci50ZXh0Q29udGVudCA9ICcnO1xuICAgIH0pO1xuXG4gICAgZm9ybS5hcHBlbmRDaGlsZCh0aXRsZUxhYmVsKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKHRpdGxlSW5wdXQpO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZGVzY0xhYmVsKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGRlc2NJbnB1dCk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChkYXRlTGFiZWwpO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZGF0ZUlucHV0KTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKHByb2plY3RMYWJlbCk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChwcm9qZWN0SW5wdXQpO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoc3VibWl0QnV0dG9uKTtcblxuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoZm9ybSk7XG5cbiAgICByZXR1cm4gd3JhcHBlcjtcbn1cblxuZnVuY3Rpb24gZWRpdFRhc2tUb1NjcmVlbih0YXNrLCB3cmFwcGVyKSB7XG4gICAgXG4gICAgd3JhcHBlci5jaGlsZHJlblswXS50ZXh0Q29udGVudCA9IGB0aXRsZTogJHt0YXNrLnRpdGxlfVxuICAgIGRlc2M6ICAke3Rhc2suZGVzY3JpcHRpb259XFxuXG4gICAgRHVlIGRhdGU6ICR7dGFzay5kdWVEYXRlfVxcbmA7XG59XG4iLCJpbXBvcnQgeyBUYXNrLCBQcm9qZWN0IH0gZnJvbSAnLi90YXNrTG9naWMuanMnO1xuXG4vLyB2aWV3IGFsbCBwcm9qZWN0c1xuXG5leHBvcnQgbGV0IHByb2plY3RzID0gW107XG5jb25zdCBkZWZhdWx0UHJvamVjdCA9IG5ldyBQcm9qZWN0KCdEZWZhdWx0IFByb2plY3QnKTtcbnByb2plY3RzLnB1c2goZGVmYXVsdFByb2plY3QpO1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlUHJvamVjdFZpZXcoKSB7XG5cbiAgICBjb25zdCB3cmFwcGVyUHJvamVjdERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWxpc3QnKTtcbiAgICB3cmFwcGVyUHJvamVjdERpdi50ZXh0Q29udGVudCA9ICdQcm9qZWN0cyc7XG5cbiAgICBmb3IgKGxldCBwcm9qIG9mIHByb2plY3RzKSB7XG4gICAgICAgIGNvbnN0IHByb2plY3REaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcHJvamVjdERpdi50ZXh0Q29udGVudCA9IGAke3Byb2oudGl0bGV9XFxuYDtcbiAgICAgICAgd3JhcHBlclByb2plY3REaXYuYXBwZW5kQ2hpbGQocHJvamVjdERpdik7XG5cbiAgICAgICAgLy8gYWRkIGV2ZW50IGxpc3RlbmVyIGZvciBlYWNoIGRpdiB0aGF0IGJyaW5ncyB1cCB0aGUgbmljZSB2aWV3cG9ydFxuXG4gICAgICAgIHByb2plY3REaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBwcm9qZWN0T25WaWV3cG9ydChwcm9qKSk7XG4gICAgfVxufSIsImV4cG9ydCBjbGFzcyBUYXNrIHtcblxuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJvamVjdCkge1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICAgICAgdGhpcy5wcm9qZWN0ID0gcHJvamVjdDtcblxuICAgICAgICB0aGlzLnByaW9yaXR5ID0gMTtcbiAgICAgICAgdGhpcy5maW5pc2hlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGVkaXRUaXRsZShuZXdUaXRsZSkge1xuICAgICAgICB0aGlzLnRpdGxlID0gbmV3VGl0bGU7XG4gICAgfVxuXG4gICAgZWRpdERlc2NyaXB0aW9uKG5ld0Rlc2MpIHtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IG5ld0Rlc2M7XG4gICAgfVxuXG4gICAgZWRpdER1ZURhdGUobmV3RHVlRGF0ZSkge1xuICAgICAgICB0aGlzLmR1ZURhdGUgPSBuZXdEdWVEYXRlO1xuICAgIH1cblxuXG4gICAgZWRpdFByb2plY3QobmV3UHJvaikge1xuICAgICAgICB0aGlzLnByb2plY3QubGlzdFRhc2tzID0gdGhpcy5wcm9qZWN0Lmxpc3RUYXNrcy5maWx0ZXIodGFzayA9PiB0aGlzICE9PSB0YXNrKTtcbiAgICAgICAgdGhpcy5wcm9qZWN0ID0gbmV3UHJvajtcbiAgICAgICAgdGhpcy5wcm9qZWN0Lmxpc3RUYXNrcy5wdXNoKHRoaXMpO1xuICAgICAgICBcbiAgICB9XG4gICAgYWRkVG9Qcm9qZWN0KHByb2plY3QpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0ID0gcHJvamVjdDtcbiAgICAgICAgdGhpcy5wcm9qZWN0Lmxpc3RUYXNrcy5wdXNoKHRoaXMpO1xuICAgIH1cblxuICAgIHRhc2tGaW5pc2hlZCgpIHtcbiAgICAgICAgdGhpcy5maW5pc2hlZCA9IHRydWU7XG4gICAgfVxuXG5cbn1cblxuLy8gcHJvamVjdCBzaG91bGQgYmUgYW4gYXJyYXkgcGVyaGFwcywgbm90IGEgY2xhc3NcblxuZXhwb3J0IGNsYXNzIFByb2plY3Qge1xuICAgIGNvbnN0cnVjdG9yKHRpdGxlKSB7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgdGhpcy5saXN0VGFza3MgPSBbXTtcbiAgICB9XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgc2hvd05ld1Rhc2tTY3JlZW4gZnJvbSAnLi9uZXdUYXNrU2NyZWVuLmpzJztcblxuc2hvd05ld1Rhc2tTY3JlZW4oKTtcblxuXG5cblxuXG5cblxuLy8gY2hhbmdlIHRpdGxlXG4vLyBwbGFjZSBpdCBpbnRvIGEgcHJvamVjdFxuLy8gZWRpdCB0b2Rvc1xuLy8gZGVsZXRlIHRvZG8iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=