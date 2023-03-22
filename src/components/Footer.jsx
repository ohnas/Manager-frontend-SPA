import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../api";

function Footer({permission}) {
    const [brands, setBrands] = useState([]);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    async function handleBrands() {
        let response = await fetch(`${baseUrl}/brands`, {
            method : "GET",
            credentials: "include",
            headers : {
                'Content-Type': 'application/json',
            },
        });
        let data = await response.json();
        setBrands(data);
    }
    function onSubmit(data) {
        navigate(`/brands/${data.brand}`);
    }
    useEffect(() => {
        if (permission) {
            handleBrands();
        }
    }, []);
    return (
        <>
            {permission ? 
                    <div className="w-56 h-8 fixed bottom-2 right-6">
                        <form onSubmit={handleSubmit(onSubmit)} className="flex justify-evenly items-center">
                            <select {...register("brand", {required: true})} className="border-2 rounded-md w-36 text-center">
                                <option value={""}>Go to Brand</option>
                                {brands.map((brand) =>
                                    <option key={brand.pk} value={brand.pk}>{brand.name}</option>
                                )}
                            </select>
                            <button className="text-xs text-gray-400">MOVE</button>
                        </form>
                    </div>
                :
                    null
            }
        </>
    );
}

export default Footer;