import { useContext, useState } from "react";
import UserMenu from "./UserMenu";
import { useNavigate } from "react-router-dom";
import userContext from "../context/UserContext";

export function AppBar() {
    const { firstName } = useContext(userContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear(); 
        navigate('/signin')
    };
    const handleEdit = () => {
        navigate('/update');
      };
    return (
            <div className="shadow h-14 flex justify-between">
                <div className="flex flex-col justify-center ml-4 font-medium">
                    Paytm App
                </div>

                <div className="flex">
                    <div className="flex flex-col justify-center h-full mr-4">
                        Hello, {firstName}
                    </div>
                    
                    <UserMenu onLogout={handleLogout} onEdit={handleEdit} />
                    </div>
                </div>
            
    )
}