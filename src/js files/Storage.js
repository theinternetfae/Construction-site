export function getTaskList() {
    const taskList = JSON.parse(localStorage.getItem("tasks")) || [];

    return taskList;
}

export function saveTaskList(taskList) {

    localStorage.setItem("tasks", JSON.stringify(taskList));

}