import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query'
import { getProductMonthRetrieve, getBrand } from "../api";
import Loading from "../components/Loading";
import ErrorPage from "../components/ErrorPage";

function MonthlyTable() {
    let { brandPk } = useParams();
    const { register, handleSubmit } = useForm();
    const [noData, setNodata] = useState(true);
    const [maxMonth, setMaxMonth] = useState();
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [listOfMonth, setListOfMonth] = useState([]);
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
    useEffect(() => {
        maxMonthValue();
    }, []);
    useEffect(() => {
        if(selectedMonth !== null) {
            monthList();
        }
    }, [selectedMonth]);
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
                            {productMonthDataLoading ? 
                                <Loading />
                                :
                                <>
                                    {productMonthDataError ? 
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
                                                        <th className="border-2 border-slate-400 px-8 bg-red-400">판매량 계</th>
                                                        {brandData.product_set.map((product) =>
                                                            <th key={product.pk} className="border-2 border-slate-400 px-16 bg-gray-300">{product.name} 증정량</th>
                                                        )}
                                                        <th className="border-2 border-slate-400 px-8 bg-red-400">증정량 계</th>
                                                        {brandData.product_set.map((product) =>
                                                            <th key={product.pk} className="border-2 border-slate-400 px-16 bg-gray-300">{product.name} 총수량</th>
                                                        )}
                                                        <th className="border-2 border-slate-400 px-8 bg-red-400">총수량 계</th>
                                                        {brandData.product_set.map((product) =>
                                                            <th key={product.pk} className="border-2 border-slate-400 px-16 bg-gray-300">{product.name} 매출액</th>
                                                        )}
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