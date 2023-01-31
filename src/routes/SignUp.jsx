import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import { baseUrl, getCookie } from "../api";

function SignUp() {
    const { 
        isPermission:[permission],
    } = useOutletContext();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    function goHome() {
        if(permission === true) {
            alert("이용 할 수 없는 페이지 입니다");
            return navigate("/");
        }
    }
    async function onSubmit(signUpData) {
        let csrftoken = getCookie('csrftoken');
        let response = await fetch(`${baseUrl}/users/create` , {
            method : "POST",
            credentials: "include",
            headers : {
                'Content-Type': 'application/json',
                "X-CSRFToken": csrftoken,
            },
            body : JSON.stringify(signUpData),
        });
        let data = await response.json();
        if (data.username[0] === "A user with that username already exists.") {
            alert("이미 사용중인 아이디입니다.");
        } else {
            alert("회원가입 완료");
            return navigate("/");
        }
    }
    useEffect(() => {
        goHome();
    }, [permission]);
    return (
        <div className="flex flex-col mt-32 justify-center items-center">
            { permission ?
                null
                : 
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center">
                    <label htmlFor="username">ID</label>
                    <input {...register("username", {required: true, pattern: /^[a-z0-9_]{5,20}$/, minLength: 5})} id="username" type="text" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                    <span className="text-gray-400 -mt-8 mb-5">영문 5자 이상 적어주세요</span>
                    <label htmlFor="password">PASSWORD</label>
                    <input {...register("password", {required: true, pattern: /^[a-zA-Z0-9_]{8,20}$/, minLength: 8})} id="password" type="password" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                    <span className="text-gray-400 -mt-8 mb-5">영문과 숫자를 혼합하여 8자 이상 적어주세요</span>
                    <label htmlFor="name">NAME</label>
                    <input {...register("name", {required: true, pattern: /^[가-힣]/})} id="name" type="text" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                    <label htmlFor="email">E-MAIL</label>
                    <input {...register("email", {required: true})} id="email" type="email" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                    <button className="w-56 h-12 hover:border-b-2 border-purple-500">Sign Up</button>
                </form>
            }
        </div>
    );
}

export default SignUp;