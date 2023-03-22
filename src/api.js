export const baseUrl = "http://127.0.0.1:8000/api/v1"

export function getCookie(name) {
    const cookieValue = document.cookie.split(';')
        .map(cookie => cookie.trim())
        .find(cookie => cookie.startsWith(`${name}=`));
        
    if (!cookieValue) {
        return undefined;
    }

    return decodeURIComponent(cookieValue.split('=')[1]);
}