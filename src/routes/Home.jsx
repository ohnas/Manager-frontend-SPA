import { useForm } from "react-hook-form";
import { Link, useOutletContext } from "react-router-dom";
import { baseUrl, getCookie } from "../api";
import LogIn from "../components/LogIn";

function Home() {
    const { 
        isPermission:[permission, setPermission],
    } = useOutletContext();
    const { register, handleSubmit } = useForm();
    async function onLogIn(logInData) {
        let csrftoken = getCookie('csrftoken');
        let response = await fetch(`${baseUrl}/users/log-in` , {
            method : "POST",
            credentials: "include",
            headers : {
                'Content-Type': 'application/json',
                "X-CSRFToken": csrftoken,
            },
            body : JSON.stringify(logInData),
        });
        if (response.ok) {
            setPermission(true);
        } else {
            alert("활성화 상태 또는 id 와 pw를 확인해주세요");
        }
    }
    return (
        <div>
            { permission ?
                <Link to={"brands"}>
                    <div className="flex flex-col mt-32 justify-center items-center">
                        <span>Go to Brand &rarr;</span>
                    </div>
                </Link>
            : 
                <LogIn register={register} handleSubmit={handleSubmit} onLogIn={onLogIn} />
            }
        </div>
    );
}

export default Home;