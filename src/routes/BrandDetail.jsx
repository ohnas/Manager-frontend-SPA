import { useParams } from "react-router-dom";

function BrandDetail() {
    let {brandPk} = useParams();
    console.log(brandPk);
    return (
        <div>Here is Brand Detail Page!!</div>
    );
}

export default BrandDetail;