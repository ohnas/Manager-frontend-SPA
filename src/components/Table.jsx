function Table({brand, salesData, advertisingsData, listOfDate}) {
    return (
        <>            
            { Object.keys(salesData).length !== 0 && Object.keys(advertisingsData).length !== 0 ? 
                    <div>
                        { brand.product_set.map((brandProduct) =>
                                <div key={brandProduct.pk} className="flex mt-5 items-center">
                                    <table className="w-1/3">
                                        <thead>
                                            <tr className="border-2 whitespace-nowrap">
                                                <th>{brandProduct.name}</th>
                                            </tr>
                                            <tr>
                                                <th className="border-2">날짜</th>
                                                <th className="border-2 w-1/2">판매</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { listOfDate.map((date, index) => 
                                                <tr key={index} className="text-center">
                                                    <td className="border-2">{date}</td>
                                                    { salesData.product[date].hasOwnProperty(brandProduct.name) ?
                                                            <td className="border-2">{salesData.product[date][brandProduct.name]}</td>
                                                        :
                                                            <td className="border-2">0</td>
                                                    }
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                    <table className="w-1/3">
                                        <thead>
                                            <tr className="border-2">
                                                <th>옵션판매현황</th>
                                            </tr>
                                            <tr className="whitespace-nowrap">
                                                { brandProduct.options_set.map((brandOption) => 
                                                    <th key={brandOption.pk} className="border-2">{brandOption.name}</th>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { listOfDate.map((date, index) => (
                                                <tr key={index} className="text-center">
                                                    { brandProduct.options_set.map((brandOption) => (
                                                        <td key={brandOption.pk} className="border-2">
                                                            { salesData.option[date].hasOwnProperty(brandOption.name) ?
                                                                    <>
                                                                        {salesData.option[date][brandOption.name]}
                                                                    </>
                                                                :
                                                                    0
                                                            }
                                                        </td>
                                                        )
                                                    )}
                                                </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                    <table className="w-1/3">
                                        <thead>
                                            <tr className="border-2 whitespace-nowrap">
                                                <th>메타광고자료</th>
                                            </tr>
                                            <tr className="whitespace-nowrap">
                                                <th className="border-2">도달수</th>
                                                <th className="border-2">노출</th>
                                                <th className="border-2">빈도</th>
                                                <th className="border-2">비용</th>
                                                <th className="border-2">CPM</th>
                                                <th className="border-2">CTR</th>
                                                <th className="border-2">ROAS</th>
                                                <th className="border-2">CPC</th>
                                                <th className="border-2">구매</th>
                                                <th className="border-2">랜딩페이지뷰</th>
                                                <th className="border-2">링크클릭</th>
                                                <th className="border-2">결제정보추가</th>
                                                <th className="border-2">장바구니</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { listOfDate.map((date, index) =>
                                                <tr key={index} className="text-center">
                                                    { advertisingsData[date].hasOwnProperty(brandProduct.english_name) ? 
                                                        <>
                                                            <td className="border-2">{advertisingsData[date][brandProduct.english_name]["reach"]}</td>
                                                            <td className="border-2">{advertisingsData[date][brandProduct.english_name]["impressions"]}</td>
                                                            <td className="border-2">{advertisingsData[date][brandProduct.english_name]["frequency"]}</td>
                                                            <td className="border-2">{advertisingsData[date][brandProduct.english_name]["spend"]}</td>
                                                            <td className="border-2">{advertisingsData[date][brandProduct.english_name]["cpm"]}</td>
                                                            <td className="border-2">{advertisingsData[date][brandProduct.english_name]["website_ctr"]}</td>
                                                            <td className="border-2">{advertisingsData[date][brandProduct.english_name]["purchase_roas"]}</td>
                                                            <td className="border-2">{advertisingsData[date][brandProduct.english_name]["cost_per_unique_inline_link_click"]}</td>
                                                            <td className="border-2">{advertisingsData[date][brandProduct.english_name]["purchase"]}</td>
                                                            <td className="border-2">{advertisingsData[date][brandProduct.english_name]["landing_page_view"]}</td>
                                                            <td className="border-2">{advertisingsData[date][brandProduct.english_name]["link_click"]}</td>
                                                            <td className="border-2">{advertisingsData[date][brandProduct.english_name]["add_payment_info"]}</td>
                                                            <td className="border-2">{advertisingsData[date][brandProduct.english_name]["add_to_cart"]}</td>
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
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )
                        }
                    </div>
                :
                    <div className="flex justify-center items-center h-screen">
                        <div className="flex justify-center items-center">
                            <span className="text-gray-400">No data.</span>
                        </div>
                    </div>
            }
        </>
    );
}

export default Table;