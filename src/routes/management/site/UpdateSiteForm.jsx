import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getSiteDetail, getAllBrandList, putSiteDetail, deleteSiteDetail } from "../../../api";

function UpdateSiteForm() {
    const { userData } = useOutletContext();
    const navigate = useNavigate();
    let { sitePk } = useParams();
    const queryClient = useQueryClient();
    const { isLoading: siteDetailLoading, data: siteDetailData } = useQuery(['siteDetail', sitePk], () => getSiteDetail(sitePk));
    const { isLoading: allBrandListLoading, data: allBrandListData } = useQuery(['AllBrandList'], getAllBrandList);
    const { register, handleSubmit } = useForm();
    const putMutation = useMutation((updateData) => putSiteDetail(sitePk, updateData),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("siteDetail");
            }
        }
    );
    const deleteMutation = useMutation(() => deleteSiteDetail(sitePk),
        {
            onSuccess: () => {
                alert("삭제 완료");
                return navigate("/");
            }
        }
    );

    function updateSite(updateData) {
        updateData.name = updateData.name.trim();
        putMutation.mutate(updateData);
    }
    function delSite() {
        deleteMutation.mutate();
    }
    useEffect(() => {
        if(userData.is_staff === false) {
            alert("이용 할 수 없는 페이지 입니다");
            return navigate("/");
        }
    }, [userData]);
    return (
        <>
            {userData.is_staff ?
                <>
                    {siteDetailLoading ? 
                        <span>Loading...</span>
                        :
                        <>
                            <div className="mt-12 flex justify-center items-center">
                                <div className="flex flex-col border-2 w-80 justify-center items-center rounded-md shadow-md">
                                    <label htmlFor="name">NAME</label>
                                    <span id="name" className="border-2 rounded-md w-72 border-gray-200 mb-8 text-center">{siteDetailData.name}</span>
                                    <label htmlFor="url">URL</label>
                                    <span id="url" className="border-2 rounded-md w-72 border-gray-200 mb-8 text-center">{siteDetailData.url}</span>
                                    {siteDetailData.kind === "sale_site" ? 
                                        <>
                                            <label htmlFor="kind">KIND</label>
                                            <span id="kind" className="border-2 rounded-md w-72 border-gray-200 mb-8 text-center">판매</span>
                                        </>
                                        :
                                        null
                                    }
                                    {siteDetailData.kind === "advertising_site" ? 
                                        <>
                                            <label htmlFor="kind">KIND</label>
                                            <span id="kind" className="border-2 rounded-md w-72 border-gray-200 mb-8 text-center">광고</span>
                                        </>
                                        :
                                        null
                                    }
                                    <label htmlFor="brand">BRAND</label>
                                    <span id="brand" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">{siteDetailData.brand.name}</span>
                                </div>
                                <form onSubmit={handleSubmit(updateSite)} className="flex flex-col justify-center items-center border-2 w-80 rounded-md shadow-md">
                                    <label htmlFor="name">NAME</label>
                                    <input {...register("name")} id="name" type="text" className="border-2 rounded-md w-72 border-gray-200 mb-11" />
                                    <label htmlFor="url">URL</label>
                                    <input {...register("url")} id="url" type="url" className="border-2 rounded-md w-72 border-gray-200 mb-11" />
                                    <select {...register("kind")} id="kind" className="border-2 rounded-md w-72 border-gray-200 mb-11 text-center">
                                        <option value="">KIND</option>
                                        <option value={"sale_site"}>판매</option>
                                        <option value={"advertising_site"}>광고</option>
                                    </select>
                                    {allBrandListLoading ? 
                                        null
                                        :
                                        <select {...register("brand")} id="brand" className="border-2 rounded-md w-72 border-gray-200 mb-7 text-center">
                                            <option value="">BRAND</option>
                                            {allBrandListData.map((brand) => 
                                                <option key={brand.pk} value={brand.pk}>{brand.name}</option>
                                            )}
                                        </select>
                                    }
                                    <button className="w-24 h-8 text-xs text-gray-400 hover:border-b-2 border-purple-400">UPDATE</button>
                                </form>
                            </div>
                            <div className="flex justify-center mt-16 text-red-400">
                                <button onClick={delSite}>DELETE</button>
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