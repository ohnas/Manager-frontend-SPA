import { useEffect } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useQuery } from '@tanstack/react-query'
import { getInactiveUser } from "../../../api";

function UpdateUser() {
    const { userData } = useOutletContext();
    const navigate = useNavigate();
    const { isLoading, data: inactiveUserData } = useQuery(['inactiveUser'], getInactiveUser);
    useEffect(() => {
        if(userData.is_staff === false) {
            alert("이용 할 수 없는 페이지 입니다");
            return navigate("/");
        }
    }, [userData]);
    return (
        <div className="flex flex-col mt-12 justify-center items-center">
            {userData.is_staff ?
                <>
                    {isLoading? 
                        <span>Loading...</span>
                        :
                        <>
                            {inactiveUserData.length === 0 ?
                                <span>There is no inactive user</span>
                                :
                                <ul>
                                    {inactiveUserData.map((user) =>
                                        <Link to={`/management/manageuser/update/${user.pk}`} key={user.pk}>
                                            <li className="mb-10">{user.name}</li>
                                        </Link>
                                    )}
                                </ul>
                            }
                        </>
                    }
                </>
                :
                null
            }
        </div>
    );
}

export default UpdateUser;