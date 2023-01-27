import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Brand from "./routes/Brand";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "brand",
                element: <Brand />,
            },
        ]
    }
]);

export default router;