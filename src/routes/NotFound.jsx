import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="flex flex-col justify-center items-center mt-24">
            <span className="text-lg">Page Not Found.</span>
            <Link to={"/"}>
                <span>Go Home &rarr;</span>
            </Link>
        </div>
    );
}

export default NotFound;