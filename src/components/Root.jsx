import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { baseUrl, getCookie } from "../api";
import Header from "./Header";

function Root() {
    const [permission, setPermission] = useState(false);
    const [user, setUser] = useState({});
    const [brandName, setBrandName] = useState();
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
            setBrandName("");
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
            <Header permission={permission} user={user} logOut={logOut} brandName={brandName} />
            <Outlet context={{
                        isPermission:[permission, setPermission],
                        userData:[user],
                        brandName: [setBrandName],
                    }
                } />
        </div>
    );
}

export default Root;