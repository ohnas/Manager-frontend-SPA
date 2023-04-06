import { useEffect } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useQuery } from '@tanstack/react-query'
import { getOptionList } from "../../../api";

function UpdateOption() {
    const { userData } = useOutletContext();
    const navigate = useNavigate();
    const { isLoading, data: optionListData } = useQuery(['OptionList'], getOptionList);
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
                            {optionListData.map((option) =>
                                <Link to={`/management/manageoption/update/${option.pk}`} key={option.pk}>
                                    <li className="mb-10">{option.name}</li>
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

export default UpdateOption;