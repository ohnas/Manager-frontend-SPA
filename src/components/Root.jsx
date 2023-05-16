import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useQuery } from '@tanstack/react-query'
import { getUserProfile } from "../api";
import Header from "./Header";
import Footer from "./Footer";

function Root() {
    const { isLoading, data: userData } = useQuery(['userProfile'], getUserProfile);
    const [brandName, setBrandName] = useState("");
    const [formData, setFormData] = useState(null);
    const location = useLocation();
    useEffect(() => {
        if(!location.pathname.includes("/brands/")) {
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
                                setBrandName,
                                formData,
                                setFormData,
                            }
                        } />
                    { userData.detail === "Authentication credentials were not provided." ? 
                        null
                        :
                        <Footer setFormData={setFormData} />
                    }
                </>
            }
        </div>
    );
}

export default Root;