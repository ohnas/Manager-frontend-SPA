import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useQuery, useMutation } from '@tanstack/react-query'
import { getAllBrandList, postSite } from "../../../api";

function CreateSite() {
    const { userData } = useOutletContext();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const { isLoading, data: allBrandListData } = useQuery(['AllBrandList'], getAllBrandList,
        {
            refetchOnWindowFocus: false,
        }
    );
    const mutation = useMutation(postSite, 
        {
            onSuccess: () => {
                alert("옵션 생성 완료");
                navigate("/");
            }
        }
    )
    function createSite(siteData) {
        siteData.name = siteData.name.trim();
        siteData.apiKey = siteData.apiKey.trim();
        siteData.secretKey = siteData.secretKey.trim();
        siteData.adAccountId = siteData.adAccountId.trim();
        mutation.mutate(siteData);
    }
    useEffect(() => {
        if(userData.is_staff === false) {
            alert("이용 할 수 없는 페이지 입니다");
            return navigate("/");
        }
    }, [userData]);
    return (
        <div className="flex flex-col mt-20 justify-center items-center">
            {userData.is_staff ?
                <>
                    {isLoading ? 
                        <span>Loading...</span>
                        :
                        <form onSubmit={handleSubmit(createSite)} className="flex flex-col justify-center items-center">
                            <label htmlFor="name">NAME</label>
                            <input {...register("name", {required: true})} id="name" type="text" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                            <label htmlFor="url">URL</label>
                            <input {...register("url")} id="url" type="url" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                            <label htmlFor="apiKey">API KEY</label>
                            <input {...register("apiKey")} id="apiKey" type="text" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                            <label htmlFor="secretKey">SECRET KEY</label>
                            <input {...register("secretKey")} id="secretKey" type="text" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                            <label htmlFor="adAccountId">AD ACCOUNT ID</label>
                            <input {...register("adAccountId")} id="adAccountId" type="text" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                            <select {...register("brand", {required: true})} id="brand" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">
                                <option value="">BRAND</option>
                                {allBrandListData.map((brand) => 
                                    <option key={brand.pk} value={brand.pk}>{brand.name}</option>
                                )}
                            </select>
                            <select {...register("kind", {required: true})} id="kind" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">
                                <option value="">KIND</option>
                                <option value={"sale_site"}>판매</option>
                                <option value={"advertising_site"}>광고</option>
                            </select>
                            <button className="w-56 h-12 hover:border-b-2 border-purple-500">CREATE</button>
                        </form>
                    }
                </>
                :
                null
            }
        </div>
    );
}

export default CreateSite;