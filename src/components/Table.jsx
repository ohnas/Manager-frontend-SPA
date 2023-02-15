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
                                    <th>주문</th>
                                    {product.options_set.map((option) =>
                                        <th key={option.pk}>{option.name}</th>
                                    )}
                                    {product.options_set.map((option) =>
                                        <th key={option.pk}>{option.name} 판매율</th>
                                    )}
                                    <th>총수량</th>
                                    <th>도달수</th>
                                    <th>노출</th>
                                    <th>빈도</th>
                                    <th>비용</th>
                                    <th>CPM</th>
                                    <th>CTR</th>
                                    <th>ROAS</th>
                                    <th>CPC</th>
                                    <th>구매</th>
                                    <th>랜딩페이지뷰</th>
                                    <th>링크클릭</th>
                                    <th>결제정보추가</th>
                                    <th>장바구니</th>
                                    <th>구매전환율</th>
                                    <th>비용(원화)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listOfDate.map((date, index) =>
                                    <tr key={index}>
                                        <td>{date}</td>
                                        <td>
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
                                            <td key={option.pk}>
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
                                            <td key={option.pk}>
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
                                                                <td>{optionTotalCount[product.name][date]["totalCount"]}</td>
                                                            </>
                                                        :
                                                            <td>0</td>
                                                    }
                                                </>
                                            :
                                               <td>0</td>
                                        }
                                        {completeData.facebook_data.campaigns[product.name] ?
                                                <>
                                                    {completeData.facebook_data.campaigns[product.name][date] ? 
                                                            <>
                                                                <td>{completeData.facebook_data.campaigns[product.name][date]["reach"]}</td>
                                                                <td>{completeData.facebook_data.campaigns[product.name][date]["impressions"]}</td>
                                                                <td>{completeData.facebook_data.campaigns[product.name][date]["frequency"]}</td>
                                                                <td>{completeData.facebook_data.campaigns[product.name][date]["spend"]}</td>
                                                                <td>{completeData.facebook_data.campaigns[product.name][date]["cpm"]}</td>
                                                                <td>{completeData.facebook_data.campaigns[product.name][date]["website_ctr"]}</td>
                                                                <td>{completeData.facebook_data.campaigns[product.name][date]["purchase_roas"]}</td>
                                                                <td>{completeData.facebook_data.campaigns[product.name][date]["cost_per_unique_inline_link_click"]}</td>
                                                                <td>{completeData.facebook_data.campaigns[product.name][date]["purchase"]}</td>
                                                                <td>{completeData.facebook_data.campaigns[product.name][date]["landing_page_view"]}</td>
                                                                <td>{completeData.facebook_data.campaigns[product.name][date]["link_click"]}</td>
                                                                <td>{completeData.facebook_data.campaigns[product.name][date]["add_payment_info"]}</td>
                                                                <td>{completeData.facebook_data.campaigns[product.name][date]["add_to_cart"]}</td>
                                                            </>
                                                        :
                                                            <>
                                                                <td>0</td>
                                                                <td>0</td>
                                                                <td>0</td>
                                                                <td>0</td>
                                                                <td>0</td>
                                                                <td>0</td>
                                                                <td>0</td>
                                                                <td>0</td>
                                                                <td>0</td>
                                                                <td>0</td>
                                                                <td>0</td>
                                                                <td>0</td>
                                                                <td>0</td>
                                                            </>
                                                    }
                                                </>
                                            :
                                                <>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                </>
                                        }
                                        {conversionRate[product.name] ? 
                                                <>
                                                    {conversionRate[product.name][date] ? 
                                                            <>
                                                                <td>{conversionRate[product.name][date]["conversionRate"]}%</td>
                                                            </>
                                                        :
                                                            <td>0%</td>
                                                    }
                                                </>
                                            :
                                               <td>0%</td>
                                        }
                                        {spendKrw[product.name] ? 
                                                <>
                                                    {spendKrw[product.name][date] ? 
                                                            <>
                                                                <td>{spendKrw[product.name][date]["spendKrw"]}</td>
                                                            </>
                                                        :
                                                            <td>0</td>
                                                    }
                                                </>
                                            :
                                               <td>0</td>
                                        }
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