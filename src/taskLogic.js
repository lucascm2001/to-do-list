export class Task {

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

export class Project {
    constructor(title) {
        this.title = title;
        this.listTasks = [];
    }
}