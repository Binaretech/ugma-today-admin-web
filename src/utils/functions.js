export function loadUserData() {
    try {
        return JSON.parse(localStorage.getItem('utd') || {});
    } catch (error) {
        localStorage.setItem('utd', '{}');
    }
}