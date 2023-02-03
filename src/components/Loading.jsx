function Loading() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex justify-center items-center border-4 rounded-full h-48 w-48 animate-pulse">
                <span className="text-gray-400">Processing...</span>
            </div>
        </div>
    );                     
}

export default Loading;