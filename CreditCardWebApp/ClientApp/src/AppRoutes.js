import { DisplayCards } from "./components/DisplayCards";
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
    }    
];

export default AppRoutes;
