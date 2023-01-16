function LogIn() {
    return (
        <div className="flex flex-col mt-32 justify-center items-center">
            <span className="text-3xl mb-10">Log in to your account</span>
            <form className="flex flex-col justify-center items-center">
                <label htmlFor="idfield">ID</label>
                <input id="idfield" type={"text"} className="border-2 rounded-md w-72 border-gray-200 mb-5" />
                <label htmlFor="pwfield">PASSWORD</label>
                <input id="pwfield" type={"password"} className="border-2 rounded-md w-72 border-gray-200 mb-5" />
                <button className="border-solid border-2 rounded-md w-72 h-12 bg-purple-800 text-white">Log In</button>
            </form>
        </div>
    );
}

export default LogIn;