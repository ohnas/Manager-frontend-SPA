import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../api";


function Brand() {
    const [brands, setBrands] = useState([]);
    async function myBrand() {
        let response = await fetch(`${baseUrl}/brands/my`, {
            method : "GET",
            credentials: "include",
            headers : {
                'Content-Type': 'application/json',
            },
        });
        let data = await response.json();
        setBrands(data);
    }
    useEffect(() => {
        myBrand();
    }, []);
    return (
        <>
            { brands.length === 0 ? 
                    <div className="flex flex-col mt-32 justify-center items-center">
                        <span>There is no brand.</span>
                    </div>
                :
                    <div className="flex flex-col mt-32 justify-center items-center">
                        { brands.map((brand) =>
                            <Link to={`/brands/${brand.pk}`} key={brand.pk}>
                                <li className="list-none mb-10">{brand.name}</li>
                            </Link>
                            )
                        }
                    </div>
            }
        </>
    );
}

export default Brand;