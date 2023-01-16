function Header() {
    return (
        <div className="flex justify-between h-28 items-center border-b-2">
            <span className="text-5xl">Manager</span>
            <div className="flex justify-evenly w-52 h-12">
            <button className="w-28">Log In</button>
            <button className="border-solid border-2 rounded-md w-28 bg-violet-600 text-white">Sign Up</button>
            </div>
        </div>
        );
}

export default Header;