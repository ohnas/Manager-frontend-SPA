import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUserDetail, putUser, deleteUser } from "../../../api";

function UpdateUserForm() {
    const { userData } = useOutletContext();
    const navigate = useNavigate();
    let { userPk } = useParams();
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset } = useForm();
    const { isLoading, data: userDetailData } = useQuery(['userDetail', userPk], () => getUserDetail(userPk));
    const putMutation = useMutation((updateData) => putUser(userPk, updateData),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("userDetail");
                reset(
                    {
                        "is_active":"",
                    }
                );
            }
        }
    )
    const deleteMutation = useMutation(() => deleteUser(userPk),
        {
            onSuccess: () => {
                alert("삭제 완료");
                return navigate("/");
            }
        }
    )
    function updateUser(updateData) {
        putMutation.mutate(updateData);
    }
    function delUser() {
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
                    {isLoading? 
                        <span>Loading...</span>
                        :
                        <>
                            {Object.keys(userDetailData).length === 0 ? 
                                null
                                :
                                <>
                                    <div className="mt-12 flex justify-center items-center">
                                        <div className="flex flex-col border-2 w-80 h-60 justify-center items-center rounded-md shadow-md">
                                            <label htmlFor="name">NAME</label>
                                            <span id="name" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">{userDetailData.name}</span>
                                            <label htmlFor="is_active">ACTIVE</label>
                                            {userDetailData.is_active ? 
                                                    <span id="is_active" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">YES</span>
                                                :
                                                    <span id="is_active" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">NO</span>
                                            }
                                        </div>
                                        <form onSubmit={handleSubmit(updateUser)} className="flex flex-col justify-center items-center border-2 w-80 h-60 rounded-md shadow-md">
                                            <select {...register("is_active", {required: true})} id="is_active" className="border-2 rounded-md w-72 border-gray-200 mt-10 mb-5 text-center">
                                                <option value="">STATUS</option>
                                                <option value={true}>active</option>
                                            </select>
                                            <button className="w-24 h-8 text-xs text-gray-400 hover:border-b-2 border-purple-400">UPDATE</button>
                                        </form>
                                    </div>
                                    <div className="flex justify-center mt-16 text-red-400">
                                        <button onClick={delUser}>DELETE</button>
                                    </div>
                                </>
                            }
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