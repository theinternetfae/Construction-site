export function getTaskList() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

export function saveTaskList(taskList) {

    localStorage.setItem("tasks", JSON.stringify(taskList));

}