import { useSelector } from "react-redux";
import {Outlet, Navigate} from "react-router-dom"; 

export default function ProtectedRoute() {
    const {currentUser} = useSelector((state: any) => state.user);   
    return  currentUser ? <Outlet /> : <Navigate to="/sign-in" /> 
}