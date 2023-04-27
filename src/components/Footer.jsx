import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query'
import { getBrands } from "../api";

function Footer() {
    const { isLoading, data: brandsData } = useQuery(['brands'], getBrands, 
        {
            refetchOnWindowFocus: false,
        }
    );
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    function onSubmit(data) {
        navigate(`/brands/${data.brand}`);
    }
    return (
        <>
            {isLoading ?
                null
                :
                <div className="w-56 h-8 fixed bottom-2 right-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex justify-evenly items-center">
                        <select {...register("brand", {required: true})} className="border-2 rounded-md w-36 text-center">
                            <option value={""}>Go to Brand</option>
                            {brandsData.map((brand) =>
                                <option key={brand.pk} value={brand.pk}>{brand.name}</option>
                            )}
                        </select>
                        <button className="text-xs text-gray-400">MOVE</button>
                    </form>
                </div>
            }
        </>
    );
}

export default Footer;