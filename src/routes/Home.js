import { useEffect, useState } from "react";
import { baseUrl, getCookie } from "../api";
import Header from "../components/Header";
import LogIn from "../components/LogIn";

function Home() {
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
  }, [permission]);
  return (
    <div>
      <Header permission={permission} logOut={logOut} user={user}/>
      {permission ? 
        null
        : 
        <LogIn  onChange={onChange} onLogIn={onLogIn} />
      }
    </div>
  );
}

export default Home