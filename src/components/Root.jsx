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
                                isLoading:[isLoading],
                                userData: userData,
                                brandName: [setBrandName],
                            }
                        } />
                    <Footer isLoading={isLoading} />
                </>
            }
        </div>
    );
}

export default Root;