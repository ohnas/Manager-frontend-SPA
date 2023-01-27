import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl, getCookie } from "../api";

function Header() {
    const [permission, setPermission] = useState(false);
    const [user, setUser] = useState({});
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
        <>
            <div className="flex justify-between h-28 items-center border-b-2">
                <span className="text-5xl">Manager</span>
                <div className="flex space-x-4 items-center">
                    { permission ? 
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
            {permission ?
                <div className="flex flex-col mt-32 justify-center items-center">
                    <Link to={"brand"}>
                        <span>Go to Brand &rarr;</span>
                    </Link>
                </div>
            : 
                <div className="flex flex-col mt-32 justify-center items-center">
                    <form className="flex flex-col justify-center items-center" onSubmit={onLogIn}>         
                        <span className="text-3xl mb-10">Log in to your account</span>
                        <label htmlFor="idfield">ID</label>
                        <input required onChange={onChange} id="idfield" name="username" type={"text"} className="border-2 rounded-md w-72 border-gray-200 mb-5" />
                        <label htmlFor="pwfield">PASSWORD</label>
                        <input required onChange={onChange} id="pwfield" name="password" type={"password"} className="border-2 rounded-md w-72 border-gray-200 mb-5" />
                        <button className="border-solid border-2 rounded-md w-72 h-12 bg-purple-700 text-white">Log In</button>
                    </form>
                </div>
            }
        </>
    );
}

export default Header;