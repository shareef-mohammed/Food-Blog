import React, { useState } from "react";
import AdminConfirm from "../AdminConfirm/AdminConfirm";

const DeleteButton = ({ report }) => {
  const [confirm, setConfirm] = useState(false);
  return (
    <td className="border border-slate-300  px-4">
      <button
        onClick={() => setConfirm(true)}
        className="border-2 border-rose-600 px-2 rounded-md text-[#dc2626] hover:bg-[#dc2626] hover:text-white"
      >
        Remove
      </button>
      <AdminConfirm
        onClose={() => setConfirm(false)}
        open={confirm}
        id={report._id}
        report={true}
      />
    </td>
  );
};

export default DeleteButton;
