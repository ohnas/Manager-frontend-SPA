import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useOutletContext, useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query'
import { getBrand, getProductMonthRetrieve, getPageMonthRetrieve, getVisitMonthRetrieve, getBrandMonthRetrieve  } from "../api";
import Loading from "../components/Loading";
import ErrorPage from "../components/ErrorPage";

function MonthlyTable() {
    const { setBrandName } = useOutletContext();
    let { brandPk } = useParams();
    const { register, handleSubmit } = useForm();
    const [noData, setNodata] = useState(true);
    const [maxMonth, setMaxMonth] = useState();
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [listOfMonth, setListOfMonth] = useState([]);
    const [totalImwebConversionRate, setTotalImwebConversionRate] = useState({});
    const { isLoading: brandDataLoading, data: brandData } = useQuery(['Brand', brandPk], () => getBrand(brandPk),
        {
            refetchOnWindowFocus: false,
        }
    );
    const { isLoading: productMonthDataLoading, data: productMonthData, isError: productMonthDataError } = useQuery(['ProductMonthRetrieve', brandPk, selectedMonth], () => getProductMonthRetrieve(brandPk, selectedMonth),
        {
            enabled: !!selectedMonth,
            refetchOnWindowFocus: false,
        }
    );
    const { isLoading: pageMonthDataLoading, data: pageMonthData, isError: pageMonthDataError } = useQuery(['PageMonthRetrieve', brandPk, selectedMonth], () => getPageMonthRetrieve(brandPk, selectedMonth),
        {
            enabled: !!selectedMonth,
            refetchOnWindowFocus: false,
        }
    );
    const { isLoading: visitMonthDataLoading, data: visitMonthData, isError: visitMonthDataError } = useQuery(['VisitMonthRetrieve', brandPk, selectedMonth], () => getVisitMonthRetrieve(brandPk, selectedMonth),
        {
            enabled: !!selectedMonth,
            refetchOnWindowFocus: false,
        }
    );
    const { isLoading: brandMonthDataLoading, data: brandMonthData, isError: brandMonthDataError } = useQuery(['BrandMonthRetrieve', brandPk, selectedMonth], () => getBrandMonthRetrieve(brandPk, selectedMonth),
        {
            enabled: !!selectedMonth,
            refetchOnWindowFocus: false,
        }
    );
    function onSubmit(retrieveData) {
        if(retrieveData.monthFrom > retrieveData.monthTo) {
            alert("시작 월이 종료 월보다 클 수 없습니다");
            return;
        } else {
            setNodata(false);
            setSelectedMonth({
                "monthFrom" : retrieveData.monthFrom,
                "monthTo" : retrieveData.monthTo,
            });
        }
    }
    function monthList() {
        let result = [];
        let monthFrom = selectedMonth.monthFrom.split('-');
        let monthTo = selectedMonth.monthTo.split('-');
        let monthFromYear = monthFrom[0]
        let monthFromMonth = Number(monthFrom[1])
        let monthToMonth = Number(monthTo[1])
        while(monthFromMonth <= monthToMonth) {
            result.push(`${monthFromYear}-${monthFromMonth}`);
            monthFromMonth += 1;
        }
        setListOfMonth(result);
    }
    const maxMonthValue = (() => {
        const day = new Date();
        const today = new Date(day.setDate(day.getDate()));
        let month = today.getMonth() + 1;
        if(month < 10) {
            month = `0${month}`
        }
        const todayValue = `${today.getFullYear()}-${month}`;
        setMaxMonth(todayValue);
    });
    function handleTotalConversionRate() {
        let totalImwebConversionRateObj = {};
        listOfMonth.forEach((month) => {
            if (visitMonthData[month] === 0) {
                totalImwebConversionRateObj[month] = 0;
            } else {
                let rate = ((brandMonthData[month]["brand_month_data"]["sum_imweb_count"] / visitMonthData[month]) * 100);
                if(isNaN(rate) === true) {
                    rate = 0;
                }
                totalImwebConversionRateObj[month] = rate;
            }
        });
        setTotalImwebConversionRate(totalImwebConversionRateObj);
    }
    useEffect(() => {
        if(brandDataLoading === false) {
            setBrandName(brandData.name);
        }
    }, [brandDataLoading, brandPk]);
    useEffect(() => {
        maxMonthValue();
    }, []);
    useEffect(() => {
        if(selectedMonth !== null) {
            monthList();
        }
    }, [selectedMonth]);
    useEffect(() => {
        if(visitMonthDataLoading === false && brandMonthDataLoading === false) {
            handleTotalConversionRate();
        }
    }, [visitMonthData, brandMonthData]);
    return (
        <>
            { brandDataLoading ? 
                <span>Loading...</span> 
                :
                <>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-center mt-5" >
                        <label htmlFor="monthFrom">FROM</label>
                        <input {...register("monthFrom", {required:true})} min={"2023-01"} max={maxMonth} name="monthFrom" id="monthFrom" type={"month"} className="border-2 rounded-md w-48 border-gray-200 text-center ml-10 mr-10" />
                        <label htmlFor="monthTo">TO</label>
                        <input {...register("monthTo", {required:true})} min={"2023-01"} max={maxMonth} name="monthTo" id="monthTo" type={"month"} className="border-2 rounded-md w-48 border-gray-200 text-center ml-10 mr-10" />
                        <button className="border-solid border-2 border-emerald-300 rounded-md w-28 h-12 text-black">조회</button> 
                    </form>
                    {noData ? 
                        <div className="flex justify-center items-center h-screen">
                            <div className="flex justify-center items-center">
                                <span className="text-gray-400">No data.</span>
                            </div>
                        </div>
                        :
                        <>
                            {productMonthDataLoading || pageMonthDataLoading || visitMonthDataLoading || brandMonthDataLoading ? 
                                <Loading />
                                :
                                <>
                                    {productMonthDataError || pageMonthDataError || visitMonthDataError || brandMonthDataError ? 
                                        <ErrorPage />
                                        :
                                        <div className="overflow-x-scroll w-full mt-5 mb-5 hover:border-2 border-blue-100">
                                            <div className="sticky left-0 z-50 bg-white flex">
                                                <div className="flex items-center ml-5 text-xs text-gray-500">
                                                    <span>상품</span>
                                                    <div className="w-3 h-3 bg-gray-300 rounded-full ml-1"></div>
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
                                                        {brandData.product_set.map((product) =>
                                                            <th key={product.pk} className="border-2 border-slate-400 px-16 bg-gray-300">{product.name} 판매량</th>
                                                        )}
                                                        <th className="border-2 border-slate-400 px-8 bg-gray-300">판매량 계</th>
                                                        {brandData.product_set.map((product) =>
                                                            <th key={product.pk} className="border-2 border-slate-400 px-16 bg-gray-300">{product.name} 증정량</th>
                                                        )}
                                                        <th className="border-2 border-slate-400 px-8 bg-gray-300">증정량 계</th>
                                                        {brandData.product_set.map((product) =>
                                                            <th key={product.pk} className="border-2 border-slate-400 px-16 bg-gray-300">{product.name} 총수량</th>
                                                        )}
                                                        <th className="border-2 border-slate-400 px-8 bg-gray-300">총수량 계</th>
                                                        {brandData.product_set.map((product) =>
                                                            <th key={product.pk} className="border-2 border-slate-400 px-16 bg-gray-300">{product.name} 매출액</th>
                                                        )}
                                                        <th className="border-2 border-slate-400 px-8 bg-blue-400">페이지뷰</th>
                                                        <th className="border-2 border-slate-400 px-8 bg-blue-400">방문자</th>
                                                        <th className="border-2 border-slate-400 px-8 bg-blue-400">전환율</th>
                                                        <th className="border-2 border-slate-400 px-8 bg-blue-400">아임웹 주문</th>
                                                        <th className="border-2 border-slate-400 px-8 bg-blue-400">네이버페이 주문</th>
                                                        <th className="border-2 border-slate-400 px-8 bg-blue-400">총 주문</th>
                                                        <th className="border-2 border-slate-400 px-8 bg-rose-400">총 매출</th>
                                                        <th className="border-2 border-slate-400 px-8 bg-fuchsia-400">총 원가</th>
                                                        <th className="border-2 border-slate-400 px-8 bg-indigo-400">총 상품이익</th>
                                                        <th className="border-2 border-slate-400 px-8 bg-green-400">총 광고비</th>
                                                        <th className="border-2 border-slate-400 px-8 bg-green-400">총 비용</th>
                                                        <th className="border-2 border-slate-400 px-8 bg-indigo-400">총 영업이익</th>
                                                        <th className="border-2 border-slate-400 px-8 bg-yellow-400">광고비율</th>
                                                        <th className="border-2 border-slate-400 px-8 bg-yellow-400">원가비율</th>
                                                        <th className="border-2 border-slate-400 px-8 bg-yellow-400">이익비율</th>
                                                        <th className="border-2 border-slate-400 px-8 bg-yellow-400">ROAS</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {listOfMonth.map((month, index) => 
                                                        <tr key={index}>
                                                            <td className="sticky left-0 z-50 bg-white border-2">{month}월</td>
                                                            {brandData.product_set.map((product) => 
                                                                <td key={product.pk} className="border-2 bg-gray-50">{productMonthData[product.name][month]["sum_product_quantity"]}</td>
                                                            )}
                                                            <td className="border-2 bg-gray-50">{productMonthData["sum"][month]["total_product_quantity"]}</td>
                                                            {brandData.product_set.map((product) => 
                                                                <td key={product.pk} className="border-2 bg-gray-50">{productMonthData[product.name][month]["sum_product_gift_quantity"]}</td>
                                                            )}
                                                            <td className="border-2 bg-gray-50">{productMonthData["sum"][month]["total_product_gift_quantity"]}</td>
                                                            {brandData.product_set.map((product) => 
                                                                <td key={product.pk} className="border-2 bg-gray-50">{productMonthData[product.name][month]["sum_shipment_quantity"]}</td>
                                                            )}
                                                            <td className="border-2 bg-gray-50">{productMonthData["sum"][month]["total_shipment_quantity"]}</td>
                                                            {brandData.product_set.map((product) => 
                                                                <td key={product.pk} className="border-2 bg-gray-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(productMonthData[product.name][month]["sum_price"])}</td>
                                                            )}
                                                            <td className="border-2 bg-blue-50">{pageMonthData[month]}</td>
                                                            <td className="border-2 bg-blue-50">{visitMonthData[month]}</td>
                                                            <td className="border-2 bg-blue-50">{totalImwebConversionRate[month].toFixed(2)}%</td>
                                                            <td className="border-2 bg-blue-50">{brandMonthData[month]["brand_month_data"]["sum_imweb_nomal_order_counter"]}</td>
                                                            <td className="border-2 bg-blue-50">{brandMonthData[month]["brand_month_data"]["sum_imweb_npay_order_counter"]}</td>
                                                            <td className="border-2 bg-blue-50">{brandMonthData[month]["brand_month_data"]["sum_imweb_count"]}</td>
                                                            <td className="border-2 bg-rose-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(brandMonthData[month]["brand_month_data"]["sum_price"])}</td>
                                                            <td className="border-2 bg-fuchsia-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(brandMonthData[month]["brand_month_data"]["sum_product_cost"])}</td>
                                                            <td className="border-2 bg-indigo-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(brandMonthData[month]["brand_month_data"]["sum_product_profit"])}</td>
                                                            <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(brandMonthData[month]["brand_month_data"]["sum_facebook_ad_expense_krw"])}</td>
                                                            <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(brandMonthData[month]["brand_month_data"]["total_expense"])}</td>
                                                            <td className="border-2 bg-indigo-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(brandMonthData[month]["brand_month_data"]["sum_operating_profit"])}</td>
                                                            <td className="border-2 bg-yellow-50">{brandMonthData[month]["brand_month_data"]["total_facebook_ad_expense_krw_rate"].toFixed(2)}%</td>
                                                            <td className="border-2 bg-yellow-50">{brandMonthData[month]["brand_month_data"]["total_product_cost_rate"].toFixed(2)}%</td>
                                                            <td className="border-2 bg-yellow-50">{brandMonthData[month]["brand_month_data"]["total_operating_profit_rate"].toFixed(2)}%</td>
                                                            <td className="border-2 bg-yellow-50">{brandMonthData[month]["brand_month_data"]["total_roas"].toFixed(2)}%</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    }
                                </>
                            }
                        </>
                    }
                </>
            }
        </>
    );
}

export default MonthlyTable;