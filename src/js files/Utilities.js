export function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    return regex.test(email);
}

export function isStrongPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]{8,}$/;

    return regex.test(password);
}

export function formatDate(date) {
    const theDate = new Date(date);

    const year = theDate.getFullYear();
    const month = theDate.getMonth() + 1;
    const day = theDate.getDate();

    return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
}