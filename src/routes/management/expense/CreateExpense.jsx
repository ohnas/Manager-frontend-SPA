import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import { getAllBrandListByExpense, postExpense } from "../../../api";

function CreateExpense() {
    const { userData } = useOutletContext();
    const [maxDate, setMaxDate] = useState();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const { isLoading, data: allBrandsData } = useQuery(['AllBrands'], getAllBrandListByExpense,
        {
            refetchOnWindowFocus: false,
        }
    );
    const mutation = useMutation(postExpense, 
        {
            onSuccess: () => {
                alert("등록 완료");
                navigate("/");
            }
        }
    )
    function createExpense(expenseData) {
        expenseData.description = expenseData.description.trim();
        mutation.mutate(expenseData);
    }
    const maxDateVale = (() => {
        const day = new Date();
        const today = new Date(day.setDate(day.getDate()));
        let month = today.getMonth() + 1;
        if(month < 10) {
            month = `0${month}`
        }
        let date = today.getDate();
        if(date < 10) {
            date = `0${date}`
        }
        const todayValue = `${today.getFullYear()}-${month}-${date}`;
        setMaxDate(todayValue);
    });
    useEffect(() => {
        if(userData.is_staff === false) {
            alert("이용 할 수 없는 페이지 입니다");
            return navigate("/");
        }
    }, [userData]);
    useEffect(() => {
        maxDateVale();
    }, []);
    return (
        <div className="flex flex-col mt-32 justify-center items-center">
            {userData.is_staff ?
                <>
                    {isLoading ?
                        <span>Loading...</span>
                        :
                        <form onSubmit={handleSubmit(createExpense)} className="flex flex-col justify-center items-center">
                            <label htmlFor="description">기타 비용 내용</label>
                            <input {...register("description", {required: true})} id="description" type="text" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                            <label htmlFor="expense_by_hand">비용</label>
                            <input {...register("expense_by_hand", {required: true})} id="expense_by_hand" type="number" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                            <label htmlFor="date">날짜</label>
                            <input {...register("date", {required: true})} id="date" type="date" min="2023-01-01" max={maxDate} className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center" />
                            <select {...register("brand", {required: true})} id="brand" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">
                                <option value="">BRAND</option>
                                {allBrandsData.map((brand) => 
                                    <option key={brand.pk} value={brand.pk}>{brand.name}</option>
                                )}
                            </select>
                            <button className="w-56 h-12 hover:border-b-2 border-purple-500">CREATE</button>
                        </form>
                    }
                </>
                :
                null
            }
        </div>
    );
}

export default CreateExpense;