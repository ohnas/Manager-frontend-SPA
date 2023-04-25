import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getOptionDetail, getAllProducts, putOptionDetail, deleteOptionDetail } from "../../../api";

function UpdateOptionForm() {
    const { userData } = useOutletContext();
    const navigate = useNavigate();
    let { optionPk } = useParams();
    const queryClient = useQueryClient();
    const { isLoading: optionDetailLoading, data: optionDetailData } = useQuery(['optionDetail', optionPk], () => getOptionDetail(optionPk));
    const { isLoading: allProductsLoading, data: allProductsData } = useQuery(['AllProducts'], getAllProducts);
    const { register, handleSubmit, reset } = useForm();
    const putMutation = useMutation((updateData) => putOptionDetail(optionPk, updateData),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("optionDetail");
                reset(
                    {
                        "name":"",
                        "price":"",
                        "logistic_fee":"",
                        "quantity":"",
                        "gift_quantity":"",
                        "product":"",
                    }
                );
            }
        }
    );
    const deleteMutation = useMutation(() => deleteOptionDetail(optionPk),
        {
            onSuccess: () => {
                alert("삭제 완료");
                return navigate("/");
            }
        }
    );
    function updateOption(updateData) {
        updateData.name = updateData.name.trim();
        putMutation.mutate(updateData);
    }
    function delOption() {
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
                    {optionDetailLoading ? 
                        <span>Loading...</span>
                        :
                        <>
                            <div className="mt-12 flex justify-center items-center">
                                <div className="flex flex-col border-2 w-80 justify-center items-center rounded-md shadow-md">
                                    <label htmlFor="name">NAME</label>
                                    <span id="name" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">{optionDetailData.name}</span>
                                    <label htmlFor="price">PRICE</label>
                                    <span id="price" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">{optionDetailData.price}</span>
                                    <label htmlFor="logistic_fee">LOGISTIC COST</label>
                                    <span id="logistic_fee" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">{optionDetailData.logistic_fee}</span>
                                    <label htmlFor="quantity">QUANTITY</label>
                                    <span id="quantity" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">{optionDetailData.quantity}</span>
                                    <label htmlFor="gift_quantity">GIFT QUANTITY</label>
                                    <span id="gift_quantity" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">{optionDetailData.gift_quantity}</span>
                                    <label htmlFor="product">PRODUCT</label>
                                    <span id="product" className="border-2 rounded-md w-72 border-gray-200 mb-5 text-center">{optionDetailData.product.name}</span>
                                </div>
                                <form onSubmit={handleSubmit(updateOption)} className="flex flex-col justify-center items-center border-2 w-80 rounded-md shadow-md">
                                    <label htmlFor="name">NAME</label>
                                    <input {...register("name")} id="name" type="text" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                                    <label htmlFor="price">PRICE</label>
                                    <input {...register("price")} id="price" type="number" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                                    <label htmlFor="logistic_fee">LOGISTIC COST</label>
                                    <input {...register("logistic_fee")} id="logistic_fee" type="number" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                                    <label htmlFor="quantity">QUANTITY</label>
                                    <input {...register("quantity")} id="quantity" type="number" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                                    <label htmlFor="gift_quantity">GIFT QUANTITY</label>
                                    <input {...register("gift_quantity")} id="gift_quantity" type="number" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                                    {allProductsLoading ? 
                                        null
                                        :
                                        <select {...register("product")} id="product" className="border-2 rounded-md w-72 border-gray-200 mb-5 text-center">
                                            <option value="">PRODUCT</option>
                                            {allProductsData.map((product) => 
                                                <option key={product.pk} value={product.pk}>{product.name}</option>
                                            )}
                                        </select>
                                    }
                                    <button className="w-24 h-8 text-xs text-gray-400 hover:border-b-2 border-purple-400">UPDATE</button>
                                </form>
                            </div>
                            <div className="flex justify-center mt-16 text-red-400">
                                <button onClick={delOption}>DELETE</button>
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

export default UpdateOptionForm;