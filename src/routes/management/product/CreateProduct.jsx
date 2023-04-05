import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useQuery, useMutation } from '@tanstack/react-query'
import { getAllBrands, postProduct } from "../../../api";

function CreateProduct() {
    const { userData } = useOutletContext();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const { isLoading, data: allBrandsData } = useQuery(['AllBrands'], getAllBrands);
    const mutation = useMutation(postProduct, 
        {
            onSuccess: (data) => {
                if (data.name[0] === "product with this name already exists.") {
                    alert("이미 등록된 상품 입니다.");
                } else {
                    alert("상품 생성 완료");
                    navigate("/");
                }
            }
        }
    )
    function createProduct(productData) {
        mutation.mutate(productData);
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
                        <form onSubmit={handleSubmit(createProduct)} className="flex flex-col justify-center items-center">
                            <label htmlFor="name">PRODUCT NAME</label>
                            <input {...register("name", {required: true})} id="name" type="text" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                            <label htmlFor="cost">COST</label>
                            <input {...register("cost", {required: true})} id="cost" type="number" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                            <label htmlFor="price">PRICE</label>
                            <input {...register("price", {required: true})} id="price" type="number" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                            <label htmlFor="delivery_price">DELIVERY PRICE</label>
                            <input {...register("delivery_price", {required: true})} id="delivery_price" type="number" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                            <label htmlFor="logistic_fee">LOGISTIC FEE</label>
                            <input {...register("logistic_fee")} id="logistic_fee" type="number" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                            <label htmlFor="quantity">QUANTITY</label>
                            <input {...register("quantity")} id="quantity" type="number" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                            <label htmlFor="gift_quantity">GIFT QUANTITY</label>
                            <input {...register("gift_quantity")} id="gift_quantity" type="number" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                            <select {...register("brand", {required: true})} id="brand" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">
                                <option value="">BRAND</option>
                                {allBrandsData.map((brand) => 
                                    <option key={brand.pk} value={brand.pk}>{brand.name}</option>
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

export default CreateProduct;