import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div>
            Page Not Found.
            <Link to={"/"}>
                <span>Go Home &rarr;</span>
            </Link>
        </div>
    );
}

export default NotFound;