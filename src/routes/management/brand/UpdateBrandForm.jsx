import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { baseUrl, getCookie } from "../../../api";

function UpdateBrandForm() {
    const { 
        userData:[user],
    } = useOutletContext();
    const navigate = useNavigate();
    let {brandPk} = useParams();
    const [brandDetail, setBrandDetail] = useState({});
    const [userList, setUserList] = useState([]);
    const { register, handleSubmit } = useForm();
    function goHome() {
        if(user.is_staff === false) {
            alert("이용 할 수 없는 페이지 입니다");
            return navigate("/");
        }
    }
    async function getBrandDetail() {
        let response = await fetch(`${baseUrl}/brands/update/${brandPk}`, {
            method : "GET",
            credentials: "include",
            headers : {
                'Content-Type': 'application/json',
            },
        });
        let data = await response.json();
        setBrandDetail(data);
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
    async function onSubmit(updateData) {
        if(updateData.name === "") {
            delete updateData.name;
        }
        if(updateData.description === "") {
            delete updateData.description;
        }
        if(updateData.user === "") {
            delete updateData.user;
        }
        let csrftoken = getCookie('csrftoken');
        let response = await fetch(`${baseUrl}/brands/update/${brandPk}` , {
            method : "PUT",
            credentials: "include",
            headers : {
                'Content-Type': 'application/json',
                "X-CSRFToken": csrftoken,
            },
            body : JSON.stringify(updateData),
        });
        let data = await response.json();
        if (data.name[0] === "brand with this name already exists.") {
            alert("중복된 브랜드 이름 입니다.");
        } else{
            setBrandDetail(data);
        }
    }
    async function onDelete() {
        let csrftoken = getCookie('csrftoken');
        let response = await fetch(`${baseUrl}/brands/update/${brandPk}`, {
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
        getBrandDetail();
    }, []);
    useEffect(() => {
        handleUserList();
    }, []);
    return (
        <>
            {user.is_staff ?
                    <>
                        {Object.keys(brandDetail).length === 0 ? 
                                null
                            :
                                <>
                                    <div className="mt-24 flex justify-center items-center">
                                        <div className="flex flex-col border-2 w-80 h-80 justify-center items-center rounded-md shadow-md">
                                            <label htmlFor="name">NAME</label>
                                            <span id="name" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">{brandDetail.name}</span>
                                            <label htmlFor="description">DESCRIPTION</label>
                                            <span id="description" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">{brandDetail.description}</span>
                                            <label htmlFor="user">BM</label>
                                            <span id="user" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">{brandDetail.user.name}</span>
                                        </div>
                                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center border-2 w-80 h-80 rounded-md shadow-md">
                                            <label htmlFor="name">NAME</label>
                                            <input {...register("name")} id="name" type="text" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                                            <label htmlFor="description">DESCRIPTION</label>
                                            <input {...register("description")} id="description" type="text" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                                            <select {...register("user")} id="user" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">
                                                <option value="">BM</option>
                                                {userList.map((user) => 
                                                    <option key={user.pk} value={user.pk}>{user.name}</option>
                                                )}
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

export default UpdateBrandForm;