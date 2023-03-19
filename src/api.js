export const baseUrl = "https://backend.managertestapp.com/api/v1"


// export function getCookie(name) {
//     let matches = document.cookie.match(new RegExp(
//         "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
//     ));
//     return matches ? decodeURIComponent(matches[1]) : undefined;
// }

export function getCookie(name) {
    const cookieValue = document.cookie.split(';')
        .map(cookie => cookie.trim())
        .find(cookie => cookie.startsWith(`${name}=`));
    console.log(cookieValue);
    if (!cookieValue) {
        return undefined;
    }

    return decodeURIComponent(cookieValue.split('=')[1]);
}
