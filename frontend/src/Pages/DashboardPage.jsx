import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { UserProvider } from "../context/UserContext";

export function DashboardPage() {
    return (
        <>
            
           <UserProvider>
            <AppBar/>
            <Balance/>
            <Users/>
           </UserProvider>
            
        </>
    )
}