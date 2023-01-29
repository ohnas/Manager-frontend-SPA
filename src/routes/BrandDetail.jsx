import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../api";

function BrandDetail() {
    let {brandPk} = useParams();
    const [brand, setBrand] = useState({});
    async function brandDetail() {
        let response = await fetch(`${baseUrl}/brands/${brandPk}`, {
            method : "GET",
            credentials: "include",
            headers : {
                'Content-Type': 'application/json',
            },
        });
        let data = await response.json();
        setBrand(data);
    }
    useEffect(() => {
        brandDetail();
    }, []);
    return (
        <>
            { Object.keys(brand).length === 0 ? 
                    <div className="flex flex-col mt-32 justify-center items-center">
                        <span>There is no Brand Detail.</span>
                    </div>
                :
                <div>
                    { brand.product_set.map((product) => 
                        <div key={product.pk}>
                            <select>
                                <option>{product.name}</option>
                            </select>
                            <br></br>
                            <span>{product.cost}</span>
                        </div>
                        )
                    }
                    { brand.site_set.map((site) => 
                        <div key={site.pk}>
                            <select>
                                <option>{site.name}</option>
                            </select>
                            <br></br>
                            <span>{site.url}</span>
                        </div>
                        )
                    }
                </div>
            }
        </>
    );
}

export default BrandDetail;