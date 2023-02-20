import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import { baseUrl, getCookie } from "../../../api";

function CreateSite() {
    const { 
        userData:[user],
    } = useOutletContext();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [brandList, setBrandList] = useState([]);
    function goHome() {
        if(user.is_staff === false) {
            alert("이용 할 수 없는 페이지 입니다");
            return navigate("/");
        }
    }
    async function handleBrandList() {
        let response = await fetch(`${baseUrl}/sites/create`, {
            method : "GET",
            credentials: "include",
            headers : {
                'Content-Type': 'application/json',
            },
        });
        let data = await response.json();
        setBrandList(data);
    }
    async function onSubmit(siteData) {
        let csrftoken = getCookie('csrftoken');
        let response = await fetch(`${baseUrl}/sites/create` , {
            method : "POST",
            credentials: "include",
            headers : {
                'Content-Type': 'application/json',
                "X-CSRFToken": csrftoken,
            },
            body : JSON.stringify(siteData),
        });
        let data = await response.json();
        if (response.ok) {
            alert("사이트 생성 완료");
            return navigate("/");
        } else {
            alert("입력 항목을 확인하세요");
        }
    }
    useEffect(() => {
        goHome();
    }, [user]);
    useEffect(() => {
        handleBrandList();
    }, []);
    return (
        <div className="flex flex-col mt-20 justify-center items-center">
            {user.is_staff ? 
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center">
                    <label htmlFor="name">NAME</label>
                    <input {...register("name", {required: true})} id="name" type="text" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                    <label htmlFor="url">URL</label>
                    <input {...register("url", {required: true})} id="url" type="url" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                    <label htmlFor="apiKey">API KEY</label>
                    <input {...register("apiKey")} id="apiKey" type="text" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                    <label htmlFor="secretKey">SECRET KEY</label>
                    <input {...register("secretKey")} id="secretKey" type="text" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                    <label htmlFor="adAccountId">AD ACCOUNT ID</label>
                    <input {...register("adAccountId")} id="adAccountId" type="text" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                    <select {...register("brand", {required: true})} id="brand" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">
                        <option>BRAND</option>
                        {brandList.map((brand) => 
                            <option key={brand.pk} value={brand.pk}>{brand.name}</option>
                        )}
                    </select>
                    <select {...register("kind", {required: true})} id="kind" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">
                        <option>KIND</option>
                        <option value={"sale_site"}>판매</option>
                        <option value={"advertising_site"}>광고</option>
                    </select>
                    <button className="w-56 h-12 hover:border-b-2 border-purple-500">CREATE</button>
                </form>
                :
                    null
            }
        </div>
    );
}

export default CreateSite;