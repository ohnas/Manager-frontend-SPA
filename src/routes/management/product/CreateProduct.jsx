import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import { baseUrl, getCookie } from "../../../api";

function CreateProduct() {
    const { 
        userData:[user],
    } = useOutletContext();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [brandList, setBrandList] = useState([]);
    function goHome() {
        if(user.is_staff === false) {
            alert("이용 할 수 없는 페이지 입니다");
            return navigate("/");
        }
    }
    async function handleBrandList() {
        let response = await fetch(`${baseUrl}/products/create/product`, {
            method : "GET",
            credentials: "include",
            headers : {
                'Content-Type': 'application/json',
            },
        });
        let data = await response.json();
        setBrandList(data);
    }
    async function onSubmit(productData) {
        if(productData.quantity === "") {
            productData.quantity = 0;
        }
        if(productData.gift_quantity === "") {
            productData.gift_quantity = 0;
        }
        if(productData.logistic_fee === "") {
            productData.logistic_fee = 0;
        }
        let csrftoken = getCookie('csrftoken');
        let response = await fetch(`${baseUrl}/products/create/product` , {
            method : "POST",
            credentials: "include",
            headers : {
                'Content-Type': 'application/json',
                "X-CSRFToken": csrftoken,
            },
            body : JSON.stringify(productData),
        });
        let data = await response.json();
        if (data.name[0] === "product with this name already exists.") {
            alert("이미 등록된 상품 입니다.");
        } else {
            alert("상품 생성 완료");
            return navigate("/");
        }
    }
    useEffect(() => {
        goHome();
    }, [user]);
    useEffect(() => {
        handleBrandList();
    }, []);
    return (
        <div className="flex flex-col mt-8 justify-center items-center">
            {user.is_staff ? 
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center">
                    <label htmlFor="name">NAME</label>
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
                        {brandList.map((brand) => 
                            <option key={brand.pk} value={brand.pk}>{brand.name}</option>
                        )}
                    </select>
                    <button className="w-56 h-12 hover:border-b-2 border-purple-500">CREATE</button>
                </form>
                :
                    null
            }
        </div>
    );
}

export default CreateProduct;