import { useEffect } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useQuery } from '@tanstack/react-query'
import { getSiteList } from "../../../api";

function UpdateSite() {
    const { userData } = useOutletContext();
    const navigate = useNavigate();
    const { isLoading, data: siteListData } = useQuery(['SiteList'], getSiteList,
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
        <div className="flex flex-col mt-12 justify-center items-center">
            {userData.is_staff ?
                <>
                    {isLoading ?
                        <span>Loading...</span>
                        :
                        <ul>
                            {siteListData.map((site) =>
                                <Link to={`/management/managesite/update/${site.pk}`} key={site.pk}>
                                    <li className="mb-10">{site.name}</li>
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

export default UpdateSite;