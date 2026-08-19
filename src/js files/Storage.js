export function getTaskList() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

export function saveTaskList(taskList) {

    localStorage.setItem("tasks", JSON.stringify(taskList));

}

// export function getUserProfile() {
//     return JSON.parse(localStorage.getItem("profile")) || {}
// }

// export function saveUserProfile(userProfile) {
//     localStorage.setItem("profile", JSON.stringify(userProfile));
// }