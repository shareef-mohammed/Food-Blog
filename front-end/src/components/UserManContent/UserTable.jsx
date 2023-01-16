import React from "react";

const UserTable = ({ data }) => {
  function blockUser(id) {
    fetch(`${process.env.REACT_APP_BASEURL}/admin/blockUser/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          window.location.reload();
        }
      })
      .catch(err => {
        console.log(err)
      });
  }

  function unblockUser(id) {
    fetch(`${process.env.REACT_APP_BASEURL}/admin/unblockUser/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          let i = 0;
          window.location.reload();
        }
      })
      .catch(err => {
        console.log(err)
      });
  }
  let i = 0;
  return (
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
      {
        data ? 
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
              <td className="border border-slate-300  px-4">{user.email}</td>
              <td className="border border-slate-300  px-4">{user.phone}</td>
              <td className="border border-slate-300  px-4">
                {user.isBlocked === false ? (
                  <button
                    className="border-2 border-rose-600 px-2 rounded-md text-[#dc2626] hover:bg-[#dc2626] hover:text-white"
                    onClick={() => blockUser(user._id)}
                  >
                    Block
                  </button>
                ) : (
                  <button
                    className="border-2 border-[#22c55e] px-2 rounded-md text-[#22c55e] hover:bg-[#22c55e] hover:text-white"
                    onClick={() => unblockUser(user._id)}
                  >
                    Unblock
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody> : <p>No users available...</p>
      }
    </table>
  );
};

export default UserTable;
