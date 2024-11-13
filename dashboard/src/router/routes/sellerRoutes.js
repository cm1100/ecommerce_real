import Home from "../../views/pages/Home";


export const sellerRoutes = [
    {
        path:'/',
        element:<Home/>,
        ability:['admin','seller']
    }
]