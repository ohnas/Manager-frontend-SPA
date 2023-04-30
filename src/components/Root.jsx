import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useQuery } from '@tanstack/react-query'
import { getUserProfile } from "../api";
import Header from "./Header";
import Footer from "./Footer";

function Root() {
    const { isLoading, data: userData } = useQuery(['userProfile'], getUserProfile);
    const [brandName, setBrandName] = useState("");
    const location = useLocation();
    useEffect(() => {
        if(location.pathname !== "/brands") {
            setBrandName("");
        }
    }, [location]);
    return (
        <div>
            {isLoading ? 
                <span>Loading...</span>
                :
                <>
                    <Header userData={userData} brandName={brandName} />
                    <Outlet context={{
                                userData: userData,
                                brandName: [setBrandName],
                            }
                        } />
                    { userData.detail === "Authentication credentials were not provided." ? 
                        null
                        :
                        <Footer />
                    }
                </>
            }
        </div>
    );
}

export default Root;