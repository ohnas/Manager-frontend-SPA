import { useEffect, useState } from "react";

function Table({brand, completeData, listOfDate}) {
    const [salesRate, setSalesRate] = useState({});
    function saleRate() {
        if(Object.keys(completeData).length === 0) {
            return;
        } else {
            let saleRateObj = {};
            brand.product_set.forEach((product) => {
                if(completeData.imweb_data.products[product.name]) {
                    saleRateObj[product.name] = {}
                } else {
                    return;
                }
                listOfDate.forEach((date) => {
                    if(completeData.imweb_data.products[product.name][date]) {
                        saleRateObj[product.name][date] = {}
                    } else {
                        return;
                    }
                    product.options_set.forEach((option) => {
                        if(completeData.imweb_data.options[product.name] && completeData.imweb_data.options[product.name][date] && completeData.imweb_data.options[product.name][date][option.name]) {
                            let rate = (completeData.imweb_data.options[product.name][date][option.name] / completeData.imweb_data.products[product.name][date]["prod_count"]) * 100;
                            saleRateObj[product.name][date][option.name] = rate;
                        } else {
                            return;
                        }
                    });
                });
            });
            setSalesRate(saleRateObj);
        }
    }
    useEffect(() => {
        saleRate();
    }, [completeData]);
    return (
        <>            
            { Object.keys(completeData).length === 0 ? 
                    <div className="flex justify-center items-center h-screen">
                        <div className="flex justify-center items-center">
                            <span className="text-gray-400">No data.</span>
                        </div>
                    </div>
                :
                <>
                    {brand.product_set.map((product) =>
                        <table key={product.pk}>
                            <thead>
                                <tr>
                                    <th>{product.name}</th>
                                    <th>옵션판매현황</th>
                                    <th>메타광고현황</th>
                                </tr>
                            </thead>
                            <thead>
                                <tr>
                                    <th>날짜</th>
                                    {product.options_set.map((option) =>
                                        <th key={option.pk}>{option.name}</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {listOfDate.map((date, index) =>
                                    <tr key={index}>
                                        <td>{date}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </>
            }
        </>
    );
}

export default Table;