import { useEffect, useState } from "react";
import { Bottom } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {  toast } from "sonner";

export function SigninPage()  {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();


    const handleSignin = async() => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                username,
                password
            });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem('firstName', response.data.firstName);
            localStorage.setItem('lastName', response.data.lastName);

            toast.success("Signed in successfully!");
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.msg || "signin failed");
            console.error(error);
        }
    }
    return (
        <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading label={"Sign in"}/>
            <SubHeading label={"Enter your credentials to access your account"}/> 
            <InputBox onChange={(e) => {setUsername(e.target.value)}} label={"Username"} placeholder={"Enter your username"}/>
            <InputBox onChange={(e) => {setPassword(e.target.value)}} label={"password"} placeholder={"Enter your password"}/>
            <Button Onclick={handleSignin} label={"Sign in"}/>
            <Bottom label={"Don't have an account?"} buttonText={"Sign up"} to={'/signup'}/>
            </div>
        </div>
    </div>
    )
}