import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { baseUrl, getCookie } from "../../../api";

function UpdateSiteForm() {
    const { 
        userData:[user],
    } = useOutletContext();
    const navigate = useNavigate();
    let {optionPk} = useParams();
    const [optionDetail, setOptionDetail] = useState({});
    const [productList, setProductList] = useState([]);
    const { register, handleSubmit } = useForm();
    function goHome() {
        if(user.is_staff === false) {
            alert("이용 할 수 없는 페이지 입니다");
            return navigate("/");
        }
    }
    async function getOptionDetail() {
        let response = await fetch(`${baseUrl}/products/update/option/${optionPk}`, {
            method : "GET",
            credentials: "include",
            headers : {
                'Content-Type': 'application/json',
            },
        });
        let data = await response.json();
        setOptionDetail(data);
    }
    async function handleProductList() {
        let response = await fetch(`${baseUrl}/products/create/option`, {
            method : "GET",
            credentials: "include",
            headers : {
                'Content-Type': 'application/json',
            },
        });
        let data = await response.json();
        setProductList(data);
    }
    async function onSubmit(updateData) {
        if(updateData.name === "") {
            delete updateData.name;
        }
        if(updateData.price === "") {
            delete updateData.price;
        }
        if(updateData.logistic_fee === "") {
            delete updateData.logistic_fee;
        }
        if(updateData.quantity === "") {
            delete updateData.quantity;
        }
        if(updateData.gift_quantity === "") {
            delete updateData.gift_quantity;
        }
        if(updateData.product === "") {
            delete updateData.product;
        }
        let csrftoken = getCookie('csrftoken');
        let response = await fetch(`${baseUrl}/products/update/option/${optionPk}` , {
            method : "PUT",
            credentials: "include",
            headers : {
                'Content-Type': 'application/json',
                "X-CSRFToken": csrftoken,
            },
            body : JSON.stringify(updateData),
        });
        let data = await response.json();
        if (data.name[0] === "options with this name already exists.") {
            alert("이미 등록된 옵션 입니다.");
        } else{
            setOptionDetail(data);
        }
    }
    useEffect(() => {
        goHome();
    }, [user]);
    useEffect(() => {
        getOptionDetail();
    }, []);
    useEffect(() => {
        handleProductList();
    }, []);
    return (
        <div className="mt-12 flex justify-center items-center">
            {user.is_staff ?
                    <>
                        {Object.keys(optionDetail).length === 0 ? 
                                null
                            :
                                <>
                                    <div className="flex flex-col border-2 w-80 justify-center items-center rounded-md shadow-md">
                                        <label htmlFor="name">NAME</label>
                                        <span id="name" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">{optionDetail.name}</span>
                                        <label htmlFor="price">PRICE</label>
                                        <span id="price" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">{optionDetail.price}</span>
                                        <label htmlFor="logistic_fee">LOGISTIC COST</label>
                                        <span id="logistic_fee" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">{optionDetail.logistic_fee}</span>
                                        <label htmlFor="quantity">QUANTITY</label>
                                        <span id="quantity" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">{optionDetail.quantity}</span>
                                        <label htmlFor="gift_quantity">GIFT QUANTITY</label>
                                        <span id="gift_quantity" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">{optionDetail.gift_quantity}</span>
                                        <label htmlFor="product">PRODUCT</label>
                                        <span id="product" className="border-2 rounded-md w-72 border-gray-200 mb-5 text-center">{optionDetail.product.name}</span>
                                    </div>
                                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center border-2 w-80 rounded-md shadow-md">
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
                                        <select {...register("product")} id="product" className="border-2 rounded-md w-72 border-gray-200 mb-5 text-center">
                                            <option value="">PRODUCT</option>
                                            {productList.map((product) => 
                                                <option key={product.pk} value={product.pk}>{product.name}</option>
                                            )}
                                        </select>
                                        <button className="w-56 h-12 hover:border-b-2 border-purple-500">UPDATE</button>
                                    </form>
                                </>
                        }
                    </>
                :
                    null
            }
        </div>
    );
}

export default UpdateSiteForm;