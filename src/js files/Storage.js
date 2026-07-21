export function getTaskList() {
    const taskList = JSON.parse(localStorage.getItem("tasks")) || [];

    return taskList;
}

export function setTaskList() {

    const taskList = [];

    localStorage.setItem("tasks", JSON.stringify(taskList));

}