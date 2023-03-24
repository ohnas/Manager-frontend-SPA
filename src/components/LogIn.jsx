import { useForm } from "react-hook-form";
import { useQuery } from '@tanstack/react-query';
import { postLogIn } from "../api";

function LogIn() {
    const { register, watch, handleSubmit } = useForm();
    const watchAllFields = watch();
    const { refetch } = useQuery(['logIn', watchAllFields], () => postLogIn(watchAllFields), {enabled: false });
    // function logIn() {
    //     refetch();
    // }
    return (
        <div className="flex flex-col mt-32 justify-center items-center">
            <form onSubmit={handleSubmit(refetch)} className="flex flex-col justify-center items-center">         
                <span className="text-3xl mb-10">Log in to your account</span>
                <label htmlFor="username">ID</label>
                <input {...register("username", {required: true})} id="username" name="username" type={"text"} className="border-2 rounded-md w-72 border-gray-200 mb-5" />
                <label htmlFor="password">PASSWORD</label>
                <input {...register("password", {required: true})} id="password" name="password" type={"password"} className="border-2 rounded-md w-72 border-gray-200 mb-5" />
                <button className="w-56 h-12 hover:border-b-2 border-purple-500">Log In</button>
            </form>
        </div>
    );
}

export default LogIn;