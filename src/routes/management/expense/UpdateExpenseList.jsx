import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { getExpenseList } from "../../../api";

function UpdateExpenseList() {
    const { userData } = useOutletContext();
    let { brandPk } = useParams();
    const navigate = useNavigate();
    const { isLoading, data: expenseListData } = useQuery(['ExpenseList', brandPk], () => getExpenseList(brandPk),
        {
            refetchOnWindowFocus: false,
        }
    );
    useEffect(() => {
        if(userData.is_staff === false) {
            alert("이용 할 수 없는 페이지 입니다");
            return navigate("/");
        }
    }, [userData]);
    return (
        <div className="flex flex-col mt-6 justify-center items-center">
            {userData.is_staff ?
                <>
                    {isLoading ? 
                        <span>Loading...</span>
                        :
                        <ul>
                            {expenseListData.map((expense) =>
                                <Link to={`/management/manageexpense/update/${expense.pk}`} key={expense.pk}>
                                    <li className="mb-10">{expense.date} / {expense.description} / {expense.expense_by_hand}</li>
                                </Link>
                            )}
                        </ul>
                    }
                </>
                :
                null
            }
        </div>
    );
}

export default UpdateExpenseList;