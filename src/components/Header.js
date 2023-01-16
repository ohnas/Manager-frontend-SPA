import { useEffect, useState } from "react";
import { baseUrl } from "../api";

function Header() {
    const [permission, setPermission] = useState(true);
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
        if (!response.ok) {
            setPermission(false);
        } else {
            setUser(data);
        }
    }
    useEffect(() => {
        userProfile();
    }, []);
    return (
        <div className="flex justify-between h-28 items-center border-b-2">
            <span className="text-5xl">Manager</span>
            <div className="flex justify-evenly w-52 h-12 items-center">
                {permission ? 
                    <>
                        <span className="w-28">{user.username}</span>
                        <button className="border-solid border-2 rounded-md w-28 bg-violet-600 text-white">Log Out</button> 
                    </> :
                    <>
                        <button className="w-28">Log In</button>
                        <button className="border-solid border-2 rounded-md w-28 bg-violet-600 text-white">Sign Up</button>
                    </>
                }
            </div>
        </div>
    );
}

export default Header;