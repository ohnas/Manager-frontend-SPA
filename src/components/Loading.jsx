function Loading() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex justify-center items-center border-4 rounded-full h-48 w-48 animate-pulse border-green-200">
                <span className="text-green-500">Processing...</span>
            </div>
        </div>
    );                     
}

export default Loading;