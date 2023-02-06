function Table({brand, salesData, advertisingsData, listOfDate}) {
    return (
        <>            
            {/* <div>
                <span>Summary</span>
                { completeData.length === 0 ? 
                        <div className="flex justify-center items-center border h-52">
                            <span className="text-gray-400">No data.</span>
                        </div>
                    :
                        null
                }
            </div>
            { brand.product_set.map((product) => (
                <div key={product.pk} className="overflow-auto">
                    <span>{product.name}</span>
                    <table className="mb-5 border-collapse border-2 w-full">
                        <thead>
                            <tr>
                            <th className="border-2 w-36">날짜</th>
                            {product.options_set.map((option) => (
                                <th key={option.pk} className="border-2 whitespace-nowrap">{option.name}</th>
                            ))}
                            </tr>
                        </thead>
                        {listOfDate.length === 0 ?
                                null
                            :
                                <tbody>
                                    {listOfDate.map((date, index) => (
                                        <tr key={index} className="border-2">
                                            <td className="text-center">{date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                        }
                    </table>
                </div>
            ))} */}
            { Object.keys(salesData).length !== 0 && Object.keys(advertisingsData).length !== 0 ? 
                    <div>
                        { brand.product_set.map((product) =>
                                <div key={product.key} className="flex mt-5">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>{product.name}({product.english_name})</th>
                                            </tr>
                                            <tr>
                                                <th>날짜</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { listOfDate.map((date, index) => 
                                                <tr key={index}>
                                                    <td>{date}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>옵션판매현황</th>
                                            </tr>
                                            <tr>
                                                { product.options_set.map((option) =>
                                                    <th key={option.pk}>{option.name}</th>
                                                )}
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            )
                        }
                        <div>
                            <table>

                            </table>
                        </div>
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