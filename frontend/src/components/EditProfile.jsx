import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "sonner";


export function EditProfile() {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
      try {
        const token = localStorage.getItem("token");

    const updateData = {};
    if (firstName.trim()) updateData.firstName = firstName;
    if (lastName.trim()) updateData.lastName = lastName;
    if (password.trim()) updateData.password = password;

    if (Object.keys(updateData).length === 0) {
      toast.error("Please update at least one field ⚠️");
      return;
    }

    const response = await axios.put(
      "http://localhost:3000/api/v1/user/update",
      updateData,
      {
        headers: {
          Authorization: 'Bearer '+ token
        },
      }
    );

    toast.success("Profile updated! Please sign in again.");
    localStorage.clear();
    navigate('/signin');
      } catch (error) {
        toast.error(error.response?.data?.msg || "Update failed")
        console.log(error);
      }
    }
  return (
    <Dialog.Root open={true}> 
      <Dialog.Portal>
       
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

        
        <Dialog.Content className="fixed top-1/2 left-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg focus:outline-none">
          <Dialog.Title className="text-lg font-bold mb-2">Edit Profile</Dialog.Title>
          <Dialog.Description className="text-sm mb-4 text-gray-500">
            Update your profile information below.
          </Dialog.Description>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="firstName" className="mb-1 text-sm font-medium">First Name</label>
              <input 
                onChange={(e) => {setFirstName(e.target.value)}}
                type="text"
                id="firstName"
                placeholder="Enter first name"
                className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="lastName" className="mb-1 text-sm font-medium">Last Name</label>
              <input
                onChange={(e) => {setLastName(e.target.value)}}
                type="text"
                id="lastName"
                placeholder="Enter last name"
                className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="mb-1 text-sm font-medium">Password</label>
              <input
                onChange={(e) => {setPassword(e.target.value)}}
                type="password"
                id="password"
                placeholder="********"
                className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <Dialog.Close  onClick={() => {navigate('/dashboard')}} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              Cancel
            </Dialog.Close>
            <Dialog.Close onClick={handleSubmit}className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Save
            </Dialog.Close>
          </div>

          <Dialog.Close className="absolute top-3 right-3 p-1 rounded hover:bg-gray-200">
            <Cross2Icon onClick={() => {navigate('/dashboard')}}/>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}