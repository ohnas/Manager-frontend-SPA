import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import Brand from "./routes/Brand";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "brand",
                element: <Brand />,
            },
        ]
    }
]);

export default router;