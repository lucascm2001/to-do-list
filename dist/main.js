/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/newTask.js":
/*!************************!*\
  !*** ./src/newTask.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ showNewTaskScreen)
/* harmony export */ });



function showNewTaskScreen() {

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
/* harmony import */ var _newTask_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./newTask.js */ "./src/newTask.js");


(0,_newTask_js__WEBPACK_IMPORTED_MODULE_0__["default"])();

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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdlOztBQUVmOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7VUMxRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ040Qzs7QUFFNUMsdURBQWlCOztBQUVqQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCLDhCQUE4QixpQkFBaUI7QUFDL0MsaUNBQWlDLGFBQWE7O0FBRTlDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBLGMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL25ld1Rhc2suanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2hvd05ld1Rhc2tTY3JlZW4oKSB7XG5cbiAgICBjb25zdCBuZXdUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ldy10YXNrJyk7XG5cbiAgICBuZXdUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY3JlYXRlSW5wdXRGaWVsZCk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUlucHV0RmllbGQoKSB7XG4gICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXctdGFzay1xdWVzdGlvbnMnKTtcblxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgZm9ybS5zZXRBdHRyaWJ1dGUoJ2FjdGlvbicsICcnKTtcbiAgICBmb3JtLnNldEF0dHJpYnV0ZSgnbWV0aG9kJywgJ2dldCcpO1xuICAgIGZvcm0uc2V0QXR0cmlidXRlKCdpZCcsICd0aGUtZm9ybScpO1xuXG4gICAgY29uc3QgdGl0bGVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgdGl0bGVMYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsICd0aXRsZScpO1xuICAgIHRpdGxlTGFiZWwudGV4dENvbnRlbnQgPSAnVGl0bGUnO1xuICAgIGNvbnN0IHRpdGxlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHRpdGxlSW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcbiAgICB0aXRsZUlucHV0LnNldEF0dHJpYnV0ZSgnbmFtZScsICd0aXRsZScpO1xuICAgIHRpdGxlSW5wdXQuc2V0QXR0cmlidXRlKCdpZCcsICd0aXRsZScpO1xuXG4gICAgY29uc3QgZGVzY0xhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICBkZXNjTGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCAnZGVzYycpO1xuICAgIGRlc2NMYWJlbC50ZXh0Q29udGVudCA9ICdEZXNjcmlwdGlvbic7XG4gICAgY29uc3QgZGVzY0lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBkZXNjSW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcbiAgICBkZXNjSW5wdXQuc2V0QXR0cmlidXRlKCduYW1lJywgJ2Rlc2MnKTtcbiAgICBkZXNjSW5wdXQuc2V0QXR0cmlidXRlKCdpZCcsICdkZXNjJyk7XG5cbiAgICBjb25zdCBkYXRlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIGRhdGVMYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsICdkYXRlJyk7XG4gICAgZGF0ZUxhYmVsLnRleHRDb250ZW50ID0gJ0R1ZSBEYXRlJztcbiAgICBjb25zdCBkYXRlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGRhdGVJbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnZGF0ZScpO1xuICAgIGRhdGVJbnB1dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnZGF0ZScpO1xuICAgIGRhdGVJbnB1dC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2RhdGUnKTtcblxuICAgIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHN1Ym1pdEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25ldy10YXNrJyk7XG4gICAgc3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gJ0NyZWF0ZSBOZXcgVGFzayc7XG5cbiAgICBmb3JtLmFwcGVuZENoaWxkKHRpdGxlTGFiZWwpO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQodGl0bGVJbnB1dCk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChkZXNjTGFiZWwpO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZGVzY0lucHV0KTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGRhdGVMYWJlbCk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChkYXRlSW5wdXQpO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoc3VibWl0QnV0dG9uKTtcblxuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoZm9ybSk7XG59XG5cbi8qXG48Zm9ybSBhY3Rpb249XCJcIiBtZXRob2Q9XCJnZXRcIiBpZD1cInRoZS1mb3JtXCI+XG5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJ0aXRsZVwiPlRpdGxlPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJ0aXRsZVwiIGlkPVwidGl0bGVcIj5cblxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImRlc2NcIj5EZXNjcmlwdGlvbjwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiZGVzY1wiIGlkPVwiZGVzY1wiPlxuXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiZGF0ZVwiPkR1ZSBEYXRlPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZGF0ZVwiIG5hbWU9XCJkYXRlXCIgaWQ9XCJkYXRlXCI+XG5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJwcmlvcml0eVwiPlByaW9yaXR5PC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFuZ2VcIiBuYW1lPVwicHJpb3JpdHlcIiBpZD1cInByaW9yaXR5XCI+XG5cbiAgICAgICAgICAgIDxidXR0b24gaWQ9XCJuZXctdGFza1wiPkNyZWF0ZSBOZXcgVGFzazwvYnV0dG9uPlxuICAgICAgICA8L2Zvcm0+XG4qLyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHNob3dOZXdUYXNrU2NyZWVuIGZyb20gJy4vbmV3VGFzay5qcydcblxuc2hvd05ld1Rhc2tTY3JlZW4oKTtcblxubGV0IHRhc2tzID0gW107XG5cblxuY2xhc3MgVGFzayB7XG4gICAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSkge1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgICAgICB0aGlzLmZpbmlzaGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZWRpdFRpdGxlKG5ld1RpdGxlKSB7XG4gICAgICAgIHRoaXMudGl0bGUgPSBuZXdUaXRsZTtcbiAgICB9XG5cbiAgICBlZGl0RGVzY3JpcHRpb24obmV3RGVzYykge1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gbmV3RGVzYztcbiAgICB9XG5cbiAgICBlZGl0RHVlRGF0ZShuZXdEdWVEYXRlKSB7XG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9IG5ld0R1ZURhdGU7XG4gICAgfVxuXG4gICAgYWRkVG9Qcm9qZWN0KHByb2plY3QpIHtcbiAgICAgICAgcHJvamVjdC5saXN0VG9kby5wdXNoKHRoaXMpO1xuICAgIH1cblxuICAgIGRlbGV0ZUZyb21Qcm9qZWN0KHByb2plY3QpIHtcbiAgICAgICAgcHJvamVjdC5saXN0VGFza3MgPSBwcm9qZWN0Lmxpc3RUYXNrcy5maWx0ZXIodGFzayA9PiB0aGlzICE9PSB0YXNrKTtcbiAgICB9XG5cbiAgICB0YXNrRmluaXNoZWQoKSB7XG4gICAgICAgIHRoaXMuZmluaXNoZWQgPSB0cnVlO1xuICAgIH1cblxuXG59XG5cbi8vIHByb2plY3Qgc2hvdWxkIGJlIGFuIGFycmF5IHBlcmhhcHMsIG5vdCBhIGNsYXNzXG5cbmNsYXNzIFByb2plY3Qge1xuICAgIGNvbnN0cnVjdG9yKHRpdGxlLCBsaXN0VGFza3MpIHtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgICAgICB0aGlzLmxpc3RUYXNrcyA9IGxpc3RUYXNrcztcbiAgICB9XG59XG5cbmNvbnN0IG5ld1Rhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV3LXRhc2snKTtcbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGhlLWZvcm0nKTtcblxubmV3VGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAvLyBxdWVyeSBmb3IgaW5mb3JtYXRpb24gZm9yIHRhc2tcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aXRsZScpLnZhbHVlO1xuICAgIGNvbnN0IGRlc2MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVzYycpLnZhbHVlOyBcbiAgICBjb25zdCBkYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RhdGUnKS52YWx1ZTtcbiAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmlvcml0eScpLnZhbHVlO1xuXG4gICAgY29uc3QgbmV3VGFzayA9IG5ldyBUYXNrKHRpdGxlLCBkZXNjLCBkYXRlLCBwcmlvcml0eSk7XG4gICAgdGFza3MucHVzaChuZXdUYXNrKTtcbiAgICB0YXNrVG9TY3JlZW4obmV3VGFzayk7XG5cbiAgICBcbn0pO1xuXG5mdW5jdGlvbiB0YXNrVG9TY3JlZW4odGFzaykge1xuXG4gICAgLy8gbmVlZHMgZWRpdCBidXR0b25cbiAgICAvLyBuZWVkcyBmaW5pc2hlZCBidXR0b25cblxuICAgIC8vIGNsaWNrIG9uIGEgdGFzayBhbmQgdGhlbiB5b3UgY2FuIGVkaXQgaXRzIGNvbnRlbnRzXG5cbiAgICBjb25zdCB0YXNrVmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrcycpO1xuXG4gICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgLy8gY2xpY2tpbmcgZWFjaCBlbGVtZW50IHdpbGwgdHVybiBpdCBpbnRvIGFuIGlucHV0IGVsZW1lbnQgdG8gY2hhbmdlXG4gICAgY29uc3QgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBwLnRleHRDb250ZW50ID0gYHRpdGxlOiAke3Rhc2sudGl0bGV9XG4gICAgICAgICAgICAgICAgICAgICBkZXNjOiAgJHt0YXNrLmRlc2NyaXB0aW9ufVxcblxuICAgICAgICAgICAgICAgICAgICAgRHVlIGRhdGU6ICR7dGFzay5kdWVEYXRlfVxcbmA7XG5cbiAgICBjb25zdCBlZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgZWRpdEJ1dHRvbi50ZXh0Q29udGVudCA9ICdFZGl0IFRhc2snO1xuICAgIC8vIGNsaWNrIGJ1dHRvbiBtYWtlIGEgZHJvcGRvd25cbiAgICBlZGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKHRhc2spID0+IGVkaXREcm9wZG93bih0YXNrKSk7XG5cbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHApO1xuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbik7XG4gICAgdGFza1ZpZXcuYXBwZW5kQ2hpbGQod3JhcHBlcik7XG59XG5cbmZ1bmN0aW9uIGVkaXREcm9wZG93bih0YXNrKSB7XG4gICAgLy8gY3JlYXRlIGRyb3Bkb3duIGZvciBlZGl0aW5nIGFuZCBjaGFuZ2UgdGhlIHRhc2sgb2JqZWN0XG59XG5cblxuXG4vLyBjaGFuZ2UgdGl0bGVcbi8vIHBsYWNlIGl0IGludG8gYSBwcm9qZWN0XG4vLyBlZGl0IHRvZG9zXG4vLyBkZWxldGUgdG9kbyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==