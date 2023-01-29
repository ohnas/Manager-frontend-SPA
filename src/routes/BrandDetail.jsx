import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../api";
import Detail from "../components/Detail";

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
        <Detail brand={brand} />
    );
}

export default BrandDetail;