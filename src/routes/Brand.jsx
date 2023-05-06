import { Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query'
import { getMyBrand } from "../api";

function Brand() {
    const { isLoading, data: myBrandData } = useQuery(['myBrand'], getMyBrand);
    return (
        <>
            {isLoading ?
                 <span>Loading...</span> 
                :
                <>
                    { myBrandData.length === 0 ? 
                        <div className="flex flex-col mt-32 justify-center items-center">
                            <span>There is no brand.</span>
                        </div>
                        :
                        <div className="flex flex-col mt-32 justify-center items-center">
                            { myBrandData.map((brand) =>
                                <Link to={`/brands/${brand.pk}`} key={brand.pk}>
                                    <li className="list-none mb-10">{brand.name}</li>
                                </Link>
                                )
                            }
                        </div>
                    }
                </>
            }
        </>
    );
}

export default Brand;