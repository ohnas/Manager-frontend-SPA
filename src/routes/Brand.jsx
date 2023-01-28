import { useEffect, useState } from "react";
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
        <div className="flex flex-col mt-32 justify-center items-center">
            { brands.map((brand) =>
                <li key={brand.pk} className="list-none mb-10">{brand.name}</li>
                )
            }
        </div>
    );
}

export default Brand;