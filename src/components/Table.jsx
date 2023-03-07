import { useEffect, useState } from "react";
import { baseUrl } from "../api";

function Table({brand, completeData, listOfDate, selectedDate, brandPk}) {
    const [eventCount, setEventCount] = useState({});
    const [events, setEvents] = useState({});
    const [optionRate, setOptionRate] = useState({});
    const [optionCount, setOptionCount] = useState({});
    const [conversionRate, setConversionRate] = useState({});
    const [productCost, setProductCost] = useState({});
    const [productProfit, setProductProfit] = useState({});
    const [productLogisticExpense, setProductLogisticExpense] = useState({});
    const [saleExpense, setSaleExpense] = useState({});
    const [facebookKrwExpense, setFacebookKrwExpense] = useState({});
    const [productExpense, setProductExpense] = useState({});
    const [productOperatingProfit, setProductOperatingProfit] = useState({});
    const [productOperatingProfitRate, setProductOperatingProfitRate] = useState({});
    const [productCostRate, setProductCostRate] = useState({});
    const [advertisementRate, setAdvertisementRate] = useState({});
    const [totalConversionRate, setTotalConversionRate] = useState({});
    const [totalProductCost, setTotalProductCost] = useState({});
    const [totalProductProfit, setTotalProductProfit] = useState({});
    const [totalProductLogisticExpense, setTotalProductLogisticExpense] = useState({});
    const [totalSaleExpense, setTotalSaleExpense] = useState({});
    const [totalFacebookKrwExpense, setTotalFacebookKrwExpense] = useState({});
    const [totalProductExpense, setTotalProductExpense] = useState({});
    const [totalProductOperatingProfit, setTotalProductOperatingProfit] = useState({});
    const [totalProductOperatingProfitRate, setTotalProductOperatingProfitRate] = useState({});
    const [totalProductCostRate, setTotalProductCostRate] = useState({});
    const [totalAdvertisementRate, setTotalAdvertisementRate] = useState({});
    async function getEvent() {
        if(Object.keys(selectedDate).length === 0) {
            return;
        } else {
            let response = await fetch(`${baseUrl}/events/${brandPk}?dateFrom=${selectedDate.dateFrom}&dateTo=${selectedDate.dateTo}`, {
                method : "GET",
                credentials: "include",
                headers : {
                    'Content-Type': 'application/json',
                },
            });
            let data = await response.json();
            if (response.ok) {
                let eventCountObj = {};
                listOfDate.forEach((date) => {
                    let count = data.filter((d) => 
                        d.event_date === date
                    );
                    eventCountObj[date] = count.length;
                });
                setEventCount(eventCountObj);
                let eventsObj = {};
                brand.product_set.forEach((product) =>{
                    eventsObj[product.name] = {};
                    listOfDate.forEach((date) => {
                        let event = data.filter((d) =>
                            d.product.name === product.name && d.event_date === date
                        );
                        if(event.length !== 0) {
                            eventsObj[product.name][date] = event;
                        } else {
                            return;
                        }
                    });
                });
                setEvents(eventsObj);
            }
        }
    }
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
                    if(productLogisticExpense[product.name][date] && saleExpense[product.name][date] && facebookKrwExpense[product.name][date] && completeData.imweb_data.by_products_payment[product.name][date]) {
                        let expense = productLogisticExpense[product.name][date]["logisticExpense"] + saleExpense[product.name][date]["saleExpense"] + facebookKrwExpense[product.name][date]["facebookKrwExpense"] + completeData.imweb_data.by_products_payment[product.name][date]["coupon"] + completeData.imweb_data.by_products_payment[product.name][date]["point"] + completeData.imweb_data.by_products_payment[product.name][date]["membership_discount"] + completeData.imweb_data.by_products_payment[product.name][date]["price_sale"] + completeData.imweb_data.by_products_payment[product.name][date]["period_discount"];
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
                        let profit = (productProfit[product.name][date]["productProfit"] - productExpense[product.name][date]["productExpense"]);
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
    function handleProductOperatingProfitRate() {
        if(Object.keys(productOperatingProfit).length === 0) {
            return;
        } else {
            let productOperatingProfitRateObj = {};
            brand.product_set.forEach((product) => {
                if(productOperatingProfit[product.name]) {
                    productOperatingProfitRateObj[product.name] = {};
                } else {
                    return;
                }
                listOfDate.forEach((date) => {
                    if(productOperatingProfit[product.name][date] && completeData.imweb_data.by_products_payment[product.name][date]) {
                        let rate = ((productOperatingProfit[product.name][date]["productOperatingProfit"] / completeData.imweb_data.by_products_payment[product.name][date]["price"]) * 100).toFixed(2);
                        productOperatingProfitRateObj[product.name][date] = {
                            "productOperatingProfitRate" : rate,
                        };
                    } else {    
                        return;
                    }
                });
            });
            setProductOperatingProfitRate(productOperatingProfitRateObj);
        }
    }
    function handleProductCostRate() {
        if(Object.keys(productCost).length === 0) {
            return;
        } else {
            let productCostRateObj = {};
            brand.product_set.forEach((product) => {
                if(productCost[product.name]) {
                    productCostRateObj[product.name] = {};
                } else {
                    return;
                }
                listOfDate.forEach((date) => {
                    if(productCost[product.name][date] && completeData.imweb_data.by_products_payment[product.name][date]) {
                        let rate = ((productCost[product.name][date]["productCost"] / completeData.imweb_data.by_products_payment[product.name][date]["price"]) * 100).toFixed(2);
                        productCostRateObj[product.name][date] = {
                            "productCostRate" : rate,
                        };
                    } else {    
                        return;
                    }
                });
            });
            setProductCostRate(productCostRateObj);
        }
    }
    function handleAdvertisementRate() {
        if(Object.keys(facebookKrwExpense).length === 0) {
            return;
        } else {
            let advertisementRateObj = {};
            brand.product_set.forEach((product) => {
                if(facebookKrwExpense[product.name]) {
                    advertisementRateObj[product.name] = {};
                } else {
                    return;
                }
                listOfDate.forEach((date) => {
                    if(facebookKrwExpense[product.name][date] && completeData.imweb_data.by_products_payment[product.name][date]) {
                        let rate = ((facebookKrwExpense[product.name][date]["facebookKrwExpense"] / completeData.imweb_data.by_products_payment[product.name][date]["price"]) * 100).toFixed(2);
                        advertisementRateObj[product.name][date] = {
                            "advertisementRate" : rate,
                        };
                    } else {    
                        return;
                    }
                });
            });
            setAdvertisementRate(advertisementRateObj);
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
    function handleTotalProductCost() {
        if(Object.keys(productCost).length === 0) {
            return;
        } else {
            let totalProductCostArray = [];
            brand.product_set.forEach((product) => {
                if(!productCost[product.name]) {
                    return;
                }
                listOfDate.forEach((date) => {
                    if(productCost[product.name][date]) {
                        totalProductCostArray.push({[date] : productCost[product.name][date]["productCost"]})
                    } else {
                        return;
                    }
                });
            });
            let totalProductCostObj = {};
            listOfDate.forEach((date) => {
                let initialCost = 0;
                totalProductCostArray.forEach((dateCost) => {
                    if(dateCost.hasOwnProperty(date)) {
                        let cost = dateCost[date];
                        initialCost += cost;
                        totalProductCostObj[date] = {
                            "totalProductCost" : initialCost,
                        }
                    } else {
                        return;
                    }
                });
            });
            setTotalProductCost(totalProductCostObj);
        }
    }
    function handleTotalProductProfit() {
        if(Object.keys(productProfit).length === 0) {
            return;
        } else {
            let totalProductProfitArray = [];
            brand.product_set.forEach((product) => {
                if(!productProfit[product.name]) {
                    return;
                }
                listOfDate.forEach((date) => {
                    if(productProfit[product.name][date]) {
                        totalProductProfitArray.push({[date] : productProfit[product.name][date]["productProfit"]})
                    } else {
                        return;
                    }
                });
            });
            let totalProductProfitObj = {};
            listOfDate.forEach((date) => {
                let initialProfit = 0;
                totalProductProfitArray.forEach((dateProfit) => {
                    if(dateProfit.hasOwnProperty(date)) {
                        let profit = dateProfit[date];
                        initialProfit += profit;
                        totalProductProfitObj[date] = {
                            "totalProductProfit" : initialProfit,
                        }
                    } else {
                        return;
                    }
                });
            });
            setTotalProductProfit(totalProductProfitObj);
        }
    }
    function handleTotalProductLogisticExpense() {
        if(Object.keys(productLogisticExpense).length === 0) {
            return;
        } else {
            let totalProductLogisticExpenseArray = [];
            brand.product_set.forEach((product) => {
                if(!productLogisticExpense[product.name]) {
                    return;
                }
                listOfDate.forEach((date) => {
                    if(productLogisticExpense[product.name][date]) {
                        totalProductLogisticExpenseArray.push({[date] : productLogisticExpense[product.name][date]["logisticExpense"]})
                    } else {
                        return;
                    }
                });
            });
            let totalProductLogisticExpenseObj = {};
            listOfDate.forEach((date) => {
                let initialExpense = 0;
                totalProductLogisticExpenseArray.forEach((dateExpense) => {
                    if(dateExpense.hasOwnProperty(date)) {
                        let expense = dateExpense[date];
                        initialExpense += expense;
                        totalProductLogisticExpenseObj[date] = {
                            "totalProductLogisticExpense" : initialExpense,
                        }
                    } else {
                        return;
                    }
                });
            });
            setTotalProductLogisticExpense(totalProductLogisticExpenseObj);
        }
    }
    function handleTotalSaleExpense() {
        if(Object.keys(saleExpense).length === 0) {
            return;
        } else {
            let totalSaleExpenseArray = [];
            brand.product_set.forEach((product) => {
                if(!saleExpense[product.name]) {
                    return;
                }
                listOfDate.forEach((date) => {
                    if(saleExpense[product.name][date]) {
                        totalSaleExpenseArray.push({[date] : saleExpense[product.name][date]["saleExpense"]})
                    } else {
                        return;
                    }
                });
            });
            let totalSaleExpenseObj = {};
            listOfDate.forEach((date) => {
                let initialExpense = 0;
                totalSaleExpenseArray.forEach((dateExpense) => {
                    if(dateExpense.hasOwnProperty(date)) {
                        let expense = dateExpense[date];
                        initialExpense += expense;
                        totalSaleExpenseObj[date] = {
                            "totalSaleExpense" : initialExpense,
                        }
                    } else {
                        return;
                    }
                });
            });
            setTotalSaleExpense(totalSaleExpenseObj);
        }
    }
    function handleTotalFacebookKrwExpense() {
        if(Object.keys(facebookKrwExpense).length === 0) {
            return;
        } else {
            let totalFacebookKrwExpenseArray = [];
            brand.product_set.forEach((product) => {
                if(!facebookKrwExpense[product.name]) {
                    return;
                }
                listOfDate.forEach((date) => {
                    if(facebookKrwExpense[product.name][date]) {
                        totalFacebookKrwExpenseArray.push({[date] : facebookKrwExpense[product.name][date]["facebookKrwExpense"]})
                    } else {
                        return;
                    }
                });
            });
            let totalFacebookKrwExpenseObj = {};
            listOfDate.forEach((date) => {
                let initialExpense = 0;
                totalFacebookKrwExpenseArray.forEach((dateExpense) => {
                    if(dateExpense.hasOwnProperty(date)) {
                        let expense = dateExpense[date];
                        initialExpense += expense;
                        totalFacebookKrwExpenseObj[date] = {
                            "totalFacebookKrwExpense" : initialExpense,
                        }
                    } else {
                        return;
                    }
                });
            });
            setTotalFacebookKrwExpense(totalFacebookKrwExpenseObj);
        }
    }
    function handleTotalProductExpense() {
        if(Object.keys(productExpense).length === 0) {
            return;
        } else {
            let totalProductExpenseArray = [];
            brand.product_set.forEach((product) => {
                if(!productExpense[product.name]) {
                    return;
                }
                listOfDate.forEach((date) => {
                    if(productExpense[product.name][date]) {
                        totalProductExpenseArray.push({[date] : productExpense[product.name][date]["productExpense"]})
                    } else {
                        return;
                    }
                });
            });
            let totalProductExpenseObj = {};
            listOfDate.forEach((date) => {
                let initialExpense = 0;
                totalProductExpenseArray.forEach((dateExpense) => {
                    if(dateExpense.hasOwnProperty(date)) {
                        let expense = dateExpense[date];
                        initialExpense += expense;
                        totalProductExpenseObj[date] = {
                            "totalProductExpense" : initialExpense,
                        }
                    } else {
                        return;
                    }
                });
            });
            setTotalProductExpense(totalProductExpenseObj);
        }
    }
    function handleTotalProductOperatingProfit() {
        if(Object.keys(productOperatingProfit).length === 0) {
            return;
        } else {
            let totalProductOperatingProfitArray = [];
            brand.product_set.forEach((product) => {
                if(!productOperatingProfit[product.name]) {
                    return;
                }
                listOfDate.forEach((date) => {
                    if(productOperatingProfit[product.name][date]) {
                        totalProductOperatingProfitArray.push({[date] : productOperatingProfit[product.name][date]["productOperatingProfit"]})
                    } else {
                        return;
                    }
                });
            });
            let totalProductOperatingProfitObj = {};
            listOfDate.forEach((date) => {
                let initialProfit = 0;
                totalProductOperatingProfitArray.forEach((dateProfit) => {
                    if(dateProfit.hasOwnProperty(date)) {
                        let profit = dateProfit[date];
                        initialProfit += profit;
                        totalProductOperatingProfitObj[date] = {
                            "totalProductOperatingProfit" : initialProfit,
                        }
                    } else {
                        return;
                    }
                });
            });
            setTotalProductOperatingProfit(totalProductOperatingProfitObj);
        }
    }
    function handleTotalProductOperatingProfitRate() {
        if(Object.keys(totalProductOperatingProfit).length === 0) {
            return;
        } else {
            let totalProductOperatingProfitRateObj = {};
                listOfDate.forEach((date) => {
                    if(totalProductOperatingProfit[date] && completeData.imweb_data.by_date_payment[date]) {
                        let rate = ((totalProductOperatingProfit[date]["totalProductOperatingProfit"] / completeData.imweb_data.by_date_payment[date]["price"]) * 100).toFixed(2);
                        totalProductOperatingProfitRateObj[date] = {
                            "totalProductOperatingProfitRate" : rate,
                        };
                    } else {    
                        return;
                    }
                });
            setTotalProductOperatingProfitRate(totalProductOperatingProfitRateObj);
        }
    }
    function handleTotalProductCostRate() {
        if(Object.keys(totalProductCost).length === 0) {
            return;
        } else {
            let totalProductCostRateObj = {};
                listOfDate.forEach((date) => {
                    if(totalProductCost[date] && completeData.imweb_data.by_date_payment[date]) {
                        let rate = ((totalProductCost[date]["totalProductCost"] / completeData.imweb_data.by_date_payment[date]["price"]) * 100).toFixed(2);
                        totalProductCostRateObj[date] = {
                            "totalProductCostRate" : rate,
                        };
                    } else {    
                        return;
                    }
                });
            setTotalProductCostRate(totalProductCostRateObj);
        }
    }
    function handleTotalAdvertisementRate() {
        if(Object.keys(totalFacebookKrwExpense).length === 0) {
            return;
        } else {
            let totalAdvertisementRateObj = {};
                listOfDate.forEach((date) => {
                    if(totalFacebookKrwExpense[date] && completeData.imweb_data.by_date_payment[date]) {
                        let rate = ((totalFacebookKrwExpense[date]["totalFacebookKrwExpense"] / completeData.imweb_data.by_date_payment[date]["price"]) * 100).toFixed(2);
                        totalAdvertisementRateObj[date] = {
                            "totalAdvertisementRate" : rate,
                        };
                    } else {    
                        return;
                    }
                });
            setTotalAdvertisementRate(totalAdvertisementRateObj);
        }
    }
    function handleToggleBtn(event) {
        let curretBtn = event.target.nextElementSibling;
        curretBtn.classList.toggle("hidden");
        let curretText = event.target.innerText;
        if(curretText === "show") {
            event.target.innerText = "hide";
        } else {
            event.target.innerText = "show";
        }
    }
    useEffect(() => {
        getEvent();
    }, [selectedDate]);
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
        handleProductOperatingProfitRate();
    }, [productOperatingProfit]);
    useEffect(() => {
        handleProductCostRate();
    }, [productCost]);
    useEffect(() => {
        handleAdvertisementRate();
    }, [facebookKrwExpense]);
    useEffect(() => {
        handleTotalConversionRate();
    }, [completeData]);
    useEffect(() => {
        handleTotalProductCost();
    }, [productCost]);
    useEffect(() => {
        handleTotalProductProfit();
    }, [productProfit]);
    useEffect(() => {
        handleTotalProductLogisticExpense();
    }, [productLogisticExpense]);
    useEffect(() => {
        handleTotalSaleExpense();
    }, [saleExpense]);
    useEffect(() => {
        handleTotalFacebookKrwExpense();
    }, [facebookKrwExpense]);
    useEffect(() => {
        handleTotalProductExpense();
    }, [productExpense]);
    useEffect(() => {
        handleTotalProductOperatingProfit();
    }, [productOperatingProfit]);
    useEffect(() => {
        handleTotalProductOperatingProfitRate();
    }, [totalProductOperatingProfit]);
    useEffect(() => {
        handleTotalProductCostRate();
    }, [totalProductCost]);
    useEffect(() => {
        handleTotalAdvertisementRate();
    }, [totalFacebookKrwExpense]);
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
                    <div className="border-2 rounded-md w-32 mt-5 text-center">
                        <button className="text-gray-400">Add an event</button>
                    </div>
                    <div className="overflow-x-scroll w-full mt-5 mb-5 hover:border-2 border-blue-100">
                        <div className="sticky left-0 z-50 bg-white flex">
                            <span>TOTAL</span>
                            <div className="flex items-center ml-5 text-xs text-gray-500">
                                <span>이벤트</span>
                                <div className="w-3 h-3 bg-red-400 rounded-full ml-1"></div>
                            </div>
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
                                    <th className="border-2 border-slate-400 px-8 bg-red-400">이벤트</th>
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
                                    <th className="border-2 border-slate-400 px-8 bg-rose-300">상품 매출</th>
                                    <th className="border-2 border-slate-400 px-8 bg-rose-300">택배 매출</th>
                                    <th className="border-2 border-slate-400 px-8 bg-fuchsia-300">상품 원가</th>
                                    <th className="border-2 border-slate-400 px-8 bg-indigo-300">상품 이익</th>
                                    <th className="border-2 border-slate-400 px-8 bg-green-300">물류(3pl)</th>
                                    <th className="border-2 border-slate-400 px-8 bg-green-300">판매 수수료</th>
                                    <th className="border-2 border-slate-400 px-8 bg-green-300">광고 비용(facebook 원화)</th>
                                    <th className="border-2 border-slate-400 px-8 bg-green-300">imweb(쿠폰)</th>
                                    <th className="border-2 border-slate-400 px-8 bg-green-300">imweb(적립금)</th>
                                    <th className="border-2 border-slate-400 px-8 bg-green-300">imweb(쇼핑등급 할인)</th>
                                    <th className="border-2 border-slate-400 px-8 bg-green-300">imweb(즉시 할인)</th>
                                    <th className="border-2 border-slate-400 px-8 bg-green-300">imweb(기간 할인)</th>
                                    <th className="border-2 border-slate-400 px-8 bg-green-300">비용</th>
                                    <th className="border-4 border-black px-8 bg-indigo-300">영업 이익</th>
                                    <th className="border-2 border-slate-400 px-8 bg-yellow-300">매출 대비 이익율</th>
                                    <th className="border-2 border-slate-400 px-8 bg-yellow-300">매출 대비 원가율</th>
                                    <th className="border-2 border-slate-400 px-8 bg-yellow-300">매출 대비 광고비율</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listOfDate.map((date, index) => 
                                    <tr key={index}>
                                        <td className="sticky left-0 z-50 bg-white border-2">{date}</td>
                                        {eventCount.hasOwnProperty(date) ? 
                                                <td className="border-2 bg-red-50">{eventCount[date]}건</td>
                                            :
                                                <td className="border-2 bg-red-50">0건</td>
                                        }
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
                                        {completeData.imweb_data.by_date_payment[date] ? 
                                                <td className="border-2 bg-rose-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(completeData.imweb_data.by_date_payment[date]["price"])}</td>
                                            :
                                                <td className="border-2 bg-rose-50">₩0</td>
                                        }
                                        {completeData.imweb_data.by_date_payment[date] ? 
                                                <td className="border-2 bg-rose-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(completeData.imweb_data.by_date_payment[date]["deliv_price"])}</td>
                                            :
                                                <td className="border-2 bg-rose-50">₩0</td>
                                        }
                                        {totalProductCost[date] ? 
                                                <td className="border-2 bg-fuchsia-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(totalProductCost[date]["totalProductCost"])}</td>
                                            :
                                                <td className="border-2 bg-fuchsia-50">₩0</td>
                                        }
                                        {totalProductProfit[date] ? 
                                                <td className="border-2 bg-indigo-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(totalProductProfit[date]["totalProductProfit"])}</td>
                                            :
                                                <td className="border-2 bg-indigo-50">₩0</td>
                                        }
                                        {totalProductLogisticExpense[date] ? 
                                                <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(totalProductLogisticExpense[date]["totalProductLogisticExpense"])}</td>
                                            :
                                                <td className="border-2 bg-green-50">₩0</td>
                                        }
                                        {totalSaleExpense[date] ? 
                                                <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(totalSaleExpense[date]["totalSaleExpense"])}</td>
                                            :
                                                <td className="border-2 bg-green-50">₩0</td>
                                        }
                                        {totalFacebookKrwExpense[date] ? 
                                                <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(totalFacebookKrwExpense[date]["totalFacebookKrwExpense"])}</td>
                                            :
                                                <td className="border-2 bg-green-50">₩0</td>
                                        }
                                        {completeData.imweb_data.by_date_payment[date] ? 
                                                <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(completeData.imweb_data.by_date_payment[date]["coupon"])}</td>
                                            :
                                                <td className="border-2 bg-green-50">₩0</td>
                                        }
                                        {completeData.imweb_data.by_date_payment[date] ? 
                                                <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(completeData.imweb_data.by_date_payment[date]["point"])}</td>
                                            :
                                                <td className="border-2 bg-green-50">₩0</td>
                                        }
                                        {completeData.imweb_data.by_date_payment[date] ? 
                                                <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(completeData.imweb_data.by_date_payment[date]["membership_discount"])}</td>
                                            :
                                                <td className="border-2 bg-green-50">₩0</td>
                                        }
                                        {completeData.imweb_data.by_date_payment[date] ? 
                                                <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(completeData.imweb_data.by_date_payment[date]["price_sale"])}</td>
                                            :
                                                <td className="border-2 bg-green-50">₩0</td>
                                        }
                                        {completeData.imweb_data.by_date_payment[date] ? 
                                                <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(completeData.imweb_data.by_date_payment[date]["period_discount"])}</td>
                                            :
                                                <td className="border-2 bg-green-50">₩0</td>
                                        }
                                        {totalProductExpense[date] ? 
                                                <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(totalProductExpense[date]["totalProductExpense"])}</td>
                                            :
                                                <td className="border-2 bg-green-50">₩0</td>
                                        }
                                        {totalProductOperatingProfit[date] ? 
                                                <td className="border-4 border-black bg-indigo-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(totalProductOperatingProfit[date]["totalProductOperatingProfit"])}</td>
                                            :
                                                <td className="border-4 border-black bg-indigo-50">₩0</td>
                                        }
                                        {totalProductOperatingProfitRate[date] ? 
                                                <td className="border-2 bg-yellow-50">{totalProductOperatingProfitRate[date]["totalProductOperatingProfitRate"]}%</td>
                                            :
                                                <td className="border-2 bg-yellow-50">0.00%</td>
                                        }
                                        {totalProductCostRate[date] ? 
                                                <td className="border-2 bg-yellow-50">{totalProductCostRate[date]["totalProductCostRate"]}%</td>
                                            :
                                                <td className="border-2 bg-yellow-50">0.00%</td>
                                        }
                                        {totalAdvertisementRate[date] ? 
                                                <td className="border-2 bg-yellow-50">{totalAdvertisementRate[date]["totalAdvertisementRate"]}%</td>
                                            :
                                                <td className="border-2 bg-yellow-50">0.00%</td>
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
                                    <span>이벤트</span>
                                    <div className="w-3 h-3 bg-red-400 rounded-full ml-1"></div>
                                </div>
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
                            <button onClick={handleToggleBtn} className="sticky left-0 z-50 bg-white text-gray-300">show</button>
                            <table className="whitespace-nowrap text-center hidden">
                                <thead>
                                    <tr>
                                        <th className="border-2 border-slate-400 px-24 py-2 sticky left-0 z-50 bg-white">날짜</th>
                                        <th className="border-2 border-slate-400 px-8 bg-red-400">이벤트</th>
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
                                        <th className="border-2 border-slate-400 px-8 bg-blue-300">광고 세트</th>
                                        <th className="border-2 border-slate-400 px-8 bg-rose-300">상품 매출</th>
                                        <th className="border-2 border-slate-400 px-8 bg-rose-300">택배 매출</th>
                                        <th className="border-2 border-slate-400 px-8 bg-fuchsia-300">상품 원가</th>
                                        <th className="border-2 border-slate-400 px-8 bg-indigo-300">상품 이익</th>
                                        <th className="border-2 border-slate-400 px-8 bg-green-300">물류(3pl)</th>
                                        <th className="border-2 border-slate-400 px-8 bg-green-300">판매 수수료</th>
                                        <th className="border-2 border-slate-400 px-8 bg-green-300">광고 비용(facebook 원화)</th>
                                        <th className="border-2 border-slate-400 px-8 bg-green-300">imweb(쿠폰)</th>
                                        <th className="border-2 border-slate-400 px-8 bg-green-300">imweb(적립금)</th>
                                        <th className="border-2 border-slate-400 px-8 bg-green-300">imweb(쇼핑등급 할인)</th>
                                        <th className="border-2 border-slate-400 px-8 bg-green-300">imweb(즉시 할인)</th>
                                        <th className="border-2 border-slate-400 px-8 bg-green-300">imweb(기간 할인)</th>
                                        <th className="border-2 border-slate-400 px-8 bg-green-300">비용</th>
                                        <th className="border-4 border-black px-8 bg-indigo-300">영업 이익</th>
                                        <th className="border-2 border-slate-400 px-8 bg-yellow-300">매출 대비 이익율</th>
                                        <th className="border-2 border-slate-400 px-8 bg-yellow-300">매출 대비 원가율</th>
                                        <th className="border-2 border-slate-400 px-8 bg-yellow-300">매출 대비 광고비율</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listOfDate.map((date, index) =>
                                        <tr key={index}>
                                            <td className="sticky left-0 z-50 bg-white border-2">{date}</td>
                                            {Object.keys(events[product.name]).length !== 0 ? 
                                                    <>
                                                        {events[product.name][date] ?
                                                                <>
                                                                    <td className="border-2 bg-red-50">{events[product.name][date].length}건</td>
                                                                </>
                                                            :
                                                                <td className="border-2 bg-red-50">0건</td>
                                                        }
                                                    </>
                                                :
                                                    <td className="border-2 bg-red-50">0건</td>
                                            }    
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
                                            <td> show
                                                {/* to-do : adset는 dialog로 구현하기 */}
                                                {/* <div>
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th className="border-2 border-slate-400 px-8 bg-blue-300">광고세트 이름</th>
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
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {Object.keys(completeData.facebook_data.adsets).length !== 0 ? 
                                                                    <>
                                                                        {completeData.facebook_data.adsets.map((adset, index) => (
                                                                            <>
                                                                                {adset.campaign_name === product.name && adset.date === date ? 
                                                                                        <tr key={index}>
                                                                                            <td className="border-2 bg-blue-50">{adset["adset_name"]}</td>
                                                                                            <td className="border-2 bg-blue-50">{adset["reach"]}</td>
                                                                                            <td className="border-2 bg-blue-50">{adset["impressions"]}</td>
                                                                                            <td className="border-2 bg-blue-50">{adset["frequency"].toFixed(2)}</td>
                                                                                            <td className="border-2 bg-blue-50">US${adset["spend"].toFixed(2)}</td>
                                                                                            <td className="border-2 bg-blue-50">US${adset["cpm"].toFixed(2)}</td>
                                                                                            <td className="border-2 bg-blue-50">{adset["website_ctr"].toFixed(2)}</td>
                                                                                            <td className="border-2 bg-blue-50">{Math.round(adset["purchase_roas"]*100)}%</td>
                                                                                            <td className="border-2 bg-blue-50">US${adset["cost_per_unique_inline_link_click"].toFixed(2)}</td>
                                                                                            <td className="border-2 bg-blue-50">{adset["purchase"]}</td>
                                                                                            <td className="border-2 bg-blue-50">{adset["landing_page_view"]}</td>
                                                                                            <td className="border-2 bg-blue-50">{adset["link_click"]}</td>
                                                                                            <td className="border-2 bg-blue-50">{adset["add_payment_info"]}</td>
                                                                                            <td className="border-2 bg-blue-50">{adset["add_to_cart"]}</td>
                                                                                        </tr>
                                                                                    :
                                                                                        null
                                                                                }
                                                                            </>
                                                                        ))}
                                                                    </>
                                                                :
                                                                    <tr>
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
                                                                    </tr>
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div> */}
                                            </td>
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
                                            {completeData.imweb_data.by_products_payment[product.name] ? 
                                                    <>
                                                        {completeData.imweb_data.by_products_payment[product.name][date] ? 
                                                                <>
                                                                    <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(completeData.imweb_data.by_products_payment[product.name][date]["coupon"])}</td>
                                                                </>
                                                            :
                                                                <td className="border-2 bg-green-50">₩0</td>
                                                        }
                                                    </>
                                                :
                                                <td className="border-2 bg-green-50">₩0</td>
                                            }
                                            {completeData.imweb_data.by_products_payment[product.name] ? 
                                                    <>
                                                        {completeData.imweb_data.by_products_payment[product.name][date] ? 
                                                                <>
                                                                    <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(completeData.imweb_data.by_products_payment[product.name][date]["point"])}</td>
                                                                </>
                                                            :
                                                                <td className="border-2 bg-green-50">₩0</td>
                                                        }
                                                    </>
                                                :
                                                <td className="border-2 bg-green-50">₩0</td>
                                            }
                                            {completeData.imweb_data.by_products_payment[product.name] ? 
                                                    <>
                                                        {completeData.imweb_data.by_products_payment[product.name][date] ? 
                                                                <>
                                                                    <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(completeData.imweb_data.by_products_payment[product.name][date]["membership_discount"])}</td>
                                                                </>
                                                            :
                                                                <td className="border-2 bg-green-50">₩0</td>
                                                        }
                                                    </>
                                                :
                                                <td className="border-2 bg-green-50">₩0</td>
                                            }
                                            {completeData.imweb_data.by_products_payment[product.name] ? 
                                                    <>
                                                        {completeData.imweb_data.by_products_payment[product.name][date] ? 
                                                                <>
                                                                    <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(completeData.imweb_data.by_products_payment[product.name][date]["price_sale"])}</td>
                                                                </>
                                                            :
                                                                <td className="border-2 bg-green-50">₩0</td>
                                                        }
                                                    </>
                                                :
                                                <td className="border-2 bg-green-50">₩0</td>
                                            }
                                            {completeData.imweb_data.by_products_payment[product.name] ? 
                                                    <>
                                                        {completeData.imweb_data.by_products_payment[product.name][date] ? 
                                                                <>
                                                                    <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(completeData.imweb_data.by_products_payment[product.name][date]["period_discount"])}</td>
                                                                </>
                                                            :
                                                                <td className="border-2 bg-green-50">₩0</td>
                                                        }
                                                    </>
                                                :
                                                <td className="border-2 bg-green-50">₩0</td>
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
                                            {productOperatingProfit[product.name] ? 
                                                    <>
                                                        {productOperatingProfit[product.name][date] ? 
                                                                <>
                                                                    <td className="border-4 border-black bg-indigo-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(productOperatingProfit[product.name][date]["productOperatingProfit"])}</td>
                                                                </>
                                                            :
                                                                <td className="border-4 border-black bg-indigo-50">₩0</td>
                                                        }
                                                    </>
                                                :
                                                <td className="border-4 border-black bg-indigo-50">₩0</td>
                                            }
                                            {productOperatingProfitRate[product.name] ? 
                                                    <>
                                                        {productOperatingProfitRate[product.name][date] ? 
                                                                <>
                                                                    <td className="border-2 bg-yellow-50">{productOperatingProfitRate[product.name][date]["productOperatingProfitRate"]}%</td>
                                                                </>
                                                            :
                                                                <td className="border-2 bg-yellow-50">0.00%</td>
                                                        }
                                                    </>
                                                :
                                                <td className="border-2 bg-yellow-50">0.00%</td>
                                            }
                                            {productCostRate[product.name] ? 
                                                    <>
                                                        {productCostRate[product.name][date] ? 
                                                                <>
                                                                    <td className="border-2 bg-yellow-50">{productCostRate[product.name][date]["productCostRate"]}%</td>
                                                                </>
                                                            :
                                                                <td className="border-2 bg-yellow-50">0.00%</td>
                                                        }
                                                    </>
                                                :
                                                <td className="border-2 bg-yellow-50">0.00%</td>
                                            }
                                            {advertisementRate[product.name] ? 
                                                    <>
                                                        {advertisementRate[product.name][date] ? 
                                                                <>
                                                                    <td className="border-2 bg-yellow-50">{advertisementRate[product.name][date]["advertisementRate"]}%</td>
                                                                </>
                                                            :
                                                                <td className="border-2 bg-yellow-50">0.00%</td>
                                                        }
                                                    </>
                                                :
                                                <td className="border-2 bg-yellow-50">0.00%</td>
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