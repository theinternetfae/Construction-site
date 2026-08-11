export function getTaskList() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

export function saveTaskList(taskList) {

    localStorage.setItem("tasks", JSON.stringify(taskList));

}

export function getUserProfile() {
    return JSON.parse(localStorage.getItem("profile")) || {
        name: 'Jane Doe',
        email: 'janedoe@gmail.com',
        accent: 'blue',
        quirk: true,
        quote: false,
        streak: true,
        themeDark: true,
        pfp: ''
    }
}

export function saveUserProfile(userProfile) {
    localStorage.setItem("profile", JSON.stringify(userProfile));
}