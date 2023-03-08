import { useForm } from "react-hook-form";
import { baseUrl, getCookie } from "../api";

function PageView({brandPk, setSelectedDate, listOfDate}) {
    const { register, handleSubmit } = useForm();
    function handleOpenAddPageView(event) {
        let selectDialog = event.target.nextElementSibling;
        selectDialog.showModal();
    }
    async function onSubmit(pageViewData) {
        let csrftoken = getCookie('csrftoken');
        let response = await fetch(`${baseUrl}/pages/${brandPk}/create` , {
            method : "POST",
            credentials: "include",
            headers : {
                'Content-Type': 'application/json',
                "X-CSRFToken": csrftoken,
            },
            body : JSON.stringify(pageViewData),
        });
        let data = await response.json();
        if(data.detail === "page is already.") {
            alert("해당 날짜에는 저장된 항목이 있습니다.")
        } else if(response.ok) {
            alert("생성 완료");
            setSelectedDate({
                "dateFrom" : listOfDate[0],
                "dateTo" : listOfDate[listOfDate.length - 1],

            });
        }
    }
    return (
        <div className="border-2 rounded-md w-40 mt-5 text-center">
            <button onClick={handleOpenAddPageView} className="text-gray-400">Add a page view</button>
            <dialog>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center">
                    <label htmlFor="view">VIEW</label>
                    <input {...register("view", {required: true})} id="view" type="number" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                    <select {...register("page_date", {required: true})} id="page_date" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">
                        <option value="">DATE</option>
                        {listOfDate.map((date, index) => 
                            <option key={index} value={date}>{date}</option>
                        )}
                    </select>
                    <button className="w-56 h-12 hover:border-b-2 border-purple-500">CREATE</button>
                </form>
                <form method="dialog" className="mt-5">
                    <button className="text-gray-400">close</button>
                </form>
            </dialog>
        </div>
    );
}

export default PageView;