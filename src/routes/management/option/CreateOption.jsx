import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import { baseUrl, getCookie } from "../../../api";

function CreateOption() {
    const { 
        userData:[user],
    } = useOutletContext();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [productList, setProductList] = useState([]);
    function goHome() {
        if(user.is_staff === false) {
            alert("이용 할 수 없는 페이지 입니다");
            return navigate("/");
        }
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
    async function onSubmit(optionData) {
        if(optionData.quantity === "") {
            optionData.quantity = 0;
        }
        if(optionData.gift_quantity === "") {
            optionData.gift_quantity = 0;
        }
        let csrftoken = getCookie('csrftoken');
        let response = await fetch(`${baseUrl}/products/create/option` , {
            method : "POST",
            credentials: "include",
            headers : {
                'Content-Type': 'application/json',
                "X-CSRFToken": csrftoken,
            },
            body : JSON.stringify(optionData),
        });
        let data = await response.json();
        if (data.name[0] === "options with this name already exists.") {
            alert("이미 등록된 옵션 입니다.");
        } else {
            alert("옵션 생성 완료");
            return navigate("/");
        }
    }
    useEffect(() => {
        goHome();
    }, [user]);
    useEffect(() => {
        handleProductList();
    }, []);
    return (
        <div className="flex flex-col mt-8 justify-center items-center">
            {user.is_staff ? 
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center">
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
                        <option>PRODUCT</option>
                        {productList.map((product) => 
                            <option key={product.pk} value={product.pk}>{product.name}</option>
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

export default CreateOption;