import { Link, useOutletContext } from "react-router-dom";
import LogIn from "../components/LogIn";


function Home() {
    const { userData } = useOutletContext();
    return (
        <div>
            { userData.detail === "Authentication credentials were not provided."  ?
                <LogIn />
                :
                <Link to={"brands"}>
                    <div className="flex flex-col mt-32 justify-center items-center">
                        <span>Go to Brand &rarr;</span>
                    </div>
                </Link> 
            }
        </div>
    );
}

export default Home;