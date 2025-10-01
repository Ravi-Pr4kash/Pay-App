import { useContext } from "react"
import userContext from "../context/UserContext"


export function Balance() {
    const { balance } = useContext(userContext)
    return (
        <div className="flex h-14 py-4 ml-8">
            <div className="font-bold">
                Your Balance:
            </div>

            <div className="ml-2 font-bold">
                {Number(balance).toFixed(2)}
                
            </div>
        </div>
    )
}