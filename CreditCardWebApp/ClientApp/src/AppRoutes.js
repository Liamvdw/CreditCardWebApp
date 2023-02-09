import { DisplayCards } from "./components/DisplayCards";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/add-card',
        element: <Example />
    },
    {
        path: '/display-cards',
        element: <DisplayCards />
    },
    {
        path: '/fetch-data',
        element: <FetchData />
    }
];

export default AppRoutes;
