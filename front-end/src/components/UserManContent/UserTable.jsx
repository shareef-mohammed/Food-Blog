import React, { useState } from "react";
import AdminConfirm from "../AdminConfirm/AdminConfirm";
import DeleteButton from "./DeleteButton";

const UserTable = ({ data }) => {
  let i = 0;
  return (
    <>
      <table className="border-separate border border-slate-400 ">
        <thead>
          <tr>
            <th className="border border-slate-300  ">SI No</th>
            <th className="border border-slate-300 px-10">User Name</th>
            <th className="border border-slate-300 px-16">Full Name</th>
            <th className="border border-slate-300 px-36">Email</th>
            <th className="border border-slate-300 px-12">Phone</th>
            <th className="border border-slate-300 px-8">Action</th>
          </tr>
        </thead>
        {data ? (
          <tbody>
            {data.map((user, index) => {
              return (
                <tr key={index}>
                  <td className="border border-slate-300  px-4 py-2">{++i}</td>
                  <td className="border border-slate-300  px-4">
                    {" "}
                    {user.userName}
                  </td>
                  <td className="border border-slate-300  px-4">
                    {user.fullName}{" "}
                  </td>
                  <td className="border border-slate-300  px-4">
                    {user.email}
                  </td>
                  <td className="border border-slate-300  px-4">
                    {user.phone}
                  </td>

                  <DeleteButton user={user} />
                </tr>
              );
            })}
          </tbody>
        ) : (
          <p>No users available</p>
        )}
      </table>
    </>
  );
};

export default UserTable;
