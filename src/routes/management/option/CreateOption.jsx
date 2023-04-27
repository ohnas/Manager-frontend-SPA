import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useQuery, useMutation } from '@tanstack/react-query'
import { getAllProducts, postOption } from "../../../api";

function CreateOption() {
    const { userData } = useOutletContext();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const { isLoading, data: allProductsData } = useQuery(['AllProducts'], getAllProducts,
        {
            refetchOnWindowFocus: false,
        }
    );
    const mutation = useMutation(postOption, 
        {
            onSuccess: (data) => {
                if (data.name[0] === "options with this name already exists.") {
                    alert("이미 등록된 옵션 입니다.");
                } else {
                    alert("옵션 생성 완료");
                    navigate("/");
                }
            }
        }
    )
    function createOption(optionData) {
        optionData.name = optionData.name.trim();
        mutation.mutate(optionData);
    }
    useEffect(() => {
        if(userData.is_staff === false) {
            alert("이용 할 수 없는 페이지 입니다");
            return navigate("/");
        }
    }, [userData]);
    return (
        <div className="flex flex-col mt-8 justify-center items-center">
            {userData.is_staff ?
                <>
                    {isLoading ?
                        <span>Loading...</span>
                        :
                        <form onSubmit={handleSubmit(createOption)} className="flex flex-col justify-center items-center">
                            <label htmlFor="name">NAME</label>
                            <input {...register("name", {required: true})} id="name" type="text" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                            <label htmlFor="price">PRICE</label>
                            <input {...register("price", {required: true})} id="price" type="number" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                            <label htmlFor="logistic_fee">LOGISTIC FEE</label>
                            <input {...register("logistic_fee", {required: true})} id="logistic_fee" type="number" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                            <label htmlFor="quantity">QUANTITY</label>
                            <input {...register("quantity", {required: true})} id="quantity" type="number" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                            <label htmlFor="gift_quantity">GIFT QUANTITY</label>
                            <input {...register("gift_quantity")} id="gift_quantity" type="number" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                            <select {...register("product", {required: true})} id="product" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">
                                <option value="">PRODUCT</option>
                                {allProductsData.map((product) => 
                                    <option key={product.pk} value={product.pk}>{product.name}</option>
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

export default CreateOption;