import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useQuery, useMutation } from '@tanstack/react-query'
import { getAllUsers, postBrand } from "../../../api";

function CreateBrand() {
    const { userData } = useOutletContext();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const { isLoading, data: allUsersData } = useQuery(['AllUsers'], getAllUsers);
    const mutation = useMutation(postBrand, 
        {
            onSuccess: (data) => {
                if (data.name[0] === "brand with this name already exists.") {
                    alert("이미 등록된 브랜드 입니다.");
                } else {
                    alert("브랜드 생성 완료");
                    navigate("/");
                }
            }
        }
    )
    function createBrand(brandData) {
        brandData.name = brandData.name.trim();
        brandData.description = brandData.description.trim();
        mutation.mutate(brandData);
    }
    useEffect(() => {
        if(userData.is_staff === false) {
            alert("이용 할 수 없는 페이지 입니다");
            return navigate("/");
        }
    }, [userData]);
    return (
        <div className="flex flex-col mt-32 justify-center items-center">
            {userData.is_staff ?
                <>
                    {isLoading ? 
                        <span>Loading...</span>
                        :
                        <form onSubmit={handleSubmit(createBrand)} className="flex flex-col justify-center items-center">
                            <label htmlFor="name">BRAND NAME</label>
                            <input {...register("name", {required: true})} id="name" type="text" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                            <label htmlFor="description">DESCRIPTION</label>
                            <input {...register("description")} id="description" type="text" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                            <select {...register("user", {required: true})} id="user" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">
                                <option value="">BM</option>
                                {allUsersData.map((user) => 
                                    <option key={user.pk} value={user.pk}>{user.name}</option>
                                )}
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

export default CreateBrand;