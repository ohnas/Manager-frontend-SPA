import { useState } from "react";
import { baseUrl, getCookie } from "../api";

function LogIn({permission, isLogIn}) {
    const [logInData, setLogInData] = useState();
    function onChange(event) {
        setLogInData({
            ...logInData,
            [event.target.name]: event.target.value,
        });
    }
    async function onLogIn(event) {
        event.preventDefault();
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
        if (response.ok) {
            setLogInData("");
        } else {
            alert("id 와 pw 를 확인하세요")
        }
    }
    return (
        <div className="flex flex-col mt-32 justify-center items-center">
            <form className="flex flex-col justify-center items-center" onSubmit={onLogIn}>
                {(permission && isLogIn) ?
                    <>
                        <h1>welcome</h1>
                    </> :
                    <>               
                        <span className="text-3xl mb-10">Log in to your account</span>
                        <label htmlFor="idfield">ID</label>
                        <input required onChange={onChange} id="idfield" name="username" type={"text"} className="border-2 rounded-md w-72 border-gray-200 mb-5" />
                        <label htmlFor="pwfield">PASSWORD</label>
                        <input required onChange={onChange} id="pwfield" name="password" type={"password"} className="border-2 rounded-md w-72 border-gray-200 mb-5" />
                        <button className="border-solid border-2 rounded-md w-72 h-12 bg-purple-700 text-white">Log In</button>
                    </>
                }
            </form>
        </div>
    );
}

export default LogIn;