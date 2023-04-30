import { useEffect } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useQuery } from '@tanstack/react-query'
import { getProductList } from "../../../api";

function UpdateProduct() {
    const { userData } = useOutletContext();
    const navigate = useNavigate();
    const { isLoading, data: productListData } = useQuery(['ProductList'], getProductList,
        {
            refetchOnWindowFocus: false,
        }
    );
    useEffect(() => {
        if(userData.is_staff === false) {
            alert("이용 할 수 없는 페이지 입니다");
            return navigate("/");
        }
    }, [userData]);
    return (
        <div className="flex flex-col mt-6 justify-center items-center">
            {userData.is_staff ?
                <>
                    {isLoading ? 
                        <span>Loading...</span>
                        :
                        <ul>
                            {productListData.map((product) =>
                                <Link to={`/management/manageproduct/update/${product.pk}`} key={product.pk}>
                                    <li className="mb-10">{product.name}</li>
                                </Link>
                            )}
                        </ul>
                    }
                </>
                :
                null
            }
        </div>
    );
}

export default UpdateProduct;