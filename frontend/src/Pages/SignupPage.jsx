import { useState } from "react";
import { Bottom } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export function SignupPage() {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    return (
        
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"}/>
                <SubHeading label={"Enter your information to create an account"}/> 
                <InputBox onChange={(e) => {setFirstName(e.target.value)}} label={"First Name"} placeholder={"Enter your first name"}/>
                <InputBox onChange={(e) => {setLastName(e.target.value)}} label={"Last Name"} placeholder={"Enter your last name"}/>
                <InputBox onChange={(e) => {setUsername(e.target.value)}} label={"Username"} placeholder={"Enter your username"}/>
                <InputBox onChange={(e) => {setPassword(e.target.value)}} label={"password"} placeholder={"Enter your password"}/>
                <Button Onclick={async() => {
                    const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                        firstName,
                        lastName,
                        username,
                        password
                    })
                    localStorage.setItem("token", response.data.token)
                    navigate('/dashboard')
                }} label={"Sign up"}/>
                <Bottom label={"Already have an account?"} buttonText={"Sign in"} to={'/signin'}/>
                </div>
            </div>
        </div>
        
    )
}

