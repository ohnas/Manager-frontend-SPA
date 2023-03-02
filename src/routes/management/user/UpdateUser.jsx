import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { baseUrl } from "../../../api";

function UpdateUser() {
    const { 
        userData:[user],
    } = useOutletContext();
    const navigate = useNavigate();
    const [userList, setUserList] = useState([]);
    function goHome() {
        if(user.is_staff === false) {
            alert("이용 할 수 없는 페이지 입니다");
            return navigate("/");
        }
    }
    async function handleUserList() {
        let response = await fetch(`${baseUrl}/users/inactive`, {
            method : "GET",
            credentials: "include",
            headers : {
                'Content-Type': 'application/json',
            },
        });
        let data = await response.json();
        setUserList(data);
    }
    useEffect(() => {
        goHome();
    }, [user]);
    useEffect(() => {
        handleUserList();
    }, []);
    return (
        <div className="flex flex-col mt-12 justify-center items-center">
            {user.is_staff ? 
                    <ul>
                        {userList.map((user) =>
                            <Link to={`/management/manageuser/update/${user.pk}`} key={user.pk}>
                                <li className="mb-10">{user.name}</li>
                            </Link>
                        )}
                    </ul>
                :
                    null
            }
        </div>
    );
}

export default UpdateUser;