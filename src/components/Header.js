function Header({permission, logOut, user}) {
    return (
        <div className="flex justify-between h-28 items-center border-b-2">
            <span className="text-5xl">Manager</span>
            <div className="flex space-x-4 items-center">
                { permission ? 
                    <>
                        <span className="w-24">{user.name}</span>
                        {user.is_staff ? <button className="border-solid border-2 rounded-md w-32 h-12 border-purple-300 text-black">Management</button>: null}
                        <button className="border-solid border-2 rounded-md w-28 h-12 bg-purple-600 text-white" onClick={logOut}>Log Out</button> 
                    </> :
                    <>
                        <button className="border-solid border-2 rounded-md w-28 h-12 bg-purple-600 text-white">Sign Up</button>
                    </>
                }
            </div>
        </div>
    );
}

export default Header;