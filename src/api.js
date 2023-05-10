export const baseUrl = "https://backend.managertestapp.com/api/v1"

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

export async function getBrand(brandPk) {
    let response = await fetch(`${baseUrl}/brands/${brandPk}`, {
        method : "GET",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    return data;
}

export async function getRetrieve(brandPk, retrieveData) {
    if (retrieveData.dateTo < retrieveData.dateFrom) {
        alert("조회 조건을 확인하세요");
        return;
    } 
    let response = await fetch(`${baseUrl}/retrieves/?brandPk=${brandPk}&saleSite=${retrieveData.saleSite}&advertisingSite=${retrieveData.advertisingSite}&dateFrom=${retrieveData.dateFrom}&dateTo=${retrieveData.dateTo}`, {
        method : "GET",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    return data;
}

export async function getUnlisting(brandPk) {
    let response = await fetch(`${baseUrl}/retrieves/${brandPk}/unlisting`, {
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

export async function getBrandList() {
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

export async function getBrandDetail(brandPk) {
    let response = await fetch(`${baseUrl}/brands/update/${brandPk}`, {
        method : "GET",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    return data;
}

export async function putBrandDetail(brandPk, updateData) {
    if(updateData.name === "") {
        delete updateData.name;
    }
    if(updateData.description === "") {
        delete updateData.description;
    }
    if(updateData.user === "") {
        delete updateData.user;
    }
    let csrftoken = getCookie('csrftoken');
    let response = await fetch(`${baseUrl}/brands/update/${brandPk}` , {
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

export async function deleteBrandDetail(brandPk) {
    let csrftoken = getCookie('csrftoken');
    let response = await fetch(`${baseUrl}/brands/update/${brandPk}`, {
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

export async function getAllBrands() {
    let response = await fetch(`${baseUrl}/products/create/product`, {
        method : "GET",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    return data;
}

export async function postProduct(productData) {
    if(productData.quantity === "") {
        productData.quantity = 0;
    }
    if(productData.gift_quantity === "") {
        productData.gift_quantity = 0;
    }
    if(productData.logistic_fee === "") {
        productData.logistic_fee = 0;
    }
    let csrftoken = getCookie('csrftoken');
    let response = await fetch(`${baseUrl}/products/create/product` , {
        method : "POST",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
            "X-CSRFToken": csrftoken,
        },
        body : JSON.stringify(productData),
    });
    let data = await response.json();
    return data;
}

export async function getProductList(brandPk) {
    let response = await fetch(`${baseUrl}/products/${brandPk}`, {
        method : "GET",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    return data;
}

export async function getProductDetail(productPk) {
    let response = await fetch(`${baseUrl}/products/update/product/${productPk}`, {
        method : "GET",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    return data;
}

export async function putProductDetail(productPk, updateData) {
    if(updateData.name === "") {
        delete updateData.name;
    }
    if(updateData.price === "") {
        delete updateData.price;
    }
    if(updateData.delivery_price === "") {
        delete updateData.delivery_price;
    }
    if(updateData.cost === "") {
        delete updateData.cost;
    }
    if(updateData.logistic_fee === "") {
        delete updateData.logistic_fee;
    }
    if(updateData.quantity === "") {
        delete updateData.quantity;
    }
    if(updateData.gift_quantity === "") {
        delete updateData.gift_quantity;
    }
    if(updateData.brand === "") {
        delete updateData.brand;
    }
    let csrftoken = getCookie('csrftoken');
    let response = await fetch(`${baseUrl}/products/update/product/${productPk}` , {
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

export async function deleteProductDetail(productPk) {
    let csrftoken = getCookie('csrftoken');
    let response = await fetch(`${baseUrl}/products/update/product/${productPk}`, {
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

export async function getAllProducts() {
    let response = await fetch(`${baseUrl}/products/create/option`, {
        method : "GET",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    return data;
}

export async function postOption(optionData) {
    if(optionData.quantity === "") {
        optionData.quantity = 0;
    }
    if(optionData.gift_quantity === "") {
        optionData.gift_quantity = 0;
    }
    let csrftoken = getCookie('csrftoken');
    let response = await fetch(`${baseUrl}/products/create/option` , {
        method : "POST",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
            "X-CSRFToken": csrftoken,
        },
        body : JSON.stringify(optionData),
    });
    let data = await response.json();
    return data;
}

export async function getOptionList(optionPk) {
    let response = await fetch(`${baseUrl}/products/options/${optionPk}`, {
        method : "GET",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    return data;
}

export async function getOptionDetail(optionPk) {
    let response = await fetch(`${baseUrl}/products/update/option/${optionPk}`, {
        method : "GET",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    return data;
}

export async function putOptionDetail(optionPk, updateData) {
    if(updateData.name === "") {
        delete updateData.name;
    }
    if(updateData.price === "") {
        delete updateData.price;
    }
    if(updateData.logistic_fee === "") {
        delete updateData.logistic_fee;
    }
    if(updateData.quantity === "") {
        delete updateData.quantity;
    }
    if(updateData.gift_quantity === "") {
        delete updateData.gift_quantity;
    }
    if(updateData.product === "") {
        delete updateData.product;
    }
    let csrftoken = getCookie('csrftoken');
    let response = await fetch(`${baseUrl}/products/update/option/${optionPk}` , {
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

export async function deleteOptionDetail(optionPk) {
    let csrftoken = getCookie('csrftoken');
    let response = await fetch(`${baseUrl}/products/update/option/${optionPk}`, {
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

export async function getAllBrandList() {
    let response = await fetch(`${baseUrl}/sites/create`, {
        method : "GET",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    return data;
}

export async function postSite(siteData) {
    let csrftoken = getCookie('csrftoken');
    let response = await fetch(`${baseUrl}/sites/create` , {
        method : "POST",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
            "X-CSRFToken": csrftoken,
        },
        body : JSON.stringify(siteData),
    });
    let data = await response.json();
    return data;
}

export async function getSiteList(brandPk) {
    let response = await fetch(`${baseUrl}/sites/${brandPk}`, {
        method : "GET",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    return data;
}

export async function getSiteDetail(sitePk) {
    let response = await fetch(`${baseUrl}/sites/update/${sitePk}`, {
        method : "GET",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    return data;
}

export async function putSiteDetail(sitePk, updateData) {
    if(updateData.name === "") {
        delete updateData.name;
    }
    if(updateData.url === "") {
        delete updateData.url;
    }
    if(updateData.kind === "") {
        delete updateData.kind;
    }
    if(updateData.brand === "") {
        delete updateData.brand;
    }
    let csrftoken = getCookie('csrftoken');
    let response = await fetch(`${baseUrl}/sites/update/${sitePk}` , {
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

export async function deleteSiteDetail(sitePk) {
    let csrftoken = getCookie('csrftoken');
    let response = await fetch(`${baseUrl}/sites/update/${sitePk}`, {
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

export async function getEventsCount(brandPk, listOfDate) {
    let response = await fetch(`${baseUrl}/events/${brandPk}/count?dateFrom=${listOfDate[0]}&dateTo=${listOfDate[listOfDate.length - 1]}`, {
        method : "GET",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    return data;
}

export async function getEvents(brandPk, listOfDate) {
    let response = await fetch(`${baseUrl}/events/${brandPk}?dateFrom=${listOfDate[0]}&dateTo=${listOfDate[listOfDate.length - 1]}`, {
        method : "GET",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    return data;
}

export async function postEvent(brandPk, eventData) {
    let csrftoken = getCookie('csrftoken');
    let response = await fetch(`${baseUrl}/events/${brandPk}/create` , {
        method : "POST",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
            "X-CSRFToken": csrftoken,
        },
        body : JSON.stringify(eventData),
    });
    let data = await response.json();
    return data;
}

export async function putEvent(eventPk, eventData) {
    let csrftoken = getCookie('csrftoken');
    let response = await fetch(`${baseUrl}/events/update/${eventPk}`, {
        method : "PUT",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
            "X-CSRFToken": csrftoken,
        },
        body : JSON.stringify(eventData),
    });
    let data = await response.json();
    return data;
}

export async function deleteEvent(eventPk) {
    let csrftoken = getCookie('csrftoken');
    let response = await fetch(`${baseUrl}/events/update/${eventPk}`, {
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

export async function getPageView(brandPk, listOfDate) {
    let response = await fetch(`${baseUrl}/pages/${brandPk}?dateFrom=${listOfDate[0]}&dateTo=${listOfDate[listOfDate.length - 1]}`, {
        method : "GET",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    return data;
}

export async function postPageView(brandPk, pageViewData) {
    let csrftoken = getCookie('csrftoken');
    let response = await fetch(`${baseUrl}/pages/${brandPk}/create` , {
        method : "POST",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
            "X-CSRFToken": csrftoken,
        },
        body : JSON.stringify(pageViewData),
    });
    let data = await response.json();
    return data;
}

export async function putPageView(pageViewPk, pageViewData) {
    let csrftoken = getCookie('csrftoken');
    let response = await fetch(`${baseUrl}/pages/update/${pageViewPk}`, {
        method : "PUT",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
            "X-CSRFToken": csrftoken,
        },
        body : JSON.stringify(pageViewData),
    });
    let data = await response.json();
    return data;
}

export async function getVisit(brandPk, listOfDate) {
    let response = await fetch(`${baseUrl}/visits/${brandPk}?dateFrom=${listOfDate[0]}&dateTo=${listOfDate[listOfDate.length - 1]}`, {
        method : "GET",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
        },
    });
    let data = await response.json();
    return data;
}

export async function postVisit(brandPk, visitNumData) {
    let csrftoken = getCookie('csrftoken');
    let response = await fetch(`${baseUrl}/visits/${brandPk}/create` , {
        method : "POST",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
            "X-CSRFToken": csrftoken,
        },
        body : JSON.stringify(visitNumData),
    });
    let data = await response.json();
    return data;
}

export async function putVisit(visitNumPk, visitNumData) {
    let csrftoken = getCookie('csrftoken');
    let response = await fetch(`${baseUrl}/visits/update/${visitNumPk}`, {
        method : "PUT",
        credentials: "include",
        headers : {
            'Content-Type': 'application/json',
            "X-CSRFToken": csrftoken,
        },
        body : JSON.stringify(visitNumData),
    });
    let data = await response.json();
    return data;
}
