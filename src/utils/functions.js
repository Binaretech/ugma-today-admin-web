export function loadUserData() {
    try {
        return JSON.parse(localStorage.getItem('utd') || {});
    } catch (error) {
        console.error(error);
        localStorage.setItem('utd', '{}');
    }
}