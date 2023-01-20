import React, { useState } from "react";
import AdminConfirm from "../AdminConfirm/AdminConfirm";

const DeleteButton = ({ user }) => {
  const [confirm, setConfirm] = useState(false);
  return (
    <td className="border border-slate-300  px-4">
      {user.isBlocked === false ? (
        <>
          <AdminConfirm
            open={confirm}
            onClose={() => setConfirm(false)}
            id={user._id}
            user={true}
            block={true}
          />
          <button
            className="border-2 border-rose-600 px-2 rounded-md text-[#dc2626] hover:bg-[#dc2626] hover:text-white"
            onClick={() => setConfirm(true)}
          >
            Block
          </button>
        </>
      ) : (
        <>
          <AdminConfirm
            open={confirm}
            onClose={() => setConfirm(false)}
            id={user._id}
            user={true}
            unblock={true}
          />
          <button
            className="border-2 border-[#22c55e] px-2 rounded-md text-[#22c55e] hover:bg-[#22c55e] hover:text-white"
            onClick={() => setConfirm(true)}
          >
            Unblock
          </button>
        </>
      )}
    </td>
  );
};

export default DeleteButton;
