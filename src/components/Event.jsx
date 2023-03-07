import { useForm } from "react-hook-form";
import { baseUrl, getCookie } from "../api";

function Event({brandPk, setSelectedDate, listOfDate, brand}) {
    const { register, handleSubmit } = useForm();
    function handleOpenAddEvent(event) {
        let selectDialog = event.target.nextElementSibling;
        selectDialog.showModal();
    }
    async function onSubmit(eventData) {
        let csrftoken = getCookie('csrftoken');
        let response = await fetch(`${baseUrl}/events/${brandPk}/create` , {
            method : "POST",
            credentials: "include",
            headers : {
                'Content-Type': 'application/json',
                "X-CSRFToken": csrftoken,
            },
            body : JSON.stringify(eventData),
        });
        if (response.ok) {
            alert("생성 완료");
            setSelectedDate({
                "dateFrom" : listOfDate[0],
                "dateTo" : listOfDate[listOfDate.length - 1],

            });
        }
    }
    return (
        <div className="border-2 rounded-md w-32 mt-5 text-center">
            <button onClick={handleOpenAddEvent} className="text-gray-400">Add an event</button>
            <dialog>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center">
                    <label htmlFor="name">NAME</label>
                    <input {...register("name", {required: true})} id="name" type="text" className="border-2 rounded-md w-72 border-gray-200 mb-10" />
                    <select {...register("event_date", {required: true})} id="event_date" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">
                        <option value="">DATE</option>
                        {listOfDate.map((date, index) => 
                            <option key={index} value={date}>{date}</option>
                        )}
                    </select>
                    <select {...register("product", {required: true})} id="product" className="border-2 rounded-md w-72 border-gray-200 mb-10 text-center">
                        <option value="">PRODUCT</option>
                        {brand.product_set.map((product) => 
                            <option key={product.pk} value={product.pk}>{product.name}</option>
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

export default Event;