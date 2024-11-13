import Home from "../../views/pages/Home";
import AdminDashboard from '../../views/admin/adminDashboard';


export const adminRoutes = [
    {
        path:'admin/dashboard',
        element:<AdminDashboard/>,
        role:"admin"
    }
]