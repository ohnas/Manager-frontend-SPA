import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getEventsCount, getPageView, getVisit, postPageView, putPageView, postVisit, putVisit } from "../api";

function Table2({ brandData, completeData, listOfDate, brandPk}) {
    const [pageViewPk, setPageViewPk] = useState()
    const [visitNumPk, setVisitNumPk] = useState()
    const [totalAverageLoading, setTotalAverageLoading] = useState(true);
    const [totalAverage, setTotalAverage] = useState({});
    const [totalImwebConversionRateLoading, setTotalImwebConversionRateLoading] = useState(true);
    const [totalImwebConversionRate, setTotalImwebConversionRate] = useState({});
    const queryClient = useQueryClient();
    const { isLoading: eventsCountDataLoading, data: eventsCountData } = useQuery(['EventsCount', brandPk, listOfDate], () => getEventsCount(brandPk, listOfDate),
        {
            refetchOnWindowFocus: false,
        }
    );
    const { isLoading: pageViewDataLoading, data: pageViewData } = useQuery(['PageView', brandPk, listOfDate], () => getPageView(brandPk, listOfDate),
        {
            refetchOnWindowFocus: false,
        }
    );
    const { isLoading: visitDataLoading, data: visitData } = useQuery(['Visit', brandPk, listOfDate], () => getVisit(brandPk, listOfDate),
        {
            refetchOnWindowFocus: false,
        }
    );
    const postPageViewMutation = useMutation((pageViewData) => postPageView(brandPk, pageViewData), 
        {
            onSuccess: () => {
                queryClient.refetchQueries(['PageView', brandPk, listOfDate]);
            }
        }
    );
    const putPageViewMutation = useMutation((pageViewData) => putPageView(pageViewPk, pageViewData),
        {
            onSuccess: () => {
                queryClient.refetchQueries(['PageView', brandPk, listOfDate]);
            }
        }
    );
    const postVisitMutation = useMutation((visitNumData) => postVisit(brandPk, visitNumData),
        {
            onSuccess: () => {
                queryClient.refetchQueries(['Visit', brandPk, listOfDate]);
            }
        }
    );
    const putVisitMutation = useMutation((visitNumData) => putVisit(visitNumPk, visitNumData),
        {
            onSuccess: () => {
                queryClient.refetchQueries(['Visit', brandPk, listOfDate]);
            }
        }
    );
    function handlePageView(event) {        
        if(event.key === 'Enter'){
            event.preventDefault();
            const regex = /^[0-9]*$/;
            let selectedPk = event.target.id;
            let selectedDate = event.target.parentElement.firstElementChild.innerText;
            let selectedPageView = event.target.innerText.trim();
            if(selectedPageView === '0') {
                alert("0은 입력할 수 없습니다.");
                return;
            } else if(selectedPageView === '') {
                alert("공백은 잘못된 입력 입니다.");
                return;
            } else if(!regex.test(selectedPageView)) {
                alert("숫자만 입력 가능합니다. 문자는 입력 할 수 없습니다");
                return;
            }
            let pageViewData = {
                "view" : selectedPageView,
                "page_date" : selectedDate,
            };
            if(selectedPk === 'None') {
                postPageViewMutation.mutate(pageViewData);
            } else {
                setPageViewPk(selectedPk);
                putPageViewMutation.mutate(pageViewData);
            }
        } else {
            return;
        }
    }
    function handleVisit(event) {        
        if(event.key === 'Enter'){
            event.preventDefault();
            const regex = /^[0-9]*$/;
            let selectedPk = event.target.id;
            let selectedDate = event.target.parentElement.firstElementChild.innerText;
            let selectedVisitNum = event.target.innerText.trim();
            if(selectedVisitNum === '0') {
                alert("0은 입력할 수 없습니다.");
                return;
            } else if(selectedVisitNum === '') {
                alert("공백은 잘못된 입력 입니다.");
                return;
            } else if(!regex.test(selectedVisitNum)) {
                alert("숫자만 입력 가능합니다. 문자는 입력 할 수 없습니다");
                return;
            }
            let visitNumData = {
                "num" : selectedVisitNum,
                "visit_date" : selectedDate,
            };
            if(selectedPk === 'None') {
                postVisitMutation.mutate(visitNumData);
            } else {
                setVisitNumPk(selectedPk);
                putVisitMutation.mutate(visitNumData);
            }
        } else {
            return;
        }
    }
    function handleTotalAverage() {
        let totalAverageObj = {};
        listOfDate.forEach((date) => {
            let average = (pageViewData[date]["view"] / visitData[date]["num"]);
            if(isNaN(average) === true) {
                average = 0;
            }
            totalAverageObj[date] = average
        });
        setTotalAverage(totalAverageObj);
        setTotalAverageLoading(false);
    }
    function handleTotalImwebConversionRate() {
        let totalImwebConversionRateObj = {};
        listOfDate.forEach((date) => {
            let rate = ((completeData["total"][date]["imweb_count"] / visitData[date]) * 100);
            if(isNaN(rate) === true) {
                rate = 0;
            }
            totalImwebConversionRateObj[date] = rate;
        });
        setTotalImwebConversionRate(totalImwebConversionRateObj);
        setTotalImwebConversionRateLoading(false);
    }
    function handleToggleBtn(event) {
        let curretBtn = event.target.nextElementSibling;
        curretBtn.classList.toggle("hidden");
        let curretText = event.target.innerText;
        if(curretText === "▶︎") {
            event.target.innerText = "▼";
        } else {
            event.target.innerText = "▶︎";
        }
    }
    useEffect(() => {
        if(pageViewDataLoading === false && visitDataLoading === false) {
            handleTotalAverage();
        }
    }, [pageViewData, visitData]);
    useEffect(() => {
        if(visitDataLoading === false) {
            handleTotalImwebConversionRate();
        }
    }, [visitData]);
    return (
        <>
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
                            <th className="border-2 border-slate-400 px-8 bg-gray-300">페이지 뷰</th>
                            <th className="border-2 border-slate-400 px-8 bg-gray-300">방문자</th>
                            <th className="border-2 border-slate-400 px-8 bg-gray-300">방문평균페이지</th>
                            <th className="border-2 border-slate-400 px-8 bg-gray-300">전환율</th>
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
                                {eventsCountDataLoading ?
                                    <td className="border-2 bg-red-50">0</td>
                                    :
                                    <td className="border-2 bg-red-50">{eventsCountData[date]}</td>
                                }
                                {pageViewDataLoading ?
                                    <td className="border-2 bg-gray-50">0</td>
                                    :
                                    <td className="border-2 bg-gray-50" onKeyDown={handlePageView} id={pageViewData[date]["pk"]} contentEditable={true} suppressContentEditableWarning={true}>{pageViewData[date]["view"]}</td>
                                }
                                {visitDataLoading ?
                                    <td className="border-2 bg-gray-50">0</td>
                                    :
                                    <td className="border-2 bg-gray-50" onKeyDown={handleVisit} id={visitData[date]["pk"]} contentEditable={true} suppressContentEditableWarning={true}>{visitData[date]["num"]}</td>
                                }
                                {totalAverageLoading ? 
                                    <td className="border-2 bg-gray-50">0</td>
                                    :
                                    <td className="border-2 bg-gray-50">{totalAverage[date].toFixed(2)}</td>
                                }
                                {totalImwebConversionRateLoading ? 
                                    <td className="border-2 bg-gray-50">0</td>
                                    :
                                    <td className="border-2 bg-gray-50">{totalImwebConversionRate[date].toFixed(2)}%</td>
                                }
                                <td className="border-2 bg-gray-50">{completeData["total"][date]["imweb_count"]}</td>
                                <td className="border-2 bg-blue-50">{completeData["total"][date]["reach"]}</td>
                                <td className="border-2 bg-blue-50">{completeData["total"][date]["impressions"]}</td>
                                <td className="border-2 bg-blue-50">{completeData["total"][date]["frequency"].toFixed(2)}</td>
                                <td className="border-2 bg-blue-50">US${completeData["total"][date]["spend"].toFixed(2)}</td>
                                <td className="border-2 bg-blue-50">US${completeData["total"][date]["cpm"].toFixed(2)}</td>
                                <td className="border-2 bg-blue-50">{completeData["total"][date]["website_ctr"].toFixed(2)}</td>
                                <td className="border-2 bg-blue-50">{Math.round(completeData["total"][date]["purchase_roas"]*100)}%</td>
                                <td className="border-2 bg-blue-50">US${completeData["total"][date]["cost_per_unique_inline_link_click"].toFixed(2)}</td>
                                <td className="border-2 bg-blue-50">{completeData["total"][date]["purchase"]}</td>
                                <td className="border-2 bg-blue-50">{completeData["total"][date]["landing_page_view"]}</td>
                                <td className="border-2 bg-blue-50">{completeData["total"][date]["link_click"]}</td>
                                <td className="border-2 bg-blue-50">{completeData["total"][date]["add_payment_info"]}</td>
                                <td className="border-2 bg-blue-50">{completeData["total"][date]["add_to_cart"]}</td>
                                <td className="border-2 bg-blue-50">{completeData["total"][date]["conversion_rate"].toFixed(2)}%</td>
                                <td className="border-2 bg-rose-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(completeData["total"][date]["imweb_price"])}</td>
                                <td className="border-2 bg-rose-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData["total"][date]["imweb_deliv_price"])}</td>
                                <td className="border-2 bg-fuchsia-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData["total"][date]["product_cost"])}</td>
                                <td className="border-2 bg-indigo-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData["total"][date]["product_profit"])}</td>
                                <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData["total"][date]["logistic_fee"])}</td>
                                <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData["total"][date]["sale_expense"])}</td>
                                <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData["total"][date]["facebook_ad_expense_krw"])}</td>
                                <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData["total"][date]["imweb_coupon"])}</td>
                                <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData["total"][date]["imweb_point"])}</td>
                                <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData["total"][date]["imweb_membership_discount"])}</td>
                                <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData["total"][date]["imweb_price_sale"])}</td>
                                <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData["total"][date]["imweb_period_discount"])}</td>
                                <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData["total"][date]["expense"])}</td>
                                <td className="border-2 bg-indigo-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData["total"][date]["operating_profit"])}</td>
                                <td className="border-2 bg-yellow-50">{completeData["total"][date]["operating_profit_rate"].toFixed(2)}%</td>
                                <td className="border-2 bg-yellow-50">{completeData["total"][date]["product_cost_rate"].toFixed(2)}%</td>
                                <td className="border-2 bg-yellow-50">{completeData["total"][date]["facebook_ad_expense_krw_rate"].toFixed(2)}%</td>
                            </tr>
                        )}
                        <tr>
                            <td className="sticky left-0 z-50 bg-white border-2">합계</td>
                            {eventsCountDataLoading ?
                                <td className="border-2 bg-red-50">0</td>
                                :
                                <td className="border-2 bg-red-50">{eventsCountData["sum"]}</td>
                            }
                            {pageViewDataLoading ?
                                <td className="border-2 bg-gray-50">0</td>
                                :
                                <>
                                    {pageViewData["sum"] === null ? 
                                        <td className="border-2 bg-gray-50">0</td>
                                        :
                                        <td className="border-2 bg-gray-50">{pageViewData["sum"]}</td>
                                    }
                                </>
                            }
                            {visitDataLoading ?
                                <td className="border-2 bg-gray-50">0</td>
                                :
                                <>
                                    {visitData["sum"] === null ? 
                                        <td className="border-2 bg-gray-50">0</td>
                                        :
                                        <td className="border-2 bg-gray-50">{visitData["sum"]}</td>
                                    }
                                </>
                            }
                            <td className="border-2 bg-gray-50">-</td>
                            <td className="border-2 bg-gray-50">-</td>
                            <td className="border-2 bg-gray-50">{completeData["sum"]["imweb_count"]}</td>
                            <td className="border-2 bg-blue-50">{completeData["sum"]["reach"]}</td>
                            <td className="border-2 bg-blue-50">{completeData["sum"]["impressions"]}</td>
                            <td className="border-2 bg-blue-50">{completeData["sum"]["frequency"].toFixed(2)}</td>
                            <td className="border-2 bg-blue-50">US${completeData["sum"]["spend"].toFixed(2)}</td>
                            <td className="border-2 bg-blue-50">US${completeData["sum"]["cpm"].toFixed(2)}</td>
                            <td className="border-2 bg-blue-50">-</td>
                            <td className="border-2 bg-blue-50">-</td>
                            <td className="border-2 bg-blue-50">US${completeData["sum"]["cost_per_unique_inline_link_click"].toFixed(2)}</td>
                            <td className="border-2 bg-blue-50">{completeData["sum"]["purchase"]}</td>
                            <td className="border-2 bg-blue-50">{completeData["sum"]["landing_page_view"]}</td>
                            <td className="border-2 bg-blue-50">{completeData["sum"]["link_click"]}</td>
                            <td className="border-2 bg-blue-50">{completeData["sum"]["add_payment_info"]}</td>
                            <td className="border-2 bg-blue-50">{completeData["sum"]["add_to_cart"]}</td>
                            <td className="border-2 bg-blue-50">-</td>
                            <td className="border-2 bg-rose-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(completeData["sum"]["imweb_price"])}</td>
                            <td className="border-2 bg-rose-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData["sum"]["imweb_deliv_price"])}</td>
                            <td className="border-2 bg-fuchsia-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData["sum"]["product_cost"])}</td>
                            <td className="border-2 bg-indigo-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData["sum"]["product_profit"])}</td>
                            <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData["sum"]["logistic_fee"])}</td>
                            <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData["sum"]["sale_expense"])}</td>
                            <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData["sum"]["facebook_ad_expense_krw"])}</td>
                            <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData["sum"]["imweb_coupon"])}</td>
                            <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData["sum"]["imweb_point"])}</td>
                            <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData["sum"]["imweb_membership_discount"])}</td>
                            <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData["sum"]["imweb_price_sale"])}</td>
                            <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData["sum"]["imweb_period_discount"])}</td>
                            <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData["sum"]["expense"])}</td>
                            <td className="border-2 bg-indigo-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData["sum"]["operating_profit"])}</td>
                            <td className="border-2 bg-yellow-50">-</td>
                            <td className="border-2 bg-yellow-50">-</td>
                            <td className="border-2 bg-yellow-50">-</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {brandData.product_set.map((product) => 
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
                    <button onClick={handleToggleBtn} className="sticky left-0 z-50 bg-white">▶︎</button>
                    <table className="whitespace-nowrap text-center hidden">
                        <thead>
                            <tr>
                                <th className="border-2 border-slate-400 px-24 py-2 sticky left-0 z-50 bg-white">날짜</th>
                                {/* <th className="border-2 border-slate-400 px-8 bg-red-400">이벤트</th> */}
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
                                    {/* <td className="border-2 bg-red-50">
                                    {Object.keys(events[product.name]).length !== 0 ? 
                                            <>
                                                {events[product.name][date] ?
                                                        <>
                                                            <button onClick={handleOpenEvent}>{events[product.name][date].length}건</button>
                                                            <dialog className="rounded-md w-1/2 h-1/2">
                                                                <div className="flex flex-col justify-center items-center w-full h-full">
                                                                    {events[product.name][date].map((e) =>
                                                                        <div key={e.pk} id={e.pk} className="flex flex-col justify-center items-center border-2 mb-5 rounded-md shadow-md p-5">
                                                                            <span className="mt-3">날짜 : {e.event_date}</span>
                                                                            <span className="mt-3">내용 : {e.name}</span>
                                                                            <button onClick={handleDeleteEvent} className="text-xs mt-3">DELETE</button>
                                                                        </div>
                                                                    )}
                                                                    <form method="dialog">
                                                                        <button className="text-gray-400">close</button>
                                                                    </form>
                                                                </div>
                                                            </dialog>
                                                        </>
                                                    :
                                                        <span>0건</span>
                                                }
                                            </>
                                        :
                                            <span>0건</span>
                                    }
                                    </td> */}
                                    <td className="border-2 bg-gray-50">{completeData[product.name]["date"][date]["imweb_count"]}</td>
                                    {product.options_set.map((option) => 
                                        <td key={option.pk} className="border-2 bg-gray-50">{completeData[product.name]["options"][option.name][date]["option_count"]}</td>
                                    )}
                                    {product.options_set.map((option) => 
                                        <td key={option.pk} className="border-2 bg-gray-50">{completeData[product.name]["options"][option.name][date]["option_rate"].toFixed(2)}%</td>
                                    )}
                                    <td className="border-2 bg-gray-50">{completeData[product.name]["date"][date]["shipment_quantity"]}</td>
                                    <td className="border-2 bg-blue-50">{completeData[product.name]["date"][date]["reach"]}</td>
                                    <td className="border-2 bg-blue-50">{completeData[product.name]["date"][date]["impressions"]}</td>
                                    <td className="border-2 bg-blue-50">{completeData[product.name]["date"][date]["frequency"].toFixed(2)}</td>
                                    <td className="border-2 bg-blue-50">US${completeData[product.name]["date"][date]["spend"].toFixed(2)}</td>
                                    <td className="border-2 bg-blue-50">US${completeData[product.name]["date"][date]["cpm"].toFixed(2)}</td>
                                    <td className="border-2 bg-blue-50">{completeData[product.name]["date"][date]["website_ctr"].toFixed(2)}</td>
                                    <td className="border-2 bg-blue-50">{Math.round(completeData[product.name]["date"][date]["purchase_roas"]*100)}%</td>
                                    <td className="border-2 bg-blue-50">US${completeData[product.name]["date"][date]["cost_per_unique_inline_link_click"].toFixed(2)}</td>
                                    <td className="border-2 bg-blue-50">{completeData[product.name]["date"][date]["purchase"]}</td>
                                    <td className="border-2 bg-blue-50">{completeData[product.name]["date"][date]["landing_page_view"]}</td>
                                    <td className="border-2 bg-blue-50">{completeData[product.name]["date"][date]["link_click"]}</td>
                                    <td className="border-2 bg-blue-50">{completeData[product.name]["date"][date]["add_payment_info"]}</td>
                                    <td className="border-2 bg-blue-50">{completeData[product.name]["date"][date]["add_to_cart"]}</td>
                                    <td className="border-2 bg-blue-50">{completeData[product.name]["date"][date]["conversion_rate"].toFixed(2)}%</td>
                                    <td> 보류
                                        {/* to-do : 현재 캠페인명 = 상품명이 아니기 때문에 매칭이 되지 않고 있음 형식 정해지면 진행 adset는 dialog로 구현하기 */}
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
                                    <td className="border-2 bg-rose-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(completeData[product.name]["date"][date]["imweb_price"])}</td>
                                    <td className="border-2 bg-rose-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData[product.name]["date"][date]["imweb_deliv_price"])}</td>
                                    <td className="border-2 bg-fuchsia-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData[product.name]["date"][date]["product_cost"])}</td>
                                    <td className="border-2 bg-indigo-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData[product.name]["date"][date]["product_profit"])}</td>
                                    <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData[product.name]["date"][date]["logistic_fee"])}</td>
                                    <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData[product.name]["date"][date]["sale_expense"])}</td>
                                    <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData[product.name]["date"][date]["facebook_ad_expense_krw"])}</td>
                                    <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData[product.name]["date"][date]["imweb_coupon"])}</td>
                                    <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData[product.name]["date"][date]["imweb_point"])}</td>
                                    <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData[product.name]["date"][date]["imweb_membership_discount"])}</td>
                                    <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData[product.name]["date"][date]["imweb_price_sale"])}</td>
                                    <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData[product.name]["date"][date]["imweb_period_discount"])}</td>
                                    <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData[product.name]["date"][date]["expense"])}</td>
                                    <td className="border-2 bg-indigo-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData[product.name]["date"][date]["operating_profit"])}</td>
                                    <td className="border-2 bg-yellow-50">{completeData[product.name]["date"][date]["operating_profit_rate"].toFixed(2)}%</td>
                                    <td className="border-2 bg-yellow-50">{completeData[product.name]["date"][date]["product_cost_rate"].toFixed(2)}%</td>
                                    <td className="border-2 bg-yellow-50">{completeData[product.name]["date"][date]["facebook_ad_expense_krw_rate"].toFixed(2)}%</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}

export default Table2;