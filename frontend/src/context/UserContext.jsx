import axios from "axios";
import { createContext, useEffect, useState } from "react";

const userContext = createContext();


export function UserProvider({ children }) {
    const [balance, setBalance] = useState(0);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [allUsers, setAllUsers] = useState()

    async function fetchData() {
        try {
            const token = localStorage.getItem('token')
            if(!token) {
                console.log("No token found");
                return;
            }
            const response = await axios.get('http://localhost:3000/api/v1/account/balance' ,{
                headers: {
                    Authorization: "Bearer "+ token
                }
            })
            setBalance(response.data.balance)
            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    //fetching users for dashboard page
    async function fetchUsers() {
        try {
            const token = localStorage.getItem('token')
            if(!token) {
                console.log("No token found");
                return
            }

            const response = await axios.get('http://localhost:3000/api/v1/user/bulk',{
                headers: {
                    Authorization: "Bearer "+ token
                }
            })
            setAllUsers(response.data.user)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // fetch data when the components mount
    useEffect(() => {
        fetchData();
        fetchUsers();
    },[])

    return (
        <userContext.Provider value={{balance, firstName, lastName, allUsers}}>
            {children}
        </userContext.Provider>
    )
}

export default userContext;