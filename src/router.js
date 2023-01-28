import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import NotFound from "./routes/NotFound";
import Home from "./routes/Home";
import Brand from "./routes/Brand";
import BrandDetail from "./routes/BrandDetail";

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
        ]
    }
]);

export default router;