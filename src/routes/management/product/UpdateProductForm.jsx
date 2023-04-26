import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getProductDetail, getAllBrands, putProductDetail, deleteProductDetail } from "../../../api";

function UpdateProductForm() {
    const { userData } = useOutletContext();
    const navigate = useNavigate();
    let { productPk } = useParams();
    const queryClient = useQueryClient();
    const { isLoading: productDetailLoading, data: productDetailData } = useQuery(['productDetail', productPk], () => getProductDetail(productPk));
    const { isLoading: allBrandsLoading, data: allBrandsData } = useQuery(['AllBrands'], getAllBrands);
    const { register, handleSubmit, reset } = useForm();
    const putMutation = useMutation((updateData) => putProductDetail(productPk, updateData),
        {
            onSuccess: () => {
                queryClient.refetchQueries(['productDetail', productPk]);
                reset(
                    {
                        "name":"",
                        "price":"",
                        "delivery_price":"",
                        "cost":"",
                        "logistic_fee":"",
                        "quantity":"",
                        "gift_quantity":"",
                        "brand":"",
                    }
                );
            }
        }
    );
    const deleteMutation = useMutation(() => deleteProductDetail(productPk),
        {
            onSuccess: () => {
                alert("삭제 완료");
                return navigate("/");
            }
        }
    );
    function updateProduct(updateData) {
        updateData.name = updateData.name.trim();
        putMutation.mutate(updateData);
    }
    function delProduct() {
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
                    {productDetailLoading ? 
                        <span>Loading...</span>
                        :
                        <>
                            <div className="mt-6 flex justify-center items-center">
                                <div className="flex flex-col border-2 w-80 justify-center items-center rounded-md shadow-md">
                                    <label htmlFor="name">NAME</label>
                                    <span id="name" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">{productDetailData.name}</span>
                                    <label htmlFor="price">PRICE</label>
                                    <span id="price" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">{productDetailData.price}</span>
                                    <label htmlFor="delivery_price">DELIVERY PRICE</label>
                                    <span id="delivery_price" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">{productDetailData.delivery_price}</span>
                                    <label htmlFor="cost">COST</label>
                                    <span id="cost" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">{productDetailData.cost}</span>
                                    <label htmlFor="logistic_fee">LOGISTIC COST</label>
                                    <span id="logistic_fee" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">{productDetailData.logistic_fee}</span>
                                    <label htmlFor="quantity">QUANTITY</label>
                                    <span id="quantity" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">{productDetailData.quantity}</span>
                                    <label htmlFor="gift_quantity">GIFT QUANTITY</label>
                                    <span id="gift_quantity" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">{productDetailData.gift_quantity}</span>
                                    <label htmlFor="brand">BRAND</label>
                                    <span id="brand" className="border-2 rounded-md w-72 border-gray-200 mb-5 text-center">{productDetailData.brand.name}</span>
                                </div>
                                <form onSubmit={handleSubmit(updateProduct)} className="flex flex-col justify-center items-center border-2 w-80 rounded-md shadow-md">
                                    <label htmlFor="name">NAME</label>
                                    <input {...register("name")} id="name" type="text" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                                    <label htmlFor="price">PRICE</label>
                                    <input {...register("price")} id="price" type="number" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                                    <label htmlFor="delivery_price">DELIVERY PRICE</label>
                                    <input {...register("delivery_price")} id="delivery_price" type="number" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                                    <label htmlFor="cost">COST</label>
                                    <input {...register("cost")} id="cost" type="number" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                                    <label htmlFor="logistic_fee">LOGISTIC COST</label>
                                    <input {...register("logistic_fee")} id="logistic_fee" type="number" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                                    <label htmlFor="quantity">QUANTITY</label>
                                    <input {...register("quantity")} id="quantity" type="number" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                                    <label htmlFor="gift_quantity">GIFT QUANTITY</label>
                                    <input {...register("gift_quantity")} id="gift_quantity" type="number" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                                    {allBrandsLoading ?
                                        null
                                        :
                                        <select {...register("brand")} id="brand" className="border-2 rounded-md w-72 border-gray-200 mb-5 text-center">
                                            <option value="">BRAND</option>
                                            {allBrandsData.map((brand) => 
                                                <option key={brand.pk} value={brand.pk}>{brand.name}</option>
                                            )}
                                        </select>
                                    }
                                    <button className="w-24 h-8 text-xs text-gray-400 hover:border-b-2 border-purple-400">UPDATE</button>
                                </form>
                            </div>
                            <div className="flex justify-center mt-16 text-red-400">
                                <button onClick={delProduct}>DELETE</button>
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

export default UpdateProductForm;