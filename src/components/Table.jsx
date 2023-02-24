import { useEffect, useState } from "react";

function Table({brand, completeData, listOfDate}) {
    const [optionRate, setOptionRate] = useState({});
    const [optionCount, setOptionCount] = useState({});
    const [conversionRate, setConversionRate] = useState({});
    const [productCost, setProductCost] = useState({});
    const [productProfit, setProductProfit] = useState({});
    const [productExpense, setProductExpense] = useState({});
    const [productLogisticExpense, setProductLogisticExpense] = useState({});
    const [saleExpense, setSaleExpense] = useState({});
    const [facebookKrwExpense, setFacebookKrwExpense] = useState({});
    const [productOperatingProfit, setProductOperatingProfit] = useState({});
    const [totalConversionRate, setTotalConversionRate] = useState({});
    function handleOptionRate() {
        if(Object.keys(completeData).length === 0) {
            return;
        } else {
            let optionRateObj = {};
            brand.product_set.forEach((product) => {
                if(completeData.imweb_data.products[product.name]) {
                    optionRateObj[product.name] = {}
                } else {
                    return;
                }
                listOfDate.forEach((date) => {
                    if(completeData.imweb_data.products[product.name][date]) {
                        optionRateObj[product.name][date] = {}
                    } else {
                        return;
                    }
                    product.options_set.forEach((option) => {
                        if(completeData.imweb_data.options[product.name] && completeData.imweb_data.options[product.name][date] && completeData.imweb_data.options[product.name][date][option.name]) {
                            let rate = Math.round((completeData.imweb_data.options[product.name][date][option.name] / completeData.imweb_data.products[product.name][date]["prod_count"]) * 100);
                            optionRateObj[product.name][date][option.name] = rate;
                        } else {
                            return;
                        }
                    });
                });
            });
            setOptionRate(optionRateObj);
        }
    }
    function handleOptionCount() {
        if(Object.keys(completeData).length === 0) {
            return;
        } else {
            let optionCountObj = {};
            brand.product_set.forEach((product) => {
                if(completeData.imweb_data.options[product.name]) {
                    optionCountObj[product.name] = {};
                } else {
                    return;
                }
                listOfDate.forEach((date) => {
                    let optionCount = 0;
                    if(completeData.imweb_data.options[product.name][date]) {
                        optionCountObj[product.name][date] = {};
                    } else {
                        return;
                    }
                    product.options_set.forEach((option) => {
                        if(completeData.imweb_data.options[product.name] && completeData.imweb_data.options[product.name][date] && completeData.imweb_data.options[product.name][date][option.name]) {
                            let optionQuanitity = option.quantity;
                            let optionGiftQuantity = option.gift_quantity;
                            let count = (completeData.imweb_data.options[product.name][date][option.name] * optionQuanitity ) + (completeData.imweb_data.options[product.name][date][option.name] * optionGiftQuantity);
                            optionCount += count;
                            optionCountObj[product.name][date]["optionCount"] = optionCount;
                        } else {
                            return;
                        }
                    });
                });
            });
            setOptionCount(optionCountObj);
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
        if(Object.keys(optionCount).length === 0) {
            return;
        } else {
            let productCostObj = {};
            brand.product_set.forEach((product) => {
                if(optionCount[product.name]) {
                    productCostObj[product.name] = {};
                } else {
                    return;
                }
                listOfDate.forEach((date) => {
                    if(optionCount[product.name][date]) {
                        let cost = product.cost * optionCount[product.name][date]["optionCount"]
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
    function handleProductExpense() {
        if(Object.keys(productLogisticExpense).length === 0 || Object.keys(saleExpense).length === 0 || Object.keys(facebookKrwExpense).length === 0) {
            return;
        } else {
            let productExpenseObj = {};
            brand.product_set.forEach((product) => {
                if(productLogisticExpense[product.name] && saleExpense[product.name] && facebookKrwExpense[product.name]) {
                    productExpenseObj[product.name] = {};
                } else {
                    return;
                }
                listOfDate.forEach((date) => {
                    if(productLogisticExpense[product.name][date] && saleExpense[product.name][date] && facebookKrwExpense[product.name][date]) {
                        let expense = productLogisticExpense[product.name][date]["logisticExpense"] + saleExpense[product.name][date]["saleExpense"] + facebookKrwExpense[product.name][date]["facebookKrwExpense"];
                        productExpenseObj[product.name][date] = {
                            "productExpense" : expense,
                        };
                    } else {    
                        return;
                    }
                });
            });
            setProductExpense(productExpenseObj);
        }
    }
    function handleProductLogisticExpense() {
        if(Object.keys(completeData).length === 0) {
            return;
        } else {
            let productLogisticExpenseObj = {}
            brand.product_set.forEach((product) => {
                if(completeData.imweb_data.options[product.name]) {
                    productLogisticExpenseObj[product.name] = {};
                } else {
                    return;
                }
                listOfDate.forEach((date) => {
                    let logisticExpense = 0;
                    if(completeData.imweb_data.options[product.name][date]) {
                        productLogisticExpenseObj[product.name][date] ={}
                    } else {
                        return;
                    }
                    product.options_set.forEach((option) => {
                        if(completeData.imweb_data.options[product.name] && completeData.imweb_data.options[product.name][date] && completeData.imweb_data.options[product.name][date][option.name]) {
                            let optionLogisticExpense = option.logistic_fee;
                            let expense = completeData.imweb_data.options[product.name][date][option.name] * optionLogisticExpense;
                            logisticExpense += expense;
                            productLogisticExpenseObj[product.name][date]["logisticExpense"] = logisticExpense;
                        } else {
                            return;
                        }
                    });
                });
            });
            setProductLogisticExpense(productLogisticExpenseObj);
        }
    }
    function handleSaleExpense() {
        if(Object.keys(completeData).length === 0) {
            return;
        } else {
            let saleExpenseObj = {};
            brand.product_set.forEach((product) => {
                if(completeData.imweb_data.by_products_payment[product.name]) {
                    saleExpenseObj[product.name] = {};
                } else {
                    return;
                }
                listOfDate.forEach((date) => {
                    if(completeData.imweb_data.by_products_payment[product.name][date]) {
                        let expense = completeData.imweb_data.by_products_payment[product.name][date]["price"] * 0.033;
                        saleExpenseObj[product.name][date] = {
                            "saleExpense" : expense,
                        };
                    } else {    
                        return;
                    }
                });
            });
            setSaleExpense(saleExpenseObj);
        }
    }
    function handleFacebookKrwExpense() {
        if(Object.keys(completeData).length === 0) {
            return;
        } else {
            let facebookKrwExpenseObj = {};
            brand.product_set.forEach((product) => {
                if(completeData.facebook_data.campaigns[product.name]) {
                    facebookKrwExpenseObj[product.name] = {};
                } else {
                    return;
                }
                listOfDate.forEach((date) => {
                    if(completeData.facebook_data.campaigns[product.name][date]) {
                        let expense = Math.round(completeData.facebook_data.campaigns[product.name][date].spend * completeData.facebook_data.exchange_rate[date])
                        facebookKrwExpenseObj[product.name][date] = {
                            "facebookKrwExpense" : expense,
                        }
                    } else {
                        return;
                    }
                });
            });
            setFacebookKrwExpense(facebookKrwExpenseObj)
        }
    }
    function handleProductOperatingProfit() {
        if(Object.keys(productProfit).length === 0 || Object.keys(productExpense).length === 0) {
            return;
        } else {
            let productOperatingProfitObj = {};
            brand.product_set.forEach((product) => {
                if(productProfit[product.name] && productExpense[product.name]) {
                    productOperatingProfitObj[product.name] = {};
                } else {
                    return;
                }
                listOfDate.forEach((date) => {
                    if(productProfit[product.name][date] && productExpense[product.name][date]) {
                        let profit = (productProfit[product.name][date]["productProfit"] - productExpense[product.name][date]["productExpense"])
                        productOperatingProfitObj[product.name][date] = {
                            "productOperatingProfit" : profit,
                        };
                    } else {    
                        return;
                    }
                });
            });
            setProductOperatingProfit(productOperatingProfitObj);
        }
    }
    function handleTotalConversionRate() {
        if(Object.keys(completeData).length === 0) {
            return;
        } else {
            let totalConversionRateObj = {};
            listOfDate.forEach((date) => {
                if(completeData.facebook_data.by_date[date]) {
                    let rate = ((completeData.facebook_data.by_date[date].purchase / completeData.facebook_data.by_date[date].landing_page_view) * 100).toFixed(2);
                    totalConversionRateObj[date] = {
                        "totalConversionRate" : rate,
                    }
                } else {
                    return;
                }
            });
            setTotalConversionRate(totalConversionRateObj);
        }
    }
    function handleToggleBtn(event) {
        let curretBtn = event.target.nextElementSibling;
        curretBtn.classList.toggle("hidden");
        let curretText = event.target.innerText;
        if(curretText === "hidden") {
            event.target.innerText = "show";
        } else {
            event.target.innerText = "hidden";
        }
    }
    useEffect(() => {
        handleOptionRate();
    }, [completeData]);
    useEffect(() => {
        handleOptionCount();
    }, [completeData]);
    useEffect(() => {
        handleConversionRate();
    }, [completeData]);
    useEffect(() => {
        handleProductCost();
    }, [optionCount]);
    useEffect(() => {
        handleProductProfit();
    }, [productCost]);
    useEffect(() => {
        handleProductExpense();
    }, [productLogisticExpense, saleExpense, facebookKrwExpense]);
    useEffect(() => {
        handleProductLogisticExpense();
    }, [completeData]);
    useEffect(() => {
        handleSaleExpense();
    }, [completeData]);
    useEffect(() => {
        handleFacebookKrwExpense();
    }, [completeData]);
    useEffect(() => {
        handleProductOperatingProfit();
    }, [productProfit, productExpense]);
    useEffect(() => {
        handleTotalConversionRate();
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
                    <div className="overflow-x-scroll w-full mt-5 mb-5 hover:border-2 border-blue-100">
                        <div className="sticky left-0 z-50 bg-white flex">
                            <span>TOTAL</span>
                            <div className="flex items-center ml-5 text-xs text-gray-500">
                                <span>imweb</span>
                                <div className="w-3 h-3 bg-gray-300 rounded-full ml-1"></div>
                            </div>
                            <div className="flex items-center ml-5 text-xs text-gray-500">
                                <span>facebook</span>
                                <div className="w-3 h-3 bg-blue-300 rounded-full ml-1"></div>
                            </div>
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
                            <div className="flex items-center ml-5 text-xs text-gray-500">
                                <span>비용</span>
                                <div className="w-3 h-3 bg-green-300 rounded-full ml-1"></div>
                            </div>
                            <div className="flex items-center ml-5 text-xs text-gray-500">
                                <span>비율</span>
                                <div className="w-3 h-3 bg-yellow-300 rounded-full ml-1"></div>
                            </div>
                        </div>
                        <table className="whitespace-nowrap text-center">
                            <thead>
                                <tr>
                                    <th className="border-2 border-slate-400 px-24 py-2 sticky left-0 z-50 bg-white">날짜</th>
                                    <th className="border-2 border-slate-400 px-8 bg-gray-300">주문</th>
                                    <th className="border-2 border-slate-400 px-8 bg-blue-300">도달수</th>
                                    <th className="border-2 border-slate-400 px-8 bg-blue-300">노출</th>
                                    <th className="border-2 border-slate-400 px-8 bg-blue-300">빈도</th>
                                    <th className="border-2 border-slate-400 px-8 bg-blue-300">비용</th>
                                    <th className="border-2 border-slate-400 px-8 bg-blue-300">CPM</th>
                                    <th className="border-2 border-slate-400 px-8 bg-blue-300">CTR</th>
                                    <th className="border-2 border-slate-400 px-8 bg-blue-300">ROAS</th>
                                    <th className="border-2 border-slate-400 px-8 bg-blue-300">CPC</th>
                                    <th className="border-2 border-slate-400 px-8 bg-blue-300">구매</th>
                                    <th className="border-2 border-slate-400 px-8 bg-blue-300">랜딩페이지뷰</th>
                                    <th className="border-2 border-slate-400 px-8 bg-blue-300">링크클릭</th>
                                    <th className="border-2 border-slate-400 px-8 bg-blue-300">결제정보추가</th>
                                    <th className="border-2 border-slate-400 px-8 bg-blue-300">장바구니</th>
                                    <th className="border-2 border-slate-400 px-8 bg-blue-300">구매전환율</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listOfDate.map((date, index) => 
                                    <tr key={index}>
                                        <td className="sticky left-0 z-50 bg-white border-2">{date}</td>
                                        {completeData.imweb_data.total_order[date] ? 
                                                <td className="border-2 bg-gray-50">{completeData.imweb_data.total_order[date]["prod_count"]}</td>
                                            :
                                                <td className="border-2 bg-gray-50">0</td>
                                        }
                                        {completeData.facebook_data.by_date[date] ?
                                                <>
                                                    <td className="border-2 bg-blue-50">{completeData.facebook_data.by_date[date]["reach"]}</td>
                                                    <td className="border-2 bg-blue-50">{completeData.facebook_data.by_date[date]["impressions"]}</td>
                                                    <td className="border-2 bg-blue-50">{completeData.facebook_data.by_date[date]["frequency"].toFixed(2)}</td>
                                                    <td className="border-2 bg-blue-50">US${completeData.facebook_data.by_date[date]["spend"].toFixed(2)}</td>
                                                    <td className="border-2 bg-blue-50">US${completeData.facebook_data.by_date[date]["cpm"].toFixed(2)}</td>
                                                    <td className="border-2 bg-blue-50">{completeData.facebook_data.by_date[date]["website_ctr"].toFixed(2)}</td>
                                                    <td className="border-2 bg-blue-50">{Math.round(completeData.facebook_data.by_date[date]["purchase_roas"]*100)}%</td>
                                                    <td className="border-2 bg-blue-50">US${completeData.facebook_data.by_date[date]["cost_per_unique_inline_link_click"].toFixed(2)}</td>
                                                    <td className="border-2 bg-blue-50">{completeData.facebook_data.by_date[date]["purchase"]}</td>
                                                    <td className="border-2 bg-blue-50">{completeData.facebook_data.by_date[date]["landing_page_view"]}</td>
                                                    <td className="border-2 bg-blue-50">{completeData.facebook_data.by_date[date]["link_click"]}</td>
                                                    <td className="border-2 bg-blue-50">{completeData.facebook_data.by_date[date]["add_payment_info"]}</td>
                                                    <td className="border-2 bg-blue-50">{completeData.facebook_data.by_date[date]["add_to_cart"]}</td>
                                                </>
                                            :
                                                <>
                                                    <td className="border-2 bg-blue-50">0</td>
                                                    <td className="border-2 bg-blue-50">0</td>
                                                    <td className="border-2 bg-blue-50">0.00</td>
                                                    <td className="border-2 bg-blue-50">US$0.00</td>
                                                    <td className="border-2 bg-blue-50">US$0.00</td>
                                                    <td className="border-2 bg-blue-50">0.00</td>
                                                    <td className="border-2 bg-blue-50">0%</td>
                                                    <td className="border-2 bg-blue-50">US$0.00</td>
                                                    <td className="border-2 bg-blue-50">0</td>
                                                    <td className="border-2 bg-blue-50">0</td>
                                                    <td className="border-2 bg-blue-50">0</td>
                                                    <td className="border-2 bg-blue-50">0</td>
                                                    <td className="border-2 bg-blue-50">0</td>
                                                </>
                                        }
                                        {totalConversionRate[date] ? 
                                                <td className="border-2 bg-blue-50">{totalConversionRate[date]["totalConversionRate"]}%</td>   
                                            :
                                                <td>0.00%</td>
                                        }
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {brand.product_set.map((product) =>
                        <div key={product.pk} className="overflow-x-scroll w-full mt-5 mb-5 hover:border-2 border-blue-100">
                            <div className="sticky left-0 z-50 bg-white flex">
                                <span>{product.name}</span>
                                <div className="flex items-center ml-5 text-xs text-gray-500">
                                    <span>imweb</span>
                                    <div className="w-3 h-3 bg-gray-300 rounded-full ml-1"></div>
                                </div>
                                <div className="flex items-center ml-5 text-xs text-gray-500">
                                    <span>facebook</span>
                                    <div className="w-3 h-3 bg-blue-300 rounded-full ml-1"></div>
                                </div>
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
                                <div className="flex items-center ml-5 text-xs text-gray-500">
                                    <span>비용</span>
                                    <div className="w-3 h-3 bg-green-300 rounded-full ml-1"></div>
                                </div>
                                <div className="flex items-center ml-5 text-xs text-gray-500">
                                    <span>비율</span>
                                    <div className="w-3 h-3 bg-yellow-300 rounded-full ml-1"></div>
                                </div>
                            </div>
                            <button onClick={handleToggleBtn}>hidden</button>
                            <table className="whitespace-nowrap text-center">
                                <thead>
                                    <tr>
                                        <th className="border-2 border-slate-400 px-24 py-2 sticky left-0 z-50 bg-white">날짜</th>
                                        <th className="border-2 border-slate-400 px-8 bg-gray-300">주문</th>
                                        {product.options_set.map((option) =>
                                            <th key={option.pk} className="border-2 border-slate-400 px-16 bg-gray-300">{option.name}</th>
                                        )}
                                        {product.options_set.map((option) =>
                                            <th key={option.pk} className="border-2 border-slate-400 px-16 bg-gray-300">{option.name} 판매율</th>
                                        )}
                                        <th className="border-2 border-slate-400 px-8 bg-gray-300">총수량</th>
                                        <th className="border-2 border-slate-400 px-8 bg-blue-300">도달수</th>
                                        <th className="border-2 border-slate-400 px-8 bg-blue-300">노출</th>
                                        <th className="border-2 border-slate-400 px-8 bg-blue-300">빈도</th>
                                        <th className="border-2 border-slate-400 px-8 bg-blue-300">비용</th>
                                        <th className="border-2 border-slate-400 px-8 bg-blue-300">CPM</th>
                                        <th className="border-2 border-slate-400 px-8 bg-blue-300">CTR</th>
                                        <th className="border-2 border-slate-400 px-8 bg-blue-300">ROAS</th>
                                        <th className="border-2 border-slate-400 px-8 bg-blue-300">CPC</th>
                                        <th className="border-2 border-slate-400 px-8 bg-blue-300">구매</th>
                                        <th className="border-2 border-slate-400 px-8 bg-blue-300">랜딩페이지뷰</th>
                                        <th className="border-2 border-slate-400 px-8 bg-blue-300">링크클릭</th>
                                        <th className="border-2 border-slate-400 px-8 bg-blue-300">결제정보추가</th>
                                        <th className="border-2 border-slate-400 px-8 bg-blue-300">장바구니</th>
                                        <th className="border-2 border-slate-400 px-8 bg-blue-300">구매전환율</th>
                                        <th className="border-2 border-slate-400 px-8 bg-rose-300">상품 매출</th>
                                        <th className="border-2 border-slate-400 px-8 bg-rose-300">택배 매출</th>
                                        <th className="border-2 border-slate-400 px-8 bg-fuchsia-300">상품 원가</th>
                                        <th className="border-2 border-slate-400 px-8 bg-indigo-300">상품 이익</th>
                                        <th className="border-2 border-slate-400 px-8 bg-green-300">비용</th>
                                        <th className="border-2 border-slate-400 px-8 bg-green-300">물류(3pl)</th>
                                        <th className="border-2 border-slate-400 px-8 bg-green-300">판매 수수료</th>
                                        <th className="border-2 border-slate-400 px-8 bg-green-300">광고 비용(facebook 원화)</th>
                                        <th className="border-2 border-slate-400 px-8 bg-indigo-300">영업 이익</th>
                                        <th className="border-2 border-slate-400 px-8 bg-yellow-300">매출 대비 이익율</th>
                                        <th className="border-2 border-slate-400 px-8 bg-yellow-300">매출 대비 원가율</th>
                                        <th className="border-2 border-slate-400 px-8 bg-yellow-300">매출 대비 광고비율</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listOfDate.map((date, index) =>
                                        <tr key={index}>
                                            <td className="sticky left-0 z-50 bg-white border-2">{date}</td>
                                            <td className="border-2 bg-gray-50">
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
                                                <td key={option.pk} className="border-2 bg-gray-50">
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
                                                <td key={option.pk} className="border-2 bg-gray-50">
                                                    {optionRate[product.name] ?
                                                            <>
                                                                {optionRate[product.name][date] ? 
                                                                        <>
                                                                            {optionRate[product.name][date][option.name] ?
                                                                                    <>
                                                                                        {optionRate[product.name][date][option.name]}%
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
                                            {optionCount[product.name] ? 
                                                    <>
                                                        {optionCount[product.name][date] ? 
                                                                <>
                                                                    <td className="border-2 bg-gray-50">{optionCount[product.name][date]["optionCount"]}</td>
                                                                </>
                                                            :
                                                                <td className="border-2 bg-gray-50">0</td>
                                                        }
                                                    </>
                                                :
                                                <td className="border-2 bg-gray-50">0</td>
                                            }
                                            {completeData.facebook_data.campaigns[product.name] ?
                                                    <>
                                                        {completeData.facebook_data.campaigns[product.name][date] ? 
                                                                <>
                                                                    <td className="border-2 bg-blue-50">{completeData.facebook_data.campaigns[product.name][date]["reach"]}</td>
                                                                    <td className="border-2 bg-blue-50">{completeData.facebook_data.campaigns[product.name][date]["impressions"]}</td>
                                                                    <td className="border-2 bg-blue-50">{completeData.facebook_data.campaigns[product.name][date]["frequency"].toFixed(2)}</td>
                                                                    <td className="border-2 bg-blue-50">US${completeData.facebook_data.campaigns[product.name][date]["spend"].toFixed(2)}</td>
                                                                    <td className="border-2 bg-blue-50">US${completeData.facebook_data.campaigns[product.name][date]["cpm"].toFixed(2)}</td>
                                                                    <td className="border-2 bg-blue-50">{completeData.facebook_data.campaigns[product.name][date]["website_ctr"].toFixed(2)}</td>
                                                                    <td className="border-2 bg-blue-50">{Math.round(completeData.facebook_data.campaigns[product.name][date]["purchase_roas"]*100)}%</td>
                                                                    <td className="border-2 bg-blue-50">US${completeData.facebook_data.campaigns[product.name][date]["cost_per_unique_inline_link_click"].toFixed(2)}</td>
                                                                    <td className="border-2 bg-blue-50">{completeData.facebook_data.campaigns[product.name][date]["purchase"]}</td>
                                                                    <td className="border-2 bg-blue-50">{completeData.facebook_data.campaigns[product.name][date]["landing_page_view"]}</td>
                                                                    <td className="border-2 bg-blue-50">{completeData.facebook_data.campaigns[product.name][date]["link_click"]}</td>
                                                                    <td className="border-2 bg-blue-50">{completeData.facebook_data.campaigns[product.name][date]["add_payment_info"]}</td>
                                                                    <td className="border-2 bg-blue-50">{completeData.facebook_data.campaigns[product.name][date]["add_to_cart"]}</td>
                                                                </>
                                                            :
                                                                <>
                                                                    <td className="border-2 bg-blue-50">0</td>
                                                                    <td className="border-2 bg-blue-50">0</td>
                                                                    <td className="border-2 bg-blue-50">0.00</td>
                                                                    <td className="border-2 bg-blue-50">US$0.00</td>
                                                                    <td className="border-2 bg-blue-50">US$0.00</td>
                                                                    <td className="border-2 bg-blue-50">0.00</td>
                                                                    <td className="border-2 bg-blue-50">0%</td>
                                                                    <td className="border-2 bg-blue-50">US$0.00</td>
                                                                    <td className="border-2 bg-blue-50">0</td>
                                                                    <td className="border-2 bg-blue-50">0</td>
                                                                    <td className="border-2 bg-blue-50">0</td>
                                                                    <td className="border-2 bg-blue-50">0</td>
                                                                    <td className="border-2 bg-blue-50">0</td>
                                                                </>
                                                        }
                                                    </>
                                                :
                                                    <>
                                                    <td className="border-2 bg-blue-50">0</td>
                                                    <td className="border-2 bg-blue-50">0</td>
                                                    <td className="border-2 bg-blue-50">0.00</td>
                                                    <td className="border-2 bg-blue-50">US$0.00</td>
                                                    <td className="border-2 bg-blue-50">US$0.00</td>
                                                    <td className="border-2 bg-blue-50">0.00</td>
                                                    <td className="border-2 bg-blue-50">0%</td>
                                                    <td className="border-2 bg-blue-50">US$0.00</td>
                                                    <td className="border-2 bg-blue-50">0</td>
                                                    <td className="border-2 bg-blue-50">0</td>
                                                    <td className="border-2 bg-blue-50">0</td>
                                                    <td className="border-2 bg-blue-50">0</td>
                                                    <td className="border-2 bg-blue-50">0</td>
                                                    </>
                                            }
                                            {conversionRate[product.name] ? 
                                                    <>
                                                        {conversionRate[product.name][date] ? 
                                                                <>
                                                                    <td className="border-2 bg-blue-50">{conversionRate[product.name][date]["conversionRate"]}%</td>
                                                                </>
                                                            :
                                                                <td className="border-2 bg-blue-50">0.00%</td>
                                                        }
                                                    </>
                                                :
                                                <td className="border-2 bg-blue-50">0.00%</td>
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
                                            {productExpense[product.name] ? 
                                                    <>
                                                        {productExpense[product.name][date] ? 
                                                                <>
                                                                    <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(productExpense[product.name][date]["productExpense"])}</td>
                                                                </>
                                                            :
                                                                <td className="border-2 bg-green-50">₩0</td>
                                                        }
                                                    </>
                                                :
                                                <td className="border-2 bg-green-50">₩0</td>
                                            }
                                            {productLogisticExpense[product.name] ? 
                                                    <>
                                                        {productLogisticExpense[product.name][date] ? 
                                                                <>
                                                                    <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(productLogisticExpense[product.name][date]["logisticExpense"])}</td>
                                                                </>
                                                            :
                                                                <td className="border-2 bg-green-50">₩0</td>
                                                        }
                                                    </>
                                                :
                                                <td className="border-2 bg-green-50">₩0</td>
                                            }
                                            {saleExpense[product.name] ? 
                                                    <>
                                                        {saleExpense[product.name][date] ? 
                                                                <>
                                                                    <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(saleExpense[product.name][date]["saleExpense"])}</td>
                                                                </>
                                                            :
                                                                <td className="border-2 bg-green-50">₩0</td>
                                                        }
                                                    </>
                                                :
                                                <td className="border-2 bg-green-50">₩0</td>
                                            }
                                            {facebookKrwExpense[product.name] ? 
                                                    <>
                                                        {facebookKrwExpense[product.name][date] ? 
                                                                <>
                                                                    <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(facebookKrwExpense[product.name][date]["facebookKrwExpense"])}</td>
                                                                </>
                                                            :
                                                                <td className="border-2 bg-green-50">₩0</td>
                                                        }
                                                    </>
                                                :
                                                <td className="border-2 bg-green-50">₩0</td>
                                            }
                                            {productOperatingProfit[product.name] ? 
                                                    <>
                                                        {productOperatingProfit[product.name][date] ? 
                                                                <>
                                                                    <td className="border-2 bg-indigo-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(productOperatingProfit[product.name][date]["productOperatingProfit"])}</td>
                                                                </>
                                                            :
                                                                <td className="border-2 bg-indigo-50">₩0</td>
                                                        }
                                                    </>
                                                :
                                                <td className="border-2 bg-indigo-50">₩0</td>
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