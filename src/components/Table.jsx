import { useEffect, useState } from "react";

function Table({brand, completeData, listOfDate}) {
    const [saleRate, setSaleRate] = useState({});
    const [optionTotalCount, setOptionTotalCount] = useState({});
    const [conversionRate, setConversionRate] = useState({});
    const [spendKrw, setSpendKrw] = useState({});
    function handleSaleRate() {
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
            setSaleRate(saleRateObj);
        }
    }
    function handleOptionTotalCount() {
        if(Object.keys(completeData).length === 0) {
            return;
        } else {
            let optionTotalCountObj = {};
            brand.product_set.forEach((product) => {
                if(completeData.imweb_data.options[product.name]) {
                    optionTotalCountObj[product.name] = {};
                } else {
                    return;
                }
                listOfDate.forEach((date) => {
                    let totalCount = 0;
                    if(completeData.imweb_data.options[product.name][date]) {
                        optionTotalCountObj[product.name][date] = {};
                    } else {
                        return;
                    }
                    product.options_set.forEach((option) => {
                        if(completeData.imweb_data.options[product.name] && completeData.imweb_data.options[product.name][date] && completeData.imweb_data.options[product.name][date][option.name]) {
                            let optionQuanitity = option.quantity;
                            let optionGiftQuantity = option.gift_quantity;
                            let count = (completeData.imweb_data.options[product.name][date][option.name] * optionQuanitity ) + (completeData.imweb_data.options[product.name][date][option.name] * optionGiftQuantity);
                            totalCount += count;
                            optionTotalCountObj[product.name][date]["totalCount"] = totalCount;
                        } else {
                            return;
                        }
                    });
                });
            });
            setOptionTotalCount(optionTotalCountObj);
        }
    }
    function handleConversionRate() {
        if(Object.keys(completeData).length === 0) {
            return;
        } else {
            let conversionRateObj = {};
            brand.product_set.forEach((product) => {
                if(completeData.facebook_data.campaigns[product.name]) {
                    conversionRateObj[product.name] = {};
                } else {
                    return;
                }
                listOfDate.forEach((date) => {
                    if(completeData.facebook_data.campaigns[product.name][date]) {
                        let rate = (completeData.facebook_data.campaigns[product.name][date].purchase / completeData.facebook_data.campaigns[product.name][date].landing_page_view) * 100;
                        conversionRateObj[product.name][date] = {
                            "conversionRate" : rate,
                        }
                    } else {
                        return;
                    }
                });
            });
            setConversionRate(conversionRateObj);
        }
    }
    function handleSpendKrw() {
        if(Object.keys(completeData).length === 0) {
            return;
        } else {
            let spendKrwObj = {};
            brand.product_set.forEach((product) => {
                if(completeData.facebook_data.campaigns[product.name]) {
                    spendKrwObj[product.name] = {};
                } else {
                    return;
                }
                listOfDate.forEach((date) => {
                    if(completeData.facebook_data.campaigns[product.name][date]) {
                        let krw = Math.ceil(completeData.facebook_data.campaigns[product.name][date].spend * completeData.facebook_data.exchange_rate[date])
                        spendKrwObj[product.name][date] = {
                            "spendKrw" : krw,
                        }
                    } else {
                        return;
                    }
                });
            });
            setSpendKrw(spendKrwObj)
        }
    }
    useEffect(() => {
        handleSaleRate();
    }, [completeData]);
    useEffect(() => {
        handleOptionTotalCount();
    }, [completeData]);
    useEffect(() => {
        handleConversionRate();
    }, [completeData]);
    useEffect(() => {
        handleSpendKrw();
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
                        <div key={product.pk} className="overflow-x-scroll w-full mt-5 mb-5">
                            <div>
                                <span>{product.name}</span>
                            </div>
                            <table className="whitespace-nowrap text-center">
                                <thead>
                                    <tr>
                                        <th className="sticky left-0 z-50 bg-white border-4">날짜</th>
                                        <th className="border-2">주문</th>
                                        {product.options_set.map((option) =>
                                            <th key={option.pk} className="border-4">{option.name}</th>
                                        )}
                                        {product.options_set.map((option) =>
                                            <th key={option.pk} className="border-4">{option.name} 판매율</th>
                                        )}
                                        <th className="border-4">총수량</th>
                                        <th className="border-4">도달수</th>
                                        <th className="border-4">노출</th>
                                        <th className="border-4">빈도</th>
                                        <th className="border-4">비용</th>
                                        <th className="border-4">CPM</th>
                                        <th className="border-4">CTR</th>
                                        <th className="border-4">ROAS</th>
                                        <th className="border-4">CPC</th>
                                        <th className="border-4">구매</th>
                                        <th className="border-4">랜딩페이지뷰</th>
                                        <th className="border-4">링크클릭</th>
                                        <th className="border-4">결제정보추가</th>
                                        <th className="border-4">장바구니</th>
                                        <th className="border-4">구매전환율</th>
                                        <th className="border-4">비용(원화)</th>
                                        <th className="border-4">원가</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listOfDate.map((date, index) =>
                                        <tr key={index}>
                                            <td className="sticky left-0 z-50 bg-white border-2">{date}</td>
                                            <td className="border-2">
                                                {completeData.imweb_data.products[product.name] ?
                                                        <>
                                                            {completeData.imweb_data.products[product.name][date] ? 
                                                                    <>
                                                                        {completeData.imweb_data.products[product.name][date]["prod_count"]}
                                                                    </>
                                                                :
                                                                    0
                                                            }
                                                        </>
                                                    :
                                                        0
                                                }
                                            </td>
                                            {product.options_set.map((option) => 
                                                <td key={option.pk} className="border-2">
                                                    {completeData.imweb_data.options[product.name] ?
                                                            <>
                                                                {completeData.imweb_data.options[product.name][date] ? 
                                                                        <>
                                                                            {completeData.imweb_data.options[product.name][date][option.name] ?
                                                                                    <>
                                                                                        {completeData.imweb_data.options[product.name][date][option.name]}
                                                                                    </>
                                                                                :
                                                                                    0
                                                                            }
                                                                        </>
                                                                    :
                                                                        0
                                                                }
                                                            </>
                                                        :
                                                            0
                                                    }
                                                </td>
                                            )}
                                            {product.options_set.map((option) => 
                                                <td key={option.pk} className="border-2">
                                                    {saleRate[product.name] ?
                                                            <>
                                                                {saleRate[product.name][date] ? 
                                                                        <>
                                                                            {saleRate[product.name][date][option.name] ?
                                                                                    <>
                                                                                        {saleRate[product.name][date][option.name]} %
                                                                                    </>
                                                                                :
                                                                                    0
                                                                            }
                                                                        </>
                                                                    :
                                                                        0
                                                                }
                                                            </>
                                                        :
                                                            0
                                                    }
                                                </td>
                                            )}
                                            {optionTotalCount[product.name] ? 
                                                    <>
                                                        {optionTotalCount[product.name][date] ? 
                                                                <>
                                                                    <td className="border-2">{optionTotalCount[product.name][date]["totalCount"]}</td>
                                                                </>
                                                            :
                                                                <td className="border-2">0</td>
                                                        }
                                                    </>
                                                :
                                                <td className="border-2">0</td>
                                            }
                                            {completeData.facebook_data.campaigns[product.name] ?
                                                    <>
                                                        {completeData.facebook_data.campaigns[product.name][date] ? 
                                                                <>
                                                                    <td className="border-2">{completeData.facebook_data.campaigns[product.name][date]["reach"]}</td>
                                                                    <td className="border-2">{completeData.facebook_data.campaigns[product.name][date]["impressions"]}</td>
                                                                    <td className="border-2">{completeData.facebook_data.campaigns[product.name][date]["frequency"]}</td>
                                                                    <td className="border-2">{completeData.facebook_data.campaigns[product.name][date]["spend"]}</td>
                                                                    <td className="border-2">{completeData.facebook_data.campaigns[product.name][date]["cpm"]}</td>
                                                                    <td className="border-2">{completeData.facebook_data.campaigns[product.name][date]["website_ctr"]}</td>
                                                                    <td className="border-2">{completeData.facebook_data.campaigns[product.name][date]["purchase_roas"]}</td>
                                                                    <td className="border-2">{completeData.facebook_data.campaigns[product.name][date]["cost_per_unique_inline_link_click"]}</td>
                                                                    <td className="border-2">{completeData.facebook_data.campaigns[product.name][date]["purchase"]}</td>
                                                                    <td className="border-2">{completeData.facebook_data.campaigns[product.name][date]["landing_page_view"]}</td>
                                                                    <td className="border-2">{completeData.facebook_data.campaigns[product.name][date]["link_click"]}</td>
                                                                    <td className="border-2">{completeData.facebook_data.campaigns[product.name][date]["add_payment_info"]}</td>
                                                                    <td className="border-2">{completeData.facebook_data.campaigns[product.name][date]["add_to_cart"]}</td>
                                                                </>
                                                            :
                                                                <>
                                                                    <td className="border-2">0</td>
                                                                    <td className="border-2">0</td>
                                                                    <td className="border-2">0</td>
                                                                    <td className="border-2">0</td>
                                                                    <td className="border-2">0</td>
                                                                    <td className="border-2">0</td>
                                                                    <td className="border-2">0</td>
                                                                    <td className="border-2">0</td>
                                                                    <td className="border-2">0</td>
                                                                    <td className="border-2">0</td>
                                                                    <td className="border-2">0</td>
                                                                    <td className="border-2">0</td>
                                                                    <td className="border-2">0</td>
                                                                </>
                                                        }
                                                    </>
                                                :
                                                    <>
                                                        <td className="border-2">0</td>
                                                        <td className="border-2">0</td>
                                                        <td className="border-2">0</td>
                                                        <td className="border-2">0</td>
                                                        <td className="border-2">0</td>
                                                        <td className="border-2">0</td>
                                                        <td className="border-2">0</td>
                                                        <td className="border-2">0</td>
                                                        <td className="border-2">0</td>
                                                        <td className="border-2">0</td>
                                                        <td className="border-2">0</td>
                                                        <td className="border-2">0</td>
                                                        <td className="border-2">0</td>
                                                    </>
                                            }
                                            {conversionRate[product.name] ? 
                                                    <>
                                                        {conversionRate[product.name][date] ? 
                                                                <>
                                                                    <td className="border-2">{conversionRate[product.name][date]["conversionRate"]}%</td>
                                                                </>
                                                            :
                                                                <td className="border-2">0%</td>
                                                        }
                                                    </>
                                                :
                                                <td className="border-2">0%</td>
                                            }
                                            {spendKrw[product.name] ? 
                                                    <>
                                                        {spendKrw[product.name][date] ? 
                                                                <>
                                                                    <td className="border-2">{spendKrw[product.name][date]["spendKrw"]}</td>
                                                                </>
                                                            :
                                                                <td className="border-2">0</td>
                                                        }
                                                    </>
                                                :
                                                <td className="border-2">0</td>
                                            }
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            }
        </>
    );
}

export default Table;