import { useEffect } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

function Management() {
    const { 
        userData:[user],
    } = useOutletContext();
    const navigate = useNavigate();
    function goHome() {
        if(user.is_staff === false) {
            alert("이용 할 수 없는 페이지 입니다");
            return navigate("/");
        }
    }
    useEffect(() => {
        goHome();
    }, [user]);
    return (
        <>
            {user.is_staff ? 
                    <div className="flex flex-col justify-center items-center mt-10">
                        <div className="flex flex-col items-center mb-14">
                            <span className="text-2xl mb-5">USER</span>
                            <ul>
                                <Link to={"/management/manageuser/update"}>
                                    <li className="text-gray-400 hover:border-b-2 border-purple-400">update</li>
                                </Link>
                            </ul>
                        </div>
                        <div className="flex flex-col items-center mb-14">
                            <span className="text-2xl mb-5">BRAND</span>
                            <ul className="flex justify-between items-center w-32">
                                <Link to={"/management/managebrand/create"}>
                                    <li className="text-gray-400 hover:border-b-2 border-purple-400">create</li>
                                </Link>
                                <Link to={"/management/managebrand/update"}>
                                    <li className="text-gray-400 hover:border-b-2 border-purple-400">update</li>
                                </Link>
                            </ul>
                        </div>
                        <div className="flex flex-col items-center mb-14">
                            <span className="text-2xl mb-5">PRODUCT</span>
                            <ul className="flex justify-between items-center w-32">
                                <Link to={"/management/manageproduct/create"}>
                                    <li className="text-gray-400 hover:border-b-2 border-purple-400">create</li>
                                </Link>
                                <Link to={"/management/manageproduct/update"}>
                                    <li className="text-gray-400 hover:border-b-2 border-purple-400">update</li>
                                </Link>
                            </ul>
                        </div>
                        <div className="flex flex-col items-center mb-14">
                            <span className="text-2xl mb-5">OPTION</span>
                            <ul className="flex justify-between items-center w-32">
                                <Link to={"/management/manageoption/create"}>
                                    <li className="text-gray-400 hover:border-b-2 border-purple-400">create</li>
                                </Link>
                                <Link to={"/management/manageoption/update"}>
                                    <li className="text-gray-400 hover:border-b-2 border-purple-400">update</li>
                                </Link>
                            </ul>
                        </div>
                        <div className="flex flex-col items-center mb-14">
                            <span className="text-2xl mb-5">SITE</span>
                            <ul className="flex justify-between items-center w-32">
                                <Link to={"/management/managesite/create"}>
                                    <li className="text-gray-400 hover:border-b-2 border-purple-400">create</li>
                                </Link>
                                <Link to={"/management/managesite/update"}>
                                    <li className="text-gray-400 hover:border-b-2 border-purple-400">update</li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                :
                    null
            }
        </>
    );
}

export default Management;