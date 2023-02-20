import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import { baseUrl, getCookie } from "../../../api";

function CreateBrand() {
    const { 
        userData:[user],
    } = useOutletContext();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [userList, setUserList] = useState([]);
    function goHome() {
        if(user.is_staff === false) {
            alert("이용 할 수 없는 페이지 입니다");
            return navigate("/");
        }
    }
    async function handleUserList() {
        let response = await fetch(`${baseUrl}/brands/create`, {
            method : "GET",
            credentials: "include",
            headers : {
                'Content-Type': 'application/json',
            },
        });
        let data = await response.json();
        setUserList(data);
    }
    async function onSubmit(brandData) {
        let csrftoken = getCookie('csrftoken');
        let response = await fetch(`${baseUrl}/brands/create` , {
            method : "POST",
            credentials: "include",
            headers : {
                'Content-Type': 'application/json',
                "X-CSRFToken": csrftoken,
            },
            body : JSON.stringify(brandData),
        });
        let data = await response.json();
        if (data.name[0] === "brand with this name already exists.") {
            alert("이미 등록된 브랜드 입니다.");
        } else {
            alert("브랜드 생성 완료");
            return navigate("/");
        }
    }
    useEffect(() => {
        goHome();
    }, [user]);
    useEffect(() => {
        handleUserList();
    }, []);
    return (
        <div className="flex flex-col mt-32 justify-center items-center">
            {user.is_staff ? 
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center">
                    <label htmlFor="name">NAME</label>
                    <input {...register("name", {required: true})} id="name" type="text" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                    <label htmlFor="description">DESCRIPTION</label>
                    <input {...register("description")} id="description" type="text" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                    <select {...register("user", {required: true})} id="user" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">
                        <option>BM</option>
                        {userList.map((user) => 
                            <option key={user.pk} value={user.pk}>{user.name}</option>
                        )}
                    </select>
                    <button className="w-56 h-12 hover:border-b-2 border-purple-500">CREATE</button>
                </form>
                :
                    null
            }
        </div>
    );
}

export default CreateBrand;