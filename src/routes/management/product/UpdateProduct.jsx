import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { baseUrl } from "../../../api";

function UpdateProduct() {
    const { 
        userData:[user],
    } = useOutletContext();
    const navigate = useNavigate();
    const [productList, setProductList] = useState([]);
    function goHome() {
        if(user.is_staff === false) {
            alert("이용 할 수 없는 페이지 입니다");
            return navigate("/");
        }
    }
    async function handleProductList() {
        let response = await fetch(`${baseUrl}/products`, {
            method : "GET",
            credentials: "include",
            headers : {
                'Content-Type': 'application/json',
            },
        });
        let data = await response.json();
        setProductList(data);
    }
    useEffect(() => {
        goHome();
    }, [user]);
    useEffect(() => {
        handleProductList();
    }, []);
    return (
        <div className="flex flex-col mt-32 justify-center items-center">
            {user.is_staff ? 
                    <ul>
                        {productList.map((product) =>
                            <Link to={`/management/manageproduct/update/${product.pk}`} key={product.pk}>
                                <li className="mb-10">{product.name}</li>
                            </Link>
                        )}
                    </ul>
                :
                    null
            }
        </div>
    );
}

export default UpdateProduct;