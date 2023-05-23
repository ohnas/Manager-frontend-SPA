import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { getBrandList } from "../../../api";

function UpdateExpense() {
    const { userData } = useOutletContext();
    const navigate = useNavigate();
    const { isLoading, data: brandListData } = useQuery(['BrandList'], getBrandList,
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
        <div className="flex flex-col mt-32 justify-center items-center">
            {userData.is_staff ?
                <>
                    {isLoading ? 
                        <span>Loading...</span>
                        :
                        <ul>
                            {brandListData.map((brand) =>
                                <Link to={`/management/manageexpense/update/${brand.pk}/expenseList`} key={brand.pk}>
                                    <li className="mb-10">{brand.name}</li>
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

export default UpdateExpense;