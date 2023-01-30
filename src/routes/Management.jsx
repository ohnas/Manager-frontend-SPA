import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

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
                <div>Hello staff</div>
                :
                null
            }
        </>
    );
}

export default Management;