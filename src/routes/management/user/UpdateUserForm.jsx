import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { baseUrl, getCookie } from "../../../api";

function UpdateUserForm() {
    const { 
        userData:[user],
    } = useOutletContext();
    const navigate = useNavigate();
    let {userPk} = useParams();
    const [userDetail, setUserDetail] = useState({});
    const { register, handleSubmit } = useForm();
    function goHome() {
        if(user.is_staff === false) {
            alert("이용 할 수 없는 페이지 입니다");
            return navigate("/");
        }
    }
    async function getUserDetail() {
        let response = await fetch(`${baseUrl}/users/update/${userPk}`, {
            method : "GET",
            credentials: "include",
            headers : {
                'Content-Type': 'application/json',
            },
        });
        let data = await response.json();
        setUserDetail(data);
    }
    async function onSubmit(updateData) {
        let csrftoken = getCookie('csrftoken');
        let response = await fetch(`${baseUrl}/users/update/${userPk}` , {
            method : "PUT",
            credentials: "include",
            headers : {
                'Content-Type': 'application/json',
                "X-CSRFToken": csrftoken,
            },
            body : JSON.stringify(updateData),
        });
        let data = await response.json();
        if(response.ok) {
            setUserDetail(data);
        }
    }
    async function onDelete() {
        let csrftoken = getCookie('csrftoken');
        let response = await fetch(`${baseUrl}/users/update/${userPk}`, {
            method : "DELETE",
            credentials: "include",
            headers : {
                'Content-Type': 'application/json',
                "X-CSRFToken": csrftoken,
            },
        });
        if(response.ok){
            alert("삭제 완료");
            return navigate("/");
        }
    }
    useEffect(() => {
        goHome();
    }, [user]);
    useEffect(() => {
        getUserDetail();
    }, []);
    return (
        <>
            {user.is_staff ?
                    <>
                        {Object.keys(userDetail).length === 0 ? 
                                null
                            :
                                <>
                                    <div className="mt-12 flex justify-center items-center">
                                        <div className="flex flex-col border-2 w-80 h-60 justify-center items-center rounded-md shadow-md">
                                            <label htmlFor="name">NAME</label>
                                            <span id="name" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">{userDetail.name}</span>
                                            <label htmlFor="is_active">ACTIVE</label>
                                            {userDetail.is_active ? 
                                                    <span id="is_active" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">YES</span>
                                                :
                                                    <span id="is_active" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">NO</span>
                                            }
                                        </div>
                                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center border-2 w-80 h-60 rounded-md shadow-md">
                                            <select {...register("is_active", {required: true})} id="is_active" className="border-2 rounded-md w-72 border-gray-200 mt-10 mb-5 text-center">
                                                <option value="">STATUS</option>
                                                <option value={true}>active</option>
                                            </select>
                                            <button className="w-24 h-8 text-xs text-gray-400 hover:border-b-2 border-purple-400">UPDATE</button>
                                        </form>
                                    </div>
                                    <div className="flex justify-center mt-16 text-red-400">
                                        <button onClick={onDelete}>DELETE</button>
                                    </div>
                                </>
                        }
                    </>
                :
                    null
            }
        </>
    );
}

export default UpdateUserForm;