import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { getExpenseDetail, putExpenseDetail, deleteExpenseDetail } from "../../../api";

function UpdateExpenseForm() {
    const { userData } = useOutletContext();
    const [maxDate, setMaxDate] = useState();
    const navigate = useNavigate();
    let { expensePk } = useParams();
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset } = useForm();
    const { isLoading: expenseDetailLoading, data: expenseDetailData } = useQuery(['expenseDetail', expensePk], () => getExpenseDetail(expensePk),
        {
            refetchOnWindowFocus: false,
        }
    );
    const putMutation = useMutation((updateData) => putExpenseDetail(expensePk, updateData),
        {
            onSuccess: () => {
                queryClient.refetchQueries(['expenseDetail', expensePk]);
                reset(
                    {
                        "description":"",
                        "expense_by_hand":"",
                        "date":"",
                    }
                );
            }
        }
    );
    const deleteMutation = useMutation(() => deleteExpenseDetail(expensePk),
        {
            onSuccess: () => {
                alert("삭제 완료");
                return navigate("/");
            }
        }
    );
    function updateExpense(updateData) {
        updateData.description = updateData.description.trim();
        putMutation.mutate(updateData);
    }
    function delExpense() {
        deleteMutation.mutate();
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
        <>
            {userData.is_staff ?
                <>
                    {expenseDetailLoading ? 
                        <span>Loading...</span>
                        :
                        <>
                            <div className="mt-6 flex justify-center items-center">
                                <div className="flex flex-col border-2 w-80 justify-center items-center rounded-md shadow-md">
                                    <label htmlFor="description">기타 비용 내용</label>
                                    <span id="description" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">{expenseDetailData.description}</span>
                                    <label htmlFor="expenseByHand">비용</label>
                                    <span id="expenseByHand" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">{expenseDetailData.expense_by_hand}</span>
                                    <label htmlFor="date">날짜</label>
                                    <span id="date" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">{expenseDetailData.date}</span>
                                </div>
                                <form onSubmit={handleSubmit(updateExpense)} className="flex flex-col justify-center items-center border-2 w-80 rounded-md shadow-md">
                                    <label htmlFor="description">기타 비용 내용</label>
                                    <input {...register("description")} id="description" type="text" className="border-2 rounded-md w-72 border-gray-200 mb-8" />
                                    <label htmlFor="expense_by_hand">비용</label>
                                    <input {...register("expense_by_hand")} id="expense_by_hand" type="number" className="border-2 rounded-md w-72 border-gray-200 mb-8" />
                                    <label htmlFor="date">날짜</label>
                                    <input {...register("date")} id="date" type="date" min="2023-01-01" max={maxDate} className="border-2 rounded-md w-72 border-gray-200 mb-8 text-center" />
                                    <button className="w-24 h-6 text-xs text-gray-400 hover:border-b-2 border-purple-400">UPDATE</button>
                                </form>
                            </div>
                            <div className="flex justify-center mt-12 text-red-400">
                                <button onClick={delExpense}>DELETE</button>
                            </div>
                        </>
                    }
                </>
                :
                null
            }
        </>
    );
}

export default UpdateExpenseForm;