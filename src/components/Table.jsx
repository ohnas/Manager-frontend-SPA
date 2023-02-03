function Table({brand, completeData, listOfDate}) {
    return (
        <>
            <div>
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
            ))}
        </>
    );
}

export default Table;