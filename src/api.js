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

export async function getUserProfile() {
    let response = await fetch(`${baseUrl}/users`, {
        method : "GET",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    return data;
}

export async function postLogOut() {
    let csrftoken = getCookie('csrftoken');
    let response = await fetch(`${baseUrl}/users/log-out` , {
        method : "POST",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
            "X-CSRFToken": csrftoken,
        },
    });
    if(response.ok) {
        return;
    }
}

export async function postLogIn(logInData) {
    let csrftoken = getCookie('csrftoken');
    let response = await fetch(`${baseUrl}/users/log-in` , {
        method : "POST",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
            "X-CSRFToken": csrftoken,
        },
        body : JSON.stringify(logInData),
    });
    if(response.ok) {
        return;
    } else {
        return response.status;
    }
}

export async function getBrands() {
    let response = await fetch(`${baseUrl}/brands`, {
        method : "GET",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    return data;
}

export async function getMyBrand() {
    let response = await fetch(`${baseUrl}/brands/my`, {
        method : "GET",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    return data;
}

export async function postSignUp(signUpData) {
    let csrftoken = getCookie('csrftoken');
    let response = await fetch(`${baseUrl}/users/create` , {
        method : "POST",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
            "X-CSRFToken": csrftoken,
        },
        body : JSON.stringify(signUpData),
    });
    let data = await response.json();
    return data;
}

export async function getInactiveUser() {
    let response = await fetch(`${baseUrl}/users/inactive`, {
        method : "GET",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    return data;
}

export async function getUserDetail(userPk) {
    let response = await fetch(`${baseUrl}/users/update/${userPk}`, {
        method : "GET",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    return data;
}

export async function putUser(userPk, updateData) {
    let csrftoken = getCookie('csrftoken');
    let response = await fetch(`${baseUrl}/users/update/${userPk}` , {
        method : "PUT",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
            "X-CSRFToken": csrftoken,
        },
        body : JSON.stringify(updateData),
    });
    let data = await response.json();
    return data;
}

export async function deleteUser(userPk) {
    let csrftoken = getCookie('csrftoken');
    let response = await fetch(`${baseUrl}/users/update/${userPk}`, {
        method : "DELETE",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
            "X-CSRFToken": csrftoken,
        },
    });
    if(response.ok) {
        return;
    }
}

export async function getAllUsers() {
    let response = await fetch(`${baseUrl}/brands/create`, {
        method : "GET",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    return data;
}

export async function postBrand(brandData) {
    let csrftoken = getCookie('csrftoken');
    let response = await fetch(`${baseUrl}/brands/create` , {
        method : "POST",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
            "X-CSRFToken": csrftoken,
        },
        body : JSON.stringify(brandData),
    });
    let data = await response.json();
    return data;
}