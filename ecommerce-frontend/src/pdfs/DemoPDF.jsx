import React from "react";
import ASC22 from "../assets/images/ASC22.jpg";
import "../pdfs/PDF.css";
import { jsPDF } from "jspdf";

const DemoPDF = () => {
  // you have to define Ideal width of A4 Paper size => 595 x 842 pixels.
  // and you need set content under these width.
  // and Remove width , height, border etc after taking refrence of pdf.

  return (
    <div
      className="p-3"
      id="pdf_section"
      style={{ width: "595px", border: "2px solid red" }}
    >
      <img src={ASC22} alt="" style={{ width: "100px" }} />

      <div className="flex flex-wra-p gap-3 pt-2" style={{ fontSize: "12px" }}>
        <p className="text-[red]">
          LIST PDF Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Nostrum illo odio sunt ratione fugit quia, suscipit possimus
          consectetur dignissimos eaque eos animi corporis aspernatur, officia
          aperiam necessitatibus quod debitis quibusdam.
        </p>

        <p className="text-[green]">
          LIST PDF Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Nostrum illo odio sunt ratione fugit quia, suscipit possimus
          consectetur dignissimos eaque eos animi corporis aspernatur, officia
          aperiam necessitatibus quod debitis quibusdam.
        </p>
      </div>

      <div className="flex gap-3 items-center" style={{ width: "100%" }}>
        <div className="borderClass">
          <p>Ankit</p>
          <p>Singh</p>
          <p>Ankit</p>
        </div>
      </div>

      <p className="text-[blue] pt-4" style={{ fontSize: "14px" }}>
        Ankit Singh Chandel Senior Software Engineer at Quick Live Solutions
        Company. Working in Frontend Side development and working with REST
        APIs. using React.js framework to develop frontend logic. Ankit Singh
        Chandel Senior Software Engineer at Quick Live Solutions Company.
        Working in Frontend Side development and working with REST APIs. using
        React.js framework to develop frontend logic. Ankit Singh Chandel Senior
        Software Engineer at Quick Live Solutions Company. Working in Frontend
        Side development and working with REST APIs. using React.js framework to
        develop frontend logic. Ankit Singh Chandel Senior Software Engineer at
        Quick Live Solutions Company. Working in Frontend Side development and
        working with REST APIs. using React.js framework to develop frontend
        logic. Ankit Singh Chandel Senior Software Engineer at Quick Live
        Solutions Company. Working in Frontend Side development and working with
        REST APIs. using React.js framework to develop frontend logic. Ankit
        Singh Chandel Senior Software Engineer at Quick Live Solutions Company.
        Working in Frontend Side development and working with REST APIs. using
        React.js framework to develop frontend logic. Ankit Singh Chandel Senior
        Software Engineer at Quick Live Solutions Company. Working in Frontend
        Side development and working with REST APIs. using React.js framework to
        develop frontend logic. Ankit Singh Chandel Senior Software Engineer at
        Quick Live Solutions Company. Working in Frontend Side development and
        working with REST APIs. using React.js framework to develop frontend
        logic.Ankit Singh Chandel Senior Software Engineer at Quick Live
        Solutions Company. Working in Frontend Side development and working with
        REST APIs. using React.js framework to develop frontend logic.Ankit
        Singh Chandel Senior Software Engineer at Quick Live Solutions Company.
        Working in Frontend Side development and working with REST APIs. using
        React.js framework to develop frontend logic.Ankit Singh Chandel Senior
        Software Engineer at Quick Live Solutions Company. Working in Frontend
        Side development and working with REST APIs. using React.js framework to
        develop frontend logic.Ankit Singh Chandel Senior Software Engineer at
        Quick Live Solutions Company. Working in Frontend Side development and
        working with REST APIs. using React.js framework to develop frontend
        logic.
      </p>
    </div>
  );
};

export default DemoPDF;
