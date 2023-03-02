import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { baseUrl } from "../../../api";

function UpdateOption() {
    const { 
        userData:[user],
    } = useOutletContext();
    const navigate = useNavigate();
    const [optionList, setOptionList] = useState([]);
    function goHome() {
        if(user.is_staff === false) {
            alert("이용 할 수 없는 페이지 입니다");
            return navigate("/");
        }
    }
    async function handleOptionList() {
        let response = await fetch(`${baseUrl}/products/options`, {
            method : "GET",
            credentials: "include",
            headers : {
                'Content-Type': 'application/json',
            },
        });
        let data = await response.json();
        setOptionList(data);
    }
    useEffect(() => {
        goHome();
    }, [user]);
    useEffect(() => {
        handleOptionList();
    }, []);
    return (
        <div className="flex flex-col mt-6 justify-center items-center">
            {user.is_staff ? 
                    <ul>
                        {optionList.map((option) =>
                            <Link to={`/management/manageoption/update/${option.pk}`} key={option.pk}>
                                <li className="mb-10">{option.name}</li>
                            </Link>
                        )}
                    </ul>
                :
                    null
            }
        </div>
    );
}

export default UpdateOption;