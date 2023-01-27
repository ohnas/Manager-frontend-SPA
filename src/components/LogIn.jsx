function LogIn({onChange, onLogIn}) {
    return (
        <div className="flex flex-col mt-32 justify-center items-center">
            <form className="flex flex-col justify-center items-center" onSubmit={onLogIn}>         
                <span className="text-3xl mb-10">Log in to your account</span>
                <label htmlFor="idfield">ID</label>
                <input required onChange={onChange} id="idfield" name="username" type={"text"} className="border-2 rounded-md w-72 border-gray-200 mb-5" />
                <label htmlFor="pwfield">PASSWORD</label>
                <input required onChange={onChange} id="pwfield" name="password" type={"password"} className="border-2 rounded-md w-72 border-gray-200 mb-5" />
                <button className="border-solid border-2 rounded-md w-72 h-12 bg-purple-700 text-white">Log In</button>
            </form>
        </div>
    );
}

export default LogIn;
