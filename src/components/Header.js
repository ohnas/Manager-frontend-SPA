import { useEffect, useState } from "react";
import { baseUrl, getCookie } from "../api";
import LogIn from "./LogIn";

function Header() {
    const [permission, setPermission] = useState(false);
    const [isLogIn, setIsLogIn] = useState(false);
    const [user, setUser] = useState({});
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
            setIsLogIn(true);
            setUser(data);
        }
    }
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
        } else {
            alert("확인해주세요");
        }
    }
    useEffect(() => {
        userProfile();
    }, [permission, isLogIn]);
    return (
        <div>
            <div className="flex justify-between h-28 items-center border-b-2">
                <span className="text-5xl">Manager</span>
                <div className="flex space-x-4 items-center">
                    {permission ? 
                        <>
                            <span className="w-24">{user.name}</span>
                            {user.is_staff ? <button className="border-solid border-2 rounded-md w-32 h-12 border-purple-300 text-black">Management</button>: null}
                            <button className="border-solid border-2 rounded-md w-28 h-12 bg-purple-600 text-white" onClick={logOut}>Log Out</button> 
                        </> :
                        <>
                            <button className="border-solid border-2 rounded-md w-28 h-12 bg-purple-600 text-white">Sign Up</button>
                        </>
                    }
                </div>
            </div>
            <LogIn permission={permission} isLogIn={isLogIn} />
        </div>
    );
}

export default Header;