import { Link, useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import { postLogOut } from "../api";

function Header({userData, brandName}) {
    const navigate = useNavigate();
    const mutation = useMutation(postLogOut, 
        {
            onSuccess: () => {
                alert("Log out")
                navigate("/");
            }
        });
    function logOut() {
        mutation.mutate();
    }
    return (
        <div className="flex justify-between h-28 items-center border-b-2">
            <Link to={"/"}>
                <span className="text-3xl">Manager</span>
            </Link>
            { brandName ? 
                    <span className="text-5xl">{brandName}</span>
                :
                    null
            }
            <div className="flex space-x-4 items-center">
                { userData.detail === "Authentication credentials were not provided." ? 
                    <>
                        <Link to={"/signup"}>
                            <button className="border-solid border-2 rounded-md w-28 h-12 bg-purple-600 text-white">Sign Up</button>
                        </Link>
                    </>
                    :
                    <>
                        <span className="w-24">{userData.name}</span>
                        {userData.is_staff ? 
                            <Link to={"/management"}>
                                <button className="border-solid border-b-2 w-32 h-12 border-purple-200 text-black hover:border-purple-400">Management</button>
                            </Link>
                            :
                            null
                        }
                        <button className="border-solid border-2 rounded-md w-28 h-12 bg-purple-600 text-white" onClick={logOut}>Log Out</button>
                    </> 
                }
            </div>
        </div>
    );
}

export default Header;