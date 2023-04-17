function Table2({ brandData, completeData, listOfDate, brandPk}) {
    return (
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
                        {/* <th className="border-2 border-slate-400 px-8 bg-red-400">이벤트</th>
                        <th className="border-2 border-slate-400 px-8 bg-gray-300">페이지 뷰</th>
                        <th className="border-2 border-slate-400 px-8 bg-gray-300">방문자</th>
                        <th className="border-2 border-slate-400 px-8 bg-gray-300">방문평균페이지</th> */}
                        {/* <th className="border-2 border-slate-400 px-8 bg-gray-300">전환율</th> */}
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
                            {/* {eventCount.hasOwnProperty(date) ? 
                                    <td className="border-2 bg-red-50">{eventCount[date]}건</td>
                                :
                                    <td className="border-2 bg-red-50">0건</td>
                            } */}
                            {/* {pageView.hasOwnProperty(date) ? 
                                    <td className="border-2 bg-gray-50">
                                        <div id={`pageViewPk${pageView[date].pk}`} className="flex justify-center items-center">
                                            <span>{pageView[date].view}</span>
                                            <button onClick={handleDeletePageView} className="text-xs border-2 border-red-300 rounded-md text-gray-400 w-10 ml-2">del</button>
                                        </div>
                                    </td>
                                :
                                    <td className="border-2 bg-gray-50">0</td>
                            }
                            {visit.hasOwnProperty(date) ? 
                                    <td className="border-2 bg-gray-50">
                                        <div id={`visitPk${visit[date].pk}`} className="flex justify-center items-center">
                                            {visit[date].num}
                                            <button onClick={handleDeleteVisit} className="text-xs border-2 border-red-300 rounded-md text-gray-400 w-10 ml-2">del</button>
                                        </div>
                                    </td>
                                :
                                    <td className="border-2 bg-gray-50">0</td>
                            } */}
                            {/* {totalAverage[date] ? 
                                    <td className="border-2 bg-gray-50">{totalAverage[date]["totalAverage"]}</td>
                                :
                                    <td className="border-2 bg-gray-50">0</td>
                            }
                            {totalImwebConversionRate[date] ? 
                                    <td className="border-2 bg-gray-50">{totalImwebConversionRate[date]["totalImwebConversionRate"]}%</td>
                                :
                                    <td className="border-2 bg-gray-50">0%</td>
                            } */}
                            <td className="border-2 bg-gray-50">{completeData[date]["imweb_count"]}</td>
                            <td className="border-2 bg-blue-50">{completeData[date]["reach"]}</td>
                            <td className="border-2 bg-blue-50">{completeData[date]["impressions"]}</td>
                            <td className="border-2 bg-blue-50">{completeData[date]["frequency"].toFixed(2)}</td>
                            <td className="border-2 bg-blue-50">US${completeData[date]["spend"].toFixed(2)}</td>
                            <td className="border-2 bg-blue-50">US${completeData[date]["cpm"].toFixed(2)}</td>
                            <td className="border-2 bg-blue-50">{completeData[date]["website_ctr"].toFixed(2)}</td>
                            <td className="border-2 bg-blue-50">{Math.round(completeData[date]["purchase_roas"]*100)}%</td>
                            <td className="border-2 bg-blue-50">US${completeData[date]["cost_per_unique_inline_link_click"].toFixed(2)}</td>
                            <td className="border-2 bg-blue-50">{completeData[date]["purchase"]}</td>
                            <td className="border-2 bg-blue-50">{completeData[date]["landing_page_view"]}</td>
                            <td className="border-2 bg-blue-50">{completeData[date]["link_click"]}</td>
                            <td className="border-2 bg-blue-50">{completeData[date]["add_payment_info"]}</td>
                            <td className="border-2 bg-blue-50">{completeData[date]["add_to_cart"]}</td>
                            <td className="border-2 bg-blue-50">{completeData[date]["conversion_rate"].toFixed(2)}%</td>
                            <td className="border-2 bg-rose-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(completeData[date]["imweb_price"])}</td>
                            <td className="border-2 bg-rose-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData[date]["imweb_deliv_price"])}</td>
                            <td className="border-2 bg-fuchsia-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData[date]["product_cost"])}</td>
                            <td className="border-2 bg-indigo-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData[date]["product_profit"])}</td>
                            <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData[date]["logistic_fee"])}</td>
                            <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData[date]["sale_expense"])}</td>
                            <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData[date]["facebook_ad_expense_krw"])}</td>
                            <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData[date]["imweb_coupon"])}</td>
                            <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData[date]["imweb_point"])}</td>
                            <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData[date]["imweb_membership_discount"])}</td>
                            <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData[date]["imweb_price_sale"])}</td>
                            <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData[date]["imweb_period_discount"])}</td>
                            <td className="border-2 bg-green-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData[date]["expense"])}</td>
                            <td className="border-2 bg-indigo-50">{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW'}).format(completeData[date]["operating_profit"])}</td>
                            <td className="border-2 bg-yellow-50">{completeData[date]["operating_profit_rate"].toFixed(2)}%</td>
                            <td className="border-2 bg-yellow-50">{completeData[date]["product_cost_rate"].toFixed(2)}%</td>
                            <td className="border-2 bg-yellow-50">{completeData[date]["facebook_ad_expense_krw_rate"].toFixed(2)}%</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Table2;