import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import NotFound from "./routes/NotFound";
import Home from "./routes/Home";
import Brand from "./routes/Brand";
import BrandDetail from "./routes/BrandDetail";
import SignUp from "./routes/SignUp";
import Management from "./routes/Management";
import ManageUser from "./routes/management/ManageUser";
import ManageBrand from "./routes/management/ManageBrand";
import ManageProduct from "./routes/management/ManageProduct";
import ManageSite from "./routes/management/ManageSite";
import UpdateUser from "./routes/management/user/UpdateUser";
import CreateBrand from "./routes/management/brand/CreateBrand"
import UpdateBrand from "./routes/management/brand/UpdateBrand"
import CreateProduct from "./routes/management/product/CreateProduct"
import UpdateProduct from "./routes/management/product/UpdateProduct"
import CreateSite from "./routes/management/site/CreateSite"
import UpdateSite from "./routes/management/site/UpdateSite"


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
                children: [
                    {
                        path: "manageuser",
                        element: <ManageUser />,
                        children: [
                            {
                                path: "update",
                                element: <UpdateUser />,
                            }
                        ]
                    },
                    {
                        path: "managebrand",
                        element: <ManageBrand />,
                        children: [
                            {
                                path: "create",
                                element: <CreateBrand />,
                            },
                            {
                                path: "update",
                                element: <UpdateBrand />,
                            },
                        ]
                    },
                    {
                        path: "manageproduct",
                        element: <ManageProduct />,
                        children: [
                            {
                                path: "create",
                                element: <CreateProduct />,
                            },
                            {
                                path: "update",
                                element: <UpdateProduct />,
                            },
                        ]
                    },
                    {
                        path: "managesite",
                        element: <ManageSite />,
                        children: [
                            {
                                path: "create",
                                element: <CreateSite />,
                            },
                            {
                                path: "update",
                                element: <UpdateSite />,
                            },
                        ]
                    },
                ]
            },
        ]
    }
]);

export default router;