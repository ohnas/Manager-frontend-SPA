import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { baseUrl, getCookie } from "../api";
import Header from "./Header";

function Root() {
    const [permission, setPermission] = useState(false);
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    async function logOut() {
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
            alert("로그아웃");
            setPermission(false);
            return navigate("");
        }
    }
    async function userProfile() {
        let response = await fetch(`${baseUrl}/users`, {
            method : "GET",
            credentials: "include",
            headers : {
                'Content-Type': 'application/json',
            },
        });
        let data = await response.json();
        if (response.ok) {
            setPermission(true);
            setUser(data);
        }
      }
    useEffect(() => {
        userProfile();
    }, [permission]);
    return (
        <div>
            <Header permission={permission} user={user} logOut={logOut} />
            <Outlet context={[permission, setPermission]} />
        </div>
    );
}

export default Root;