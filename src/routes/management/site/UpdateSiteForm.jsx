import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { baseUrl, getCookie } from "../../../api";

function UpdateSiteForm() {
    const { 
        userData:[user],
    } = useOutletContext();
    const navigate = useNavigate();
    let {sitePk} = useParams();
    const [siteDetail, setSiteDetail] = useState({});
    const [brandList, setBrandList] = useState([]);
    const { register, handleSubmit } = useForm();
    function goHome() {
        if(user.is_staff === false) {
            alert("이용 할 수 없는 페이지 입니다");
            return navigate("/");
        }
    }
    async function getSiteDetail() {
        let response = await fetch(`${baseUrl}/sites/update/${sitePk}`, {
            method : "GET",
            credentials: "include",
            headers : {
                'Content-Type': 'application/json',
            },
        });
        let data = await response.json();
        setSiteDetail(data);
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
    async function onSubmit(updateData) {
        if(updateData.name === "") {
            delete updateData.name;
        }
        if(updateData.url === "") {
            delete updateData.url;
        }
        if(updateData.kind === "") {
            delete updateData.kind;
        }
        if(updateData.brand === "") {
            delete updateData.brand;
        }
        let csrftoken = getCookie('csrftoken');
        let response = await fetch(`${baseUrl}/sites/update/${sitePk}` , {
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
            setSiteDetail(data);
        }
    }
    async function onDelete() {
        let csrftoken = getCookie('csrftoken');
        let response = await fetch(`${baseUrl}/sites/update/${sitePk}`, {
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
        getSiteDetail();
    }, []);
    useEffect(() => {
        handleBrandList();
    }, []);
    return (
        <>
            {user.is_staff ?
                    <>
                        {Object.keys(siteDetail).length === 0 ? 
                                null
                            :
                                <>
                                    <div className="mt-12 flex justify-center items-center">
                                        <div className="flex flex-col border-2 w-80 justify-center items-center rounded-md shadow-md">
                                            <label htmlFor="name">NAME</label>
                                            <span id="name" className="border-2 rounded-md w-72 border-gray-200 mb-8 text-center">{siteDetail.name}</span>
                                            <label htmlFor="url">URL</label>
                                            <span id="url" className="border-2 rounded-md w-72 border-gray-200 mb-8 text-center">{siteDetail.url}</span>
                                            {siteDetail.kind === "sale_site" ? 
                                                <>
                                                    <label htmlFor="kind">KIND</label>
                                                    <span id="kind" className="border-2 rounded-md w-72 border-gray-200 mb-8 text-center">판매</span>
                                                </>
                                                :
                                                null
                                            }
                                            {siteDetail.kind === "advertising_site" ? 
                                                <>
                                                    <label htmlFor="kind">KIND</label>
                                                    <span id="kind" className="border-2 rounded-md w-72 border-gray-200 mb-8 text-center">광고</span>
                                                </>
                                                :
                                                null
                                            }
                                            <label htmlFor="brand">BRAND</label>
                                            <span id="brand" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">{siteDetail.brand.name}</span>
                                        </div>
                                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center border-2 w-80 rounded-md shadow-md">
                                            <label htmlFor="name">NAME</label>
                                            <input {...register("name")} id="name" type="text" className="border-2 rounded-md w-72 border-gray-200 mb-11" />
                                            <label htmlFor="url">URL</label>
                                            <input {...register("url")} id="url" type="url" className="border-2 rounded-md w-72 border-gray-200 mb-11" />
                                            <select {...register("kind")} id="kind" className="border-2 rounded-md w-72 border-gray-200 mb-11 text-center">
                                                <option value="">KIND</option>
                                                <option value={"sale_site"}>판매</option>
                                                <option value={"advertising_site"}>광고</option>
                                            </select>
                                            <select {...register("brand")} id="brand" className="border-2 rounded-md w-72 border-gray-200 mb-7 text-center">
                                                <option value="">BRAND</option>
                                                {brandList.map((brand) => 
                                                    <option key={brand.pk} value={brand.pk}>{brand.name}</option>
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

export default UpdateSiteForm;