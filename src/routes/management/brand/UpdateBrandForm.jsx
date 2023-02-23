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
    const [updateForm, setUpdateForm] = useState("");
    const { register, handleSubmit } = useForm();
    function goHome() {
        if(user.is_staff === false) {
            alert("이용 할 수 없는 페이지 입니다");
            return navigate("/");
        }
    }
    function updateBtn(event) {
        setUpdateForm(event.target.value);
    }
    function cancleBtn(event) {
        setUpdateForm(event.target.value);
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
    async function onSubmit(updateData) {
        if(updateData.name === "") {
            delete updateData.name;
        }
        if(updateData.description === "") {
            delete updateData.description;
        }
        console.log(updateData);
        // let csrftoken = getCookie('csrftoken');
        // let response = await fetch(`${baseUrl}/brands/update/${brandPk}` , {
        //     method : "PUT",
        //     credentials: "include",
        //     headers : {
        //         'Content-Type': 'application/json',
        //         "X-CSRFToken": csrftoken,
        //     },
        //     body : JSON.stringify(updateData),
        // });
        // let data = await response.json();
        // setBrandDetail(data);
        // setUpdateForm("");
    }
    useEffect(() => {
        goHome();
    }, [user]);
    useEffect(() => {
        getBrandDetail();
    }, []);
    return (
        <div className="mt-24">
            {user.is_staff ?
                    <>
                        {Object.keys(brandDetail).length === 0 ? 
                                null
                            :
                                <div className="flex justify-around">
                                    <div className="border-2 rounded-md w-72 border-gray-200 text-center relative shadow-md">
                                        <div className="absolute left-2 -top-4 bg-white text-xl">
                                            <span>NAME</span>
                                        </div>
                                        <div className="absolute right-2 -bottom-3 bg-white">
                                            {updateForm === "" ? 
                                                    <button onClick={updateBtn} value="brandName" className="text-gray-400 mt-2 hover:text-purple-400">update</button>
                                                :
                                                    <button onClick={cancleBtn} value="" className="text-gray-400 mt-2 hover:text-purple-400">cancle</button>
                                            }
                                        </div>
                                        <div className="flex flex-col justify-center items-center mt-5 mb-5">
                                            <span>{brandDetail.name}</span>
                                            {updateForm === "" ? 
                                                    null
                                                :
                                                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-5">
                                                        <input {...register("name")} id="name" type="text" className="border-2 rounded-md w-52 border-gray-200" />
                                                        <button className="text-violet-600">save</button>
                                                    </form>
                                            }
                                        </div>
                                    </div>
                                    <div className="border-2 rounded-md w-72 border-gray-200 text-center relative shadow-md">
                                        <div className="absolute left-2 -top-4 bg-white text-xl">
                                            <span>DESCRIPTION</span>
                                        </div>
                                        <div className="absolute right-2 -bottom-3 bg-white">
                                            {updateForm === "" ? 
                                                    <button onClick={updateBtn} value="brandDescription" className="text-gray-400 mt-2 hover:text-purple-400">update</button>
                                                :
                                                    <button onClick={cancleBtn} value="" className="text-gray-400 mt-2 hover:text-purple-400">cancle</button>
                                            }
                                        </div>
                                        <div className="flex flex-col justify-center items-center mt-5 mb-5">
                                            <span>{brandDetail.description}</span>
                                            {updateForm === "" ? 
                                                    null
                                                :
                                                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-5">
                                                        <input {...register("description")} id="description" type="text" className="border-2 rounded-md w-52 border-gray-200" />
                                                        <button className="text-violet-600">save</button>
                                                    </form>
                                            }
                                        </div>
                                    </div>
                                    <span>{brandDetail.user.name}</span>
                                </div>
                        }
                    </>
                :
                    null
            }
        </div>
    );
}

export default UpdateBrandForm;