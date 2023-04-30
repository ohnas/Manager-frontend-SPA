import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getBrandDetail, getAllUsers, putBrandDetail, deleteBrandDetail } from "../../../api";

function UpdateBrandForm() {
    const { userData } = useOutletContext();
    const navigate = useNavigate();
    let { brandPk } = useParams();
    const queryClient = useQueryClient();
    const { isLoading: brandDetailLoading, data: brandDetailData } = useQuery(['brandDetail', brandPk], () => getBrandDetail(brandPk),
        {
            refetchOnWindowFocus: false,
        }
    );
    const { isLoading: allUsersLoading, data: allUsersData } = useQuery(['AllUsers'], getAllUsers,
        {
            refetchOnWindowFocus: false,
        }
    );
    const { register, handleSubmit, reset } = useForm();
    const putMutation = useMutation((updateData) => putBrandDetail(brandPk, updateData),
        {
            onSuccess: () => {
                queryClient.refetchQueries(['brandDetail', brandPk]);
                reset(
                    {
                        "name":"",
                        "description":"",
                        "user":"",
                    }
                );
            }
        }
    );
    const deleteMutation = useMutation(() => deleteBrandDetail(brandPk),
        {
            onSuccess: () => {
                alert("삭제 완료");
                return navigate("/");
            }
        }
    );
    function updateBrand(updateData) {
        updateData.name = updateData.name.trim();
        updateData.description = updateData.description.trim();
        putMutation.mutate(updateData);
    }
    function delBrand() {
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
                    {brandDetailLoading ? 
                        <span>Loading...</span>
                        :
                        <>
                            <div className="mt-24 flex justify-center items-center">
                                <div className="flex flex-col border-2 w-80 h-80 justify-center items-center rounded-md shadow-md">
                                    <label htmlFor="name">NAME</label>
                                    <span id="name" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">{brandDetailData.name}</span>
                                    <label htmlFor="description">DESCRIPTION</label>
                                    <span id="description" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">{brandDetailData.description}</span>
                                    <label htmlFor="user">BM</label>
                                    <span id="user" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">{brandDetailData.user.name}</span>
                                </div>
                                <form onSubmit={handleSubmit(updateBrand)} className="flex flex-col justify-center items-center border-2 w-80 h-80 rounded-md shadow-md">
                                    <label htmlFor="name">NAME</label>
                                    <input {...register("name")} id="name" type="text" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                                    <label htmlFor="description">DESCRIPTION</label>
                                    <input {...register("description")} id="description" type="text" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                                    {allUsersLoading ? 
                                        null
                                        :
                                        <select {...register("user")} id="user" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">
                                            <option value="">BM</option>
                                            {allUsersData.map((user) => 
                                                <option key={user.pk} value={user.pk}>{user.name}</option>
                                            )}
                                        </select>
                                    }
                                    <button className="w-24 h-8 text-xs text-gray-400 hover:border-b-2 border-purple-400">UPDATE</button>
                                </form>
                            </div>
                            <div className="flex justify-center mt-16 text-red-400">
                                <button onClick={delBrand}>DELETE</button>
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