import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import NotFound from "./routes/NotFound";
import Home from "./routes/Home";
import Brand from "./routes/Brand";
import BrandDetail from "./routes/BrandDetail";
import SignUp from "./routes/SignUp";
import Management from "./routes/Management";
import UpdateUser from "./routes/management/user/UpdateUser";
import CreateBrand from "./routes/management/brand/CreateBrand"
import UpdateBrand from "./routes/management/brand/UpdateBrand"
import UpdateBrandForm from "./routes/management/brand/UpdateBrandForm"
import CreateProduct from "./routes/management/product/CreateProduct"
import UpdateProduct from "./routes/management/product/UpdateProduct"
import UpdateProductForm from "./routes/management/product/UpdateProductForm";
import CreateOption from "./routes/management/option/CreateOption"
import UpdateOption from "./routes/management/option/UpdateOption"
import UpdateOptionForm from "./routes/management/option/UpdateOptionForm";
import CreateSite from "./routes/management/site/CreateSite"
import UpdateSite from "./routes/management/site/UpdateSite"
import UpdateSiteForm from "./routes/management/site/UpdateSiteForm";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <NotFound />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "brands",
                element: <Brand />,
            },
            {
                path: "brands/:brandPk",
                element: <BrandDetail />,
            },
            {
                path: "signup",
                element: <SignUp />,
            },
            {
                path: "management",
                element: <Management />,
            },
            {
                path: "management/manageuser/update",
                element: <UpdateUser />,
            },
            {
                path: "management/managebrand/create",
                element: <CreateBrand />,
            },
            {
                path: "management/managebrand/update",
                element: <UpdateBrand />,
            },
            {
                path: "management/managebrand/update/:brandPk",
                element: <UpdateBrandForm />,
            },
            {
                path: "management/manageproduct/create",
                element: <CreateProduct />,
            },
            {
                path: "management/manageproduct/update",
                element: <UpdateProduct />,
            },
            {
                path: "management/manageproduct/update/:productPk",
                element: <UpdateProductForm />,
            },
            {
                path: "management/manageoption/create",
                element: <CreateOption />,
            },
            {
                path: "management/manageoption/update",
                element: <UpdateOption />,
            },
            {
                path: "management/manageoption/update/:optionPk",
                element: <UpdateOptionForm />,
            },
            {
                path: "management/managesite/create",
                element: <CreateSite />,
            },
            {
                path: "management/managesite/update",
                element: <UpdateSite />,
            },
            {
                path: "management/managesite/update/:sitePk",
                element: <UpdateSiteForm />,
            },
        ]
    }
]);

export default router;