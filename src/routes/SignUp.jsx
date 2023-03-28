import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useOutletContext } from "react-router-dom";
import { postSignUp } from "../api";

function SignUp() {
    const { userData } = useOutletContext();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const mutation = useMutation(postSignUp, 
        {
            onSuccess: (data) => {
                if (data.username[0] === "A user with that username already exists.") {
                    alert("이미 사용중인 아이디입니다.");
                } else {
                    alert("회원가입 완료");
                    navigate("/");
                }
            }
        }
    )
    function signUp(signUpData) {
        mutation.mutate(signUpData);
    }
    useEffect(() => {
        if(!userData.detail) {
            alert("이용 할 수 없는 페이지 입니다");
            return navigate("/");
        }
    }, [userData]);
    return (
        <div className="flex flex-col mt-32 justify-center items-center">
            <form onSubmit={handleSubmit(signUp)} className="flex flex-col justify-center items-center">
                <label htmlFor="username">ID</label>
                <input {...register("username", {required: true, pattern: /^[a-z0-9_]{5,20}$/, minLength: 5})} id="username" type="text" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                <span className="text-gray-400 -mt-8 mb-5">영문 5자 이상</span>
                <label htmlFor="password">PASSWORD</label>
                <input {...register("password", {required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, minLength: 8})} id="password" type="password" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                <span className="text-gray-400 -mt-8 mb-5">영문, 숫자, 특수문자를 혼합하여 8자 이상</span>
                <label htmlFor="name">NAME</label>
                <input {...register("name", {required: true, pattern: /^[가-힣]/})} id="name" type="text" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                <label htmlFor="email">E-MAIL</label>
                <input {...register("email", {required: true})} id="email" type="email" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                <button className="w-56 h-12 hover:border-b-2 border-purple-500">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;