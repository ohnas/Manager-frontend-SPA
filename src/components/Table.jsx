import { useEffect, useState } from "react";

function Table({brand, completeData, listOfDate}) {
    const [saleRate, setSaleRate] = useState({});
    const [optionTotalCount, setOptionTotalCount] = useState({});
    const [conversionRate, setConversionRate] = useState({});
    const [productCost, setProductCost] = useState({});
    const [productProfit, setProductProfit] = useState({});
    const [logisticTotalCost, setLogisticTotalCost] = useState({});
    const [saleFee, setSaleFee] = useState({});
    const [totalCost, setTotalCost] = useState({});
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
                            let rate = Math.round((completeData.imweb_data.options[product.name][date][option.name] / completeData.imweb_data.products[product.name][date]["prod_count"]) * 100);
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
                        let rate = ((completeData.facebook_data.campaigns[product.name][date].purchase / completeData.facebook_data.campaigns[product.name][date].landing_page_view) * 100).toFixed(2);
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
    function handleProductCost() {
        if(Object.keys(optionTotalCount).length === 0) {
            return;
        } else {
            let productCostObj = {};
            brand.product_set.forEach((product) => {
                if(optionTotalCount[product.name]) {
                    productCostObj[product.name] = {};
                } else {
                    return;
                }
                listOfDate.forEach((date) => {
                    if(optionTotalCount[product.name][date]) {
                        let cost = product.cost * optionTotalCount[product.name][date]["totalCount"]
                        productCostObj[product.name][date] = {
                            "productCost" : cost,
                        };
                    } else {    
                        return;
                    }
                });
            });
            setProductCost(productCostObj);
        }
    }
    function handleProductProfit() {
        if(Object.keys(productCost).length === 0) {
            return;
        } else {
            let productProfitObj = {};
            brand.product_set.forEach((product) => {
                if(completeData.imweb_data.by_products_payment[product.name] && productCost[product.name]) {
                    productProfitObj[product.name] = {};
                } else {
                    return;
                }
                listOfDate.forEach((date) => {
                    if(completeData.imweb_data.by_products_payment[product.name][date] && productCost[product.name][date]) {
                        let profit = (completeData.imweb_data.by_products_payment[product.name][date]["price"] + completeData.imweb_data.by_products_payment[product.name][date]["deliv_price"]) - productCost[product.name][date]["productCost"]
                        productProfitObj[product.name][date] = {
                            "productProfit" : profit,
                        };
                    } else {    
                        return;
                    }
                });
            });
            setProductProfit(productProfitObj);
        }
    }
    function handleLogisticTotalCost() {
        if(Object.keys(completeData).length === 0) {
            return;
        } else {
            let logisticFeeObj = {}
            brand.product_set.forEach((product) => {
                if(completeData.imweb_data.options[product.name]) {
                    logisticFeeObj[product.name] = {};
                } else {
                    return;
                }
                listOfDate.forEach((date) => {
                    let logisticFee = 0;
                    if(completeData.imweb_data.options[product.name][date]) {
                        logisticFeeObj[product.name][date] ={}
                    } else {
                        return;
                    }
                    product.options_set.forEach((option) => {
                        if(completeData.imweb_data.options[product.name] && completeData.imweb_data.options[product.name][date] && completeData.imweb_data.options[product.name][date][option.name]) {
                            let optionLogisticFee = option.logistic_fee;
                            let fee = completeData.imweb_data.options[product.name][date][option.name] * optionLogisticFee;
                            logisticFee += fee;
                            logisticFeeObj[product.name][date]["logisticFee"] = logisticFee;
                        } else {
                            return;
                        }
                    });
                });
            });
            setLogisticTotalCost(logisticFeeObj);
        }
    }
    function handleSaleFee() {
        if(Object.keys(completeData).length === 0) {
            return;
        } else {
            let saleFeeObj = {};
            brand.product_set.forEach((product) => {
                if(completeData.imweb_data.by_products_payment[product.name]) {
                    saleFeeObj[product.name] = {};
                } else {
                    return;
                }
                listOfDate.forEach((date) => {
                    if(completeData.imweb_data.by_products_payment[product.name][date]) {
                        let fee = completeData.imweb_data.by_products_payment[product.name][date]["price"] * 0.033;
                        saleFeeObj[product.name][date] = {
                            "saleFee" : fee,
                        };
                    } else {    
                        return;
                    }
                });
            });
            setSaleFee(saleFeeObj);
        }
    }
    function handleTotalCost() {
        if(Object.keys(productCost).length === 0 || Object.keys(logisticTotalCost).length === 0 || Object.keys(saleFee).length === 0) {
            return;
        } else {
            let totalCostObj = {};
            brand.product_set.forEach((product) => {
                if(productCost[product.name] && logisticTotalCost[product.name] && saleFee[product.name]) {
                    totalCostObj[product.name] = {};
                } else {
                    return;
                }
                listOfDate.forEach((date) => {
                    if(productCost[product.name][date] && logisticTotalCost[product.name][date] && saleFee[product.name][date]) {
                        let cost = productCost[product.name][date]["productCost"] + logisticTotalCost[product.name][date]["logisticFee"] + saleFee[product.name][date]["saleFee"];
                        totalCostObj[product.name][date] = {
                            "totalCost" : cost,
                        };
                    } else {    
                        return;
                    }
                });
            });
            setTotalCost(totalCostObj);
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
                        let krw = Math.round(completeData.facebook_data.campaigns[product.name][date].spend * completeData.facebook_data.exchange_rate[date])
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
        handleProductCost();
    }, [optionTotalCount]);
    useEffect(() => {
        handleProductProfit();
    }, [productCost]);
    useEffect(() => {
        handleLogisticTotalCost();
    }, [completeData]);
    useEffect(() => {
        handleSaleFee();
    }, [completeData]);
    useEffect(() => {
        handleTotalCost();
    }, [productCost, logisticTotalCost, saleFee]);
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
                        <div key={product.pk} className="overflow-x-scroll w-full mt-5 mb-5 hover:border-2 border-blue-100">
                            <div className="sticky left-0 z-50 bg-white flex">
                                <span>{product.name}</span>
                                <div className="flex items-center ml-5 text-xs text-gray-500">
                                    <span>매출</span>
                                    <div className="w-3 h-3 bg-rose-300 rounded-full ml-1"></div>
                                </div>
                                <div className="flex items-center ml-5 text-xs text-gray-500">
                                    <span>원가</span>
                                    <div className="w-3 h-3 bg-fuchsia-300 rounded-full ml-1"></div>
                                </div>
                                <div className="flex items-center ml-5 text-xs text-gray-500">
                                    <span>이익</span>
                                    <div className="w-3 h-3 bg-indigo-300 rounded-full ml-1"></div>
                                </div>
                            </div>
                            <table className="whitespace-nowrap text-center">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="border-2 border-slate-400 px-24 py-2 sticky left-0 z-50 bg-gray-200">날짜</th>
                                        <th className="border-2 border-slate-400 px-8">주문</th>
                                        {product.options_set.map((option) =>
                                            <th key={option.pk} className="border-2 border-slate-400 px-16">{option.name}</th>
                                        )}
                                        {product.options_set.map((option) =>
                                            <th key={option.pk} className="border-2 border-slate-400 px-16">{option.name} 판매율</th>
                                        )}
                                        <th className="border-2 border-slate-400 px-8">총수량</th>
                                        <th className="border-2 border-slate-400 px-8">도달수</th>
                                        <th className="border-2 border-slate-400 px-8">노출</th>
                                        <th className="border-2 border-slate-400 px-8">빈도</th>
                                        <th className="border-2 border-slate-400 px-8">비용</th>
                                        <th className="border-2 border-slate-400 px-8">CPM</th>
                                        <th className="border-2 border-slate-400 px-8">CTR</th>
                                        <th className="border-2 border-slate-400 px-8">ROAS</th>
                                        <th className="border-2 border-slate-400 px-8">CPC</th>
                                        <th className="border-2 border-slate-400 px-8">구매</th>
                                        <th className="border-2 border-slate-400 px-8">랜딩페이지뷰</th>
                                        <th className="border-2 border-slate-400 px-8">링크클릭</th>
                                        <th className="border-2 border-slate-400 px-8">결제정보추가</th>
                                        <th className="border-2 border-slate-400 px-8">장바구니</th>
                                        <th className="border-2 border-slate-400 px-8">구매전환율</th>
                                        <th className="border-2 border-slate-400 px-8 bg-rose-300">상품 매출</th>
                                        <th className="border-2 border-slate-400 px-8 bg-rose-300">택배 매출</th>
                                        <th className="border-2 border-slate-400 px-8 bg-fuchsia-300">상품 원가</th>
                                        <th className="border-2 border-slate-400 px-8 bg-indigo-300">상품 이익</th>
                                        <th className="border-2 border-slate-400 px-8">비용(원화)</th>
                                        <th className="border-2 border-slate-400 px-8">물류비용</th>
                                        <th className="border-2 border-slate-400 px-8">판매수수료</th>
                                        <th className="border-2 border-slate-400 px-8">비용계</th>
                                        <th className="border-2 border-slate-400 px-8">판매이익</th>
                                        <th className="border-2 border-slate-400 px-8">이익-광고비</th>
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
                                                                                        {saleRate[product.name][date][option.name]}%
                                                                                    </>
                                                                                :
                                                                                    <>
                                                                                        0%
                                                                                    </>
                                                                            }
                                                                        </>
                                                                    :
                                                                        <>
                                                                            0%
                                                                        </>
                                                                }
                                                            </>
                                                        :
                                                            <>
                                                                0%
                                                            </>
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
                                                                    <td className="border-2">{completeData.facebook_data.campaigns[product.name][date]["frequency"].toFixed(2)}</td>
                                                                    <td className="border-2">US${completeData.facebook_data.campaigns[product.name][date]["spend"].toFixed(2)}</td>
                                                                    <td className="border-2">US${completeData.facebook_data.campaigns[product.name][date]["cpm"].toFixed(2)}</td>
                                                                    <td className="border-2">{completeData.facebook_data.campaigns[product.name][date]["website_ctr"].toFixed(2)}</td>
                                                                    <td className="border-2">{Math.round(completeData.facebook_data.campaigns[product.name][date]["purchase_roas"]*100)}%</td>
                                                                    <td className="border-2">US${completeData.facebook_data.campaigns[product.name][date]["cost_per_unique_inline_link_click"].toFixed(2)}</td>
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
                                                                    <td className="border-2">0.00</td>
                                                                    <td className="border-2">US$0.00</td>
                                                                    <td className="border-2">US$0.00</td>
                                                                    <td className="border-2">0.00</td>
                                                                    <td className="border-2">0%</td>
                                                                    <td className="border-2">US$0.00</td>
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
                                                    <td className="border-2">0.00</td>
                                                    <td className="border-2">US$0.00</td>
                                                    <td className="border-2">US$0.00</td>
                                                    <td className="border-2">0.00</td>
                                                    <td className="border-2">0%</td>
                                                    <td className="border-2">US$0.00</td>
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
                                                                <td className="border-2">0.00%</td>
                                                        }
                                                    </>
                                                :
                                                <td className="border-2">0.00%</td>
                                            }
                                            {completeData.imweb_data.by_products_payment[product.name] ? 
                                                    <>
                                                        {completeData.imweb_data.by_products_payment[product.name][date] ? 
                                                                <>
                                                                    <td className="border-2 bg-rose-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(completeData.imweb_data.by_products_payment[product.name][date]["price"])}</td>
                                                                </>
                                                            :
                                                                <td className="border-2 bg-rose-50">₩0</td>
                                                        }
                                                    </>
                                                :
                                                <td className="border-2 bg-rose-50">₩0</td>
                                            }
                                            {completeData.imweb_data.by_products_payment[product.name] ? 
                                                    <>
                                                        {completeData.imweb_data.by_products_payment[product.name][date] ? 
                                                                <>
                                                                    <td className="border-2 bg-rose-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(completeData.imweb_data.by_products_payment[product.name][date]["deliv_price"])}</td>
                                                                </>
                                                            :
                                                                <td className="border-2 bg-rose-50">₩0</td>
                                                        }
                                                    </>
                                                :
                                                <td className="border-2 bg-rose-50">₩0</td>
                                            }
                                            {productCost[product.name] ? 
                                                    <>
                                                        {productCost[product.name][date] ? 
                                                                <> 
                                                                    <td className="border-2 bg-fuchsia-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(productCost[product.name][date]["productCost"])}</td>
                                                                </>
                                                            :
                                                                <td className="border-2 bg-fuchsia-50">₩0</td>
                                                        }
                                                    </>
                                                :
                                                <td className="border-2 bg-fuchsia-50">₩0</td>
                                            }
                                            {productProfit[product.name] ? 
                                                    <>
                                                        {productProfit[product.name][date] ? 
                                                                <> 
                                                                    <td className="border-2 bg-indigo-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(productProfit[product.name][date]["productProfit"])}</td>
                                                                </>
                                                            :
                                                                <td className="border-2 bg-indigo-50">₩0</td>
                                                        }
                                                    </>
                                                :
                                                <td className="border-2 bg-indigo-50">₩0</td>
                                            }
                                            {totalCost[product.name] ? 
                                                    <>
                                                        {totalCost[product.name][date] ? 
                                                                <>
                                                                    <td className="border-2">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(totalCost[product.name][date]["totalCost"])}</td>
                                                                </>
                                                            :
                                                                <td className="border-2">₩0</td>
                                                        }
                                                    </>
                                                :
                                                <td className="border-2">₩0</td>
                                            }
                                            {spendKrw[product.name] ? 
                                                    <>
                                                        {spendKrw[product.name][date] ? 
                                                                <>
                                                                    <td className="border-2">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(spendKrw[product.name][date]["spendKrw"])}</td>
                                                                </>
                                                            :
                                                                <td className="border-2">₩0</td>
                                                        }
                                                    </>
                                                :
                                                <td className="border-2">₩0</td>
                                            }
                                            {logisticTotalCost[product.name] ? 
                                                    <>
                                                        {logisticTotalCost[product.name][date] ? 
                                                                <>
                                                                    <td className="border-2">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(logisticTotalCost[product.name][date]["logisticFee"])}</td>
                                                                </>
                                                            :
                                                                <td className="border-2">₩0</td>
                                                        }
                                                    </>
                                                :
                                                <td className="border-2">₩0</td>
                                            }
                                            {saleFee[product.name] ? 
                                                    <>
                                                        {saleFee[product.name][date] ? 
                                                                <>
                                                                    <td className="border-2">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(saleFee[product.name][date]["saleFee"])}</td>
                                                                </>
                                                            :
                                                                <td className="border-2">₩0</td>
                                                        }
                                                    </>
                                                :
                                                <td className="border-2">₩0</td>
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