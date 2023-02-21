import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import { baseUrl } from "../../../api";

function UpdateBrand() {
    const { 
        userData:[user],
    } = useOutletContext();
    const navigate = useNavigate();
    const [brandList, setBrandList] = useState([]);
    function goHome() {
        if(user.is_staff === false) {
            alert("이용 할 수 없는 페이지 입니다");
            return navigate("/");
        }
    }
    async function handleBrandList() {
        let response = await fetch(`${baseUrl}/brands`, {
            method : "GET",
            credentials: "include",
            headers : {
                'Content-Type': 'application/json',
            },
        });
        let data = await response.json();
        setBrandList(data);
    }
    useEffect(() => {
        goHome();
    }, [user]);
    useEffect(() => {
        handleBrandList();
    }, []);
    return (
        <div className="flex flex-col mt-32 justify-center items-center">
            {user.is_staff ? 
                    <ul>
                        {brandList.map((brand) =>
                            <Link to={`/management/managebrand/update/${brand.pk}`} key={brand.pk}>
                                <li className="mb-10">{brand.name}</li>
                            </Link>
                        )}
                    </ul>
                :
                    null
            }
        </div>
    );
}

export default UpdateBrand;