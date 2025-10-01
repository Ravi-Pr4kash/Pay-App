import { useContext, useState, useEffect } from "react";
import { Button } from "./Button";
import { InputBox } from "./InputBox";
import { useNavigate } from "react-router-dom";
import userContext from "../context/UserContext";

export function Users() {
  const navigate = useNavigate();
  const { allUsers } = useContext(userContext);
  const [filter, setFilter] = useState("");

  
  const filteredUsers = allUsers?.filter(user =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(filter.toLowerCase())
  );

  if (!allUsers) return <div>Loading users...</div>;

  return (
    <>
      <div className="my-2 ml-8 mr-4">
        <InputBox
          onChange={(e) => setFilter(e.target.value)}
          label={"Users"}
          placeholder={"Search User"}
        />
      </div>
      <div>
        {filteredUsers?.map(user => (
          <div key={user._id} className="flex justify-between ml-8 my-2 mr-4">
            <div className="flex">
              <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                  {user.firstName[0]}
                </div>
              </div>

              <div className="flex flex-col justify-center h-full font-medium">
                <div>{user.firstName} {user.lastName}</div>
              </div>
            </div>

            <div className="flex flex-col justify-center h-full ">
              <Button
                label={"Send Money"}
                Onclick={() => navigate('/send?id=' + user._id + "&name=" + user.firstName)}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}