import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { baseUrl, getCookie } from "../api";
import LogIn from "../components/LogIn";

function Home() {
    const [permission, setPermission] = useOutletContext();
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
            setPermission(true);
        } else {
            alert("id 와 pw 를 확인하세요")
        }
    }
    return (
        <div>
            { permission ?
                <Link to={"branad"}>
                    <div className="flex flex-col mt-32 justify-center items-center">
                        <span>Go to Brand &rarr;</span>
                    </div>
                </Link>
            : 
                <LogIn onChange={onChange} onLogIn={onLogIn} />
            }
        </div>
    );
}

export default Home;