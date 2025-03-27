import React, { useEffect, useState } from "react";
// import "../../styles/TeamListPDF.css";
import moment from "moment";
// using html2pdf

const TeamListGenratePDF = ({ teamListData }) => {
  return (
    <div className="ascTableWrapper pt-3 px-5" id="teamPDFSection">
      <table className="tableContainer table" style={{ fontSize: "13px" }}>
        <thead>
          <tr className="tableHeading">
            <td className="txtField">S.No</td>
            <th className="txtField" style={{ width: "10%" }}>
              Date
            </th>
            <th className="txtField">First Name</th>
            <th className="txtField">Last Name</th>
            <th className="txtField">Technology</th>
            <th className="txtField" style={{ width: "20%" }}>
              Email
            </th>
            <th></th>
          </tr>
        </thead>

        <tbody className="tabLine" style={{ width: "500px" }}>
          {teamListData?.map((item, index) => {
            return (
              <tr className="trHover">
                <td>{index + 1}</td>
                <td>{moment(item.creationDate).format("DD.MM.YYYY")}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email ? item.email : "No email"}</td>
                <td>{item.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TeamListGenratePDF;
