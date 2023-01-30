import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { baseUrl } from "../api";
import Detail from "../components/Detail";

function BrandDetail() {
    const { 
        brandName: [setBrandName],
    } = useOutletContext();
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
        setBrandName(data.name);
    }
    useEffect(() => {
        brandDetail();
    }, []);
    return (
        <Detail brand={brand} />
    );
}

export default BrandDetail;