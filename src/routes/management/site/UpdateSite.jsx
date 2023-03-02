import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { baseUrl } from "../../../api";

function UpdateSite() {
    const { 
        userData:[user],
    } = useOutletContext();
    const navigate = useNavigate();
    const [siteList, setSiteList] = useState([]);
    function goHome() {
        if(user.is_staff === false) {
            alert("이용 할 수 없는 페이지 입니다");
            return navigate("/");
        }
    }
    async function handleSiteList() {
        let response = await fetch(`${baseUrl}/sites`, {
            method : "GET",
            credentials: "include",
            headers : {
                'Content-Type': 'application/json',
            },
        });
        let data = await response.json();
        setSiteList(data);
    }
    useEffect(() => {
        goHome();
    }, [user]);
    useEffect(() => {
        handleSiteList();
    }, []);
    return (
        <div className="flex flex-col mt-12 justify-center items-center">
            {user.is_staff ? 
                    <ul>
                        {siteList.map((site) =>
                            <Link to={`/management/managesite/update/${site.pk}`} key={site.pk}>
                                <li className="mb-10">{site.name}</li>
                            </Link>
                        )}
                    </ul>
                :
                    null
            }
        </div>
    );
}

export default UpdateSite;