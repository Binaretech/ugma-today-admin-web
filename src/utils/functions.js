export function loadUserData() {
    try {
        return JSON.parse(localStorage.getItem('utd') || {});
    } catch (error) {
        console.log(error);
        localStorage.setItem('utd', '{}');
    }
}