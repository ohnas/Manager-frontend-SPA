import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { baseUrl } from "../api";

function Detail({brand}) {
    const { register, handleSubmit } = useForm();
    const [maxDate, setMaxDate] = useState();
    const maxDateVale = (() => {
        const today = new Date();
        const yesterday = new Date(today.setDate(today.getDate() - 1));
        let month = yesterday.getMonth() + 1;
        if(month < 10) {
            month = `0${month}`
        }
        let date = yesterday.getDate();
        if(date < 10) {
            date = `0${date}`
        }
        const yesterdayValue = `${yesterday.getFullYear()}-${month}-${date}`;
        setMaxDate(yesterdayValue);
    });
    async function onSubmit(retrieveData) {
        let response = await fetch(`${baseUrl}/sales/?product=${retrieveData.product}&site=${retrieveData.saleSite}&date=${retrieveData.dateFrom}`, {
            method : "GET",
            credentials: "include",
            headers : {
                'Content-Type': 'application/json',
            },
        });
        let saleData = await response.json();
        if (response.ok) {
            console.log(saleData);
        }
    }
    useEffect(() => {
        maxDateVale();
    }, []);
    return (
        <>
        <div>
            { Object.keys(brand).length === 0 ? 
                    <div className="flex flex-col mt-32 justify-center items-center">
                        <span>There is no Brand Detail.</span>
                    </div>
                :
                <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-evenly mt-5" >
                    <select {...register("product", {required:true})} name="product" className="border-2 rounded-md w-72 border-gray-200 text-center">
                        <option value="">Choose a product</option>
                        { brand.product_set.map((product) => 
                            <option key={product.pk} value={product.pk}>{product.name}</option>
                            )
                        }
                    </select>
                    <select {...register("saleSite", {required:true})} name="saleSite" className="border-2 rounded-md w-72 border-gray-200 text-center">
                        <option value="">Choose a sale site</option>
                        { brand.site_set.map((site) => (
                            site.kind === "sale_site" ? 
                                <option key={site.pk} value={site.pk}>{site.name}</option>
                            :
                                null
                        ))}
                    </select>
                    <select {...register("advertisingSite", {required:true})} name="advertisingSite" className="border-2 rounded-md w-72 border-gray-200 text-center">
                        <option value="">Choose an advertising site</option>
                        { brand.site_set.map((site) => (
                            site.kind === "advertising_site" ? 
                                <option key={site.pk} value={site.pk}>{site.name}</option>
                            :
                                null
                        ))}
                    </select>
                    <label htmlFor="dateFrom">FROM</label>
                    <input {...register("dateFrom", {required:true})} name="dateFrom" id="dateFrom" type={"date"} max={maxDate} className="border-2 rounded-md w-56 border-gray-200 text-center -ml-5" />
                    <label htmlFor="retrieve_date_to">TO</label>
                    <input {...register("dateTo", {required:true})} name="dateTo" id="dateTo" type={"date"} max={maxDate} className="border-2 rounded-md w-56 border-gray-200 text-center -ml-5" />
                    <button className="border-b-2 hover:border-purple-500">RETRIEVE</button>
                </form>
            }
        </div>
        {/* <div>
            <table className="table-auto">
                <thead>
                    <tr>
                        <th>name</th>
                        <th>count</th>
                        <th>price</th>
                        <th>delivery_price</th>
                        <th>order_time</th>
                        <th>pay_time</th>
                    </tr>
                </thead>
                <tbody>
                    {retrieveSaleData.map((data) => 
                        <tr key={data.product.pk}>
                            <td>{data.product.name}</td>
                            <td>{data.count}</td>
                            <td>{data.price}</td>
                            <td>{data.delivery_price}</td>
                            <td>{data.order_time}</td>
                            <td>{data.pay_time}</td>
                        </tr>
                        )
                    }
                </tbody>
            </table>
        </div> */}
        </>
    );
}

export default Detail;