import React, { useState } from "react";
import AdminConfirm from "../AdminConfirm/AdminConfirm";

const DeleteButton = ({ banner }) => {
  const [confirm, setConfirm] = useState(false);
  return (
    <td className="border border-slate-300  px-4">
      <button
        className="border-2 border-rose-600 px-2 rounded-md text-[#dc2626] hover:bg-[#dc2626] hover:text-white"
        onClick={() => setConfirm(true)}
      >
        Delete
      </button>
      <AdminConfirm
        open={confirm}
        onClose={() => setConfirm(false)}
        id={banner._id}
        banner={true}
      />
    </td>
  );
};

export default DeleteButton;
