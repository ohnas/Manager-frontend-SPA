import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import NotFound from "./routes/NotFound";
import Home from "./routes/Home";
import Brand from "./routes/Brand";
import BrandDetail from "./routes/BrandDetail";
import MonthlyTable from "./routes/MonthlyTable";
import Unlisting from "./routes/Unlisting";
import SignUp from "./routes/SignUp";
import Management from "./routes/Management";
import UpdateUser from "./routes/management/user/UpdateUser";
import UpdateUserForm from "./routes/management/user/UpdateUserForm";
import CreateBrand from "./routes/management/brand/CreateBrand"
import UpdateBrand from "./routes/management/brand/UpdateBrand"
import UpdateBrandForm from "./routes/management/brand/UpdateBrandForm"
import CreateProduct from "./routes/management/product/CreateProduct"
import UpdateProduct from "./routes/management/product/UpdateProduct"
import UpdateProductList from "./routes/management/product/UpdateProductList";
import UpdateProductForm from "./routes/management/product/UpdateProductForm";
import CreateOption from "./routes/management/option/CreateOption"
import UpdateOption from "./routes/management/option/UpdateOption"
import UpdateOptionProductList from "./routes/management/option/UpdateOptionProductList";
import UpdateOptionList from "./routes/management/option/UpdateOptionList";
import UpdateOptionForm from "./routes/management/option/UpdateOptionForm";
import CreateSite from "./routes/management/site/CreateSite"
import UpdateSite from "./routes/management/site/UpdateSite"
import UpdateSiteList from "./routes/management/site/UpdateSiteList";
import UpdateSiteForm from "./routes/management/site/UpdateSiteForm";
import CreateExpense from "./routes/management/expense/CreateExpense";
import UpdateExpense from "./routes/management/expense/UpdateExpense";
import UpdateExpenseList from "./routes/management/expense/UpdateExpenseList";
import UpdateExpenseForm from "./routes/management/expense/UpdateExpenseForm";

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
                path: "brands/:brandPk/monthly",
                element: <MonthlyTable />,
            },
            {
                path: "brands/:brandPk/unlisting",
                element: <Unlisting />,
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
                path: "management/manageuser/update/:userPk",
                element: <UpdateUserForm />,
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
                path: "management/manageproduct/update/:brandPk/productList",
                element: <UpdateProductList />,
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
                path: "management/manageoption/update/:brandPk/productList",
                element: <UpdateOptionProductList />,
            },
            {
                path: "management/manageoption/update/:productPk/optionList",
                element: <UpdateOptionList />,
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
                path: "management/managesite/update/:brandPk/siteList",
                element: <UpdateSiteList />,
            },
            {
                path: "management/managesite/update/:sitePk",
                element: <UpdateSiteForm />,
            },
            {
                path: "management/manageexpense/create",
                element: <CreateExpense />,
            },
            {
                path: "management/manageexpense/update",
                element: <UpdateExpense />,
            },
            {
                path: "management/manageexpense/update/:brandPk/expenseList",
                element: <UpdateExpenseList />,
            },
            {
                path: "management/manageexpense/update/:expensePk",
                element: <UpdateExpenseForm />,
            },
        ]
    }
]);

export default router;