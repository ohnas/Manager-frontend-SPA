import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { baseUrl, getCookie } from "../../../api";

function UpdateProductForm() {
    const { 
        userData:[user],
    } = useOutletContext();
    const navigate = useNavigate();
    let {productPk} = useParams();
    const [productDetail, setProductDetail] = useState({});
    const [brandList, setBrandList] = useState([]);
    const { register, handleSubmit } = useForm();
    function goHome() {
        if(user.is_staff === false) {
            alert("이용 할 수 없는 페이지 입니다");
            return navigate("/");
        }
    }
    async function getProductDetail() {
        let response = await fetch(`${baseUrl}/products/update/product/${productPk}`, {
            method : "GET",
            credentials: "include",
            headers : {
                'Content-Type': 'application/json',
            },
        });
        let data = await response.json();
        setProductDetail(data);
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
    async function onSubmit(updateData) {
        if(updateData.name === "") {
            delete updateData.name;
        }
        if(updateData.price === "") {
            delete updateData.price;
        }
        if(updateData.delivery_price === "") {
            delete updateData.delivery_price;
        }
        if(updateData.cost === "") {
            delete updateData.cost;
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
        if(updateData.brand === "") {
            delete updateData.brand;
        }
        let csrftoken = getCookie('csrftoken');
        let response = await fetch(`${baseUrl}/products/update/product/${productPk}` , {
            method : "PUT",
            credentials: "include",
            headers : {
                'Content-Type': 'application/json',
                "X-CSRFToken": csrftoken,
            },
            body : JSON.stringify(updateData),
        });
        let data = await response.json();
        if (data.name[0] === "product with this name already exists.") {
            alert("중복된 상품  이름 입니다.");
        } else{
            setProductDetail(data);
        }
    }
    async function onDelete() {
        let csrftoken = getCookie('csrftoken');
        let response = await fetch(`${baseUrl}/products/update/product/${productPk}`, {
            method : "DELETE",
            credentials: "include",
            headers : {
                'Content-Type': 'application/json',
                "X-CSRFToken": csrftoken,
            },
        });
        if(response.ok){
            alert("삭제 완료");
            return navigate("/");
        }
    }
    useEffect(() => {
        goHome();
    }, [user]);
    useEffect(() => {
        getProductDetail();
    }, []);
    useEffect(() => {
        handleBrandList();
    }, []);
    return (
        <>
            {user.is_staff ?
                    <>
                        {Object.keys(productDetail).length === 0 ? 
                                null
                            :
                                <>
                                    <div className="mt-6 flex justify-center items-center">
                                        <div className="flex flex-col border-2 w-80 justify-center items-center rounded-md shadow-md">
                                            <label htmlFor="name">NAME</label>
                                            <span id="name" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">{productDetail.name}</span>
                                            <label htmlFor="price">PRICE</label>
                                            <span id="price" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">{productDetail.price}</span>
                                            <label htmlFor="delivery_price">DELIVERY PRICE</label>
                                            <span id="delivery_price" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">{productDetail.delivery_price}</span>
                                            <label htmlFor="cost">COST</label>
                                            <span id="cost" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">{productDetail.cost}</span>
                                            <label htmlFor="logistic_fee">LOGISTIC COST</label>
                                            <span id="logistic_fee" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">{productDetail.logistic_fee}</span>
                                            <label htmlFor="quantity">QUANTITY</label>
                                            <span id="quantity" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">{productDetail.quantity}</span>
                                            <label htmlFor="gift_quantity">GIFT QUANTITY</label>
                                            <span id="gift_quantity" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">{productDetail.gift_quantity}</span>
                                            <label htmlFor="brand">BRAND</label>
                                            <span id="brand" className="border-2 rounded-md w-72 border-gray-200 mb-5 text-center">{productDetail.brand.name}</span>
                                        </div>
                                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center border-2 w-80 rounded-md shadow-md">
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
                                            <select {...register("brand")} id="brand" className="border-2 rounded-md w-72 border-gray-200 mb-5 text-center">
                                                <option value="">BRAND</option>
                                                {brandList.map((brand) => 
                                                    <option key={brand.pk} value={brand.pk}>{brand.name}</option>
                                                )}
                                            </select>
                                            <button className="w-24 h-8 text-xs text-gray-400 hover:border-b-2 border-purple-400">UPDATE</button>
                                        </form>
                                    </div>
                                    <div className="flex justify-center mt-16 text-red-400">
                                        <button onClick={onDelete}>DELETE</button>
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