import { useState } from "react";
import { baseUrl } from "../api";

function Detail({brand}) {
    const [retrieve, setRetrieve] = useState({});
    const [retrieveSaleData, setRetrieveSaleData] = useState([]);
    function onChange(event) {
        setRetrieve({
            ...retrieve,
            [event.target.name]: event.target.value,
        });
    }
    async function onRetrieve(event) {
        event.preventDefault();
        let response = await fetch(`${baseUrl}/sales/?product=${retrieve.product}&site=${retrieve.site}&date=${retrieve.date}`, {
            method : "GET",
            credentials: "include",
            headers : {
                'Content-Type': 'application/json',
            },
        });
        let saleData = await response.json();
        if (response.ok) {
            setRetrieveSaleData(saleData);
        }
    }
    return (
        <>
        <div>
            { Object.keys(brand).length === 0 ? 
                    <div className="flex flex-col mt-32 justify-center items-center">
                        <span>There is no Brand Detail.</span>
                    </div>
                :
                <form className="flex items-center justify-evenly" onSubmit={onRetrieve}>
                    <select onChange={onChange} name="product">
                        <option value="">Choose a product</option>
                        { brand.product_set.map((product) => 
                            <option key={product.pk} value={product.pk}>{product.name}</option>
                            )
                        }
                    </select>
                    <select onChange={onChange} name="site">
                        <option value="">Choose a sale site</option>
                        { brand.site_set.map((site) => (
                            site.kind === "sale_site" ? 
                                <option key={site.pk} value={site.pk}>{site.name}</option>
                            :
                                null
                        ))}
                    </select>
                    <select>
                        <option value="">Choose an advertising site</option>
                        { brand.site_set.map((site) => (
                            site.kind === "advertising_site" ? 
                                <option key={site.pk} value={site.pk}>{site.name}</option>
                            :
                                null
                        ))}
                    </select>
                    <label htmlFor="retrieve_date_from">START</label>
                    <input onChange={onChange} name="date" id="retrieve_date_from" type={"date"} />
                    <label htmlFor="retrieve_date_to">END</label>
                    <input id="retrieve_date_to" type={"date"} />
                    <button>Retrieve</button>
                </form>
            }
        </div>
        <div>
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
        </div>
        </>
    );
}

export default Detail;