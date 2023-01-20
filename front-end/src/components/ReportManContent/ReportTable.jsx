import React from "react";
import DeleteButton from "./DeleteButton";

const ReportTable = ({ reports }) => {
  let i = 0;

  return (
    <tbody>
      {reports.map((report, index) => {
        return (
          <tr key={index}>
            <td className="border border-slate-300  px-4 py-2">{++i}</td>
            <td className="border border-slate-300  px-4"> {report.postId}</td>
            <td className="border border-slate-300  px-4">{report.userId} </td>
            <td className="border border-slate-300  px-4">
              {report.reportedUser}
            </td>
            <td className="border border-slate-300  px-4">{report.report}</td>
            <td className="border border-slate-300  px-4">
              {report.createdAt}
            </td>
            <DeleteButton report={report} />
          </tr>
        );
      })}
    </tbody>
  );
};

export default ReportTable;
