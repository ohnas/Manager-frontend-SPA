function Table({brand, completeData, listOfDate}) {
    console.log(brand);
    console.log(listOfDate);
    console.log(completeData);
    return (
        <>            
            { Object.keys(completeData).length === 0 ? 
                    <div className="flex justify-center items-center h-screen">
                        <div className="flex justify-center items-center">
                            <span className="text-gray-400">No data.</span>
                        </div>
                    </div>
                :
                    <span>조회완료</span>
            }
        </>
    );
}

export default Table;