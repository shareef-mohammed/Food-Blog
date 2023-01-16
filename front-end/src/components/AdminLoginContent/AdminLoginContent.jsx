import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLoginContent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  function adminLogin() {
    if (!email || !password) {
      document.getElementById("err").innerHTML = "Empty values are not allowed";
    } else {
      fetch(`${process.env.REACT_APP_BASEURL}/admin/adminLogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "emailErr") {
            document.getElementById("err").innerHTML = "Invalid Email Id";
          } else if (data.status === "passErr") {
            document.getElementById("err").innerHTML = "Invalid Password";
          } else {
            localStorage.setItem("adminToken", data.token);
            navigate("/Admin/Dashboard");
          }
        })
        .catch(err => {
          console.log(err)
        });
    }
  }
  return (
    <div className="max-w-[1280px] mx-auto px-4 pt-3  relative flex justify-between items-center ">
      <div className="mx-auto pt-12 bg-[#fbcfe8] text-center rounded-md">
        <h3 className="text-[30px] font-bold">Login as Admin</h3>
        <div className="text-left py-4">
          <from className="">
            <div id="err"></div>
            <label className="px-8 mb-3">
              Email <br />
              <input
                className="ml-8 h-8 pl-2 border"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email"
              />
            </label>
            <br />
            <label className="px-8 mt-2 ">
              Password
              <br />
              <input
                className="ml-8 h-8 pl-2 border"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </label>
            <br />
          </from>
        </div>
        <button
          className="bg-[#22c55e] mt-4 mb-12 px-4 py-1 text-white rounded-md"
          onClick={adminLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLoginContent;
