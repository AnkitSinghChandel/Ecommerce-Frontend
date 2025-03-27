import React, { useState } from "react";
import ASC22 from "../assets/images/ASC22.jpg";
import moment from "moment";
import { toast } from "react-toastify";
import {
  playSuccessSound,
  playErrorSound,
} from "../notifications-alert/customToastify";

import { jsPDF } from "jspdf";

import DemoPDF from "./DemoPDF";

const Demo = () => {
  const downloadPDF = async () => {
    try {
      const pdf = new jsPDF({ unit: "px", format: "a4" });
      const content = document.getElementById("pdf_section");

      if (!content) {
        toast.error("Download failed pdf id not get", {
          onOpen: playErrorSound,
        });
        return;
      }

      const pageWidth = pdf.internal.pageSize.width;
      const pageHeight = pdf.internal.pageSize.height;
      const scale = pageWidth / content.offsetWidth;

      await pdf.html(content, {
        html2canvas: {
          scale: scale, // Apply the calculated scale.
          useCORS: true, // Ensure cross-origin resources are loaded properly.
          width: content.offsetWidth, // Ensure full content width is rendered.
          height: content.offsetHeight, // Ensure full content height is rendered.
          logging: true, // Useful for debugging issues with rendering.
          dpi: 300, // Increase DPI for better resolution (optional).
        },
        margin: [20, 0, 50, 0], // Top, Left, Bottom, Right in px unit.
        autoPaging: "text",
        valign: "top",
      });

      // 📌 Adding page numbers with loop footers
      const pageCount = pdf.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);

        // 📌 Footer content (Bottom Left)
        pdf.setFontSize(8);
        pdf.text("Company Name B.V.", 15, pageHeight - 50); // x,y in px
        pdf.text("Company Address here", 15, pageHeight - 40);
        pdf.text("Zip Code, City", 15, pageHeight - 30);

        // 📌 Footer content (Bottom Right)
        pdf.setFontSize(8);
        pdf.text("www.website.com", 200, pageHeight - 50); //x,y in px
        pdf.text("+35 1234 5678", 200, pageHeight - 40);
        pdf.text("email@example.com", 200, pageHeight - 30);

        // 📌 Add Page Number
        pdf.setFontSize(10);
        // pdf.text(
        //   `Page ${i} of ${pageCount}`,
        //   // pageWidth - 50, // Near the right edge.
        //   // pageWidth / 30, // Near the left edge.
        //   pageWidth / 2, // center edge.
        //   pageHeight - 10 // 10 pixels from the bottom.
        // );
        // pdf.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10);
        pdf.text(`Page ${i} of ${pageCount}`, 370, 620); // x=370px, y=620px
      }

      // Adding footer in bottom in last pdf page.
      pdf.setPage(pageCount);
      pdf.setFontSize(8);
      pdf.text(
        `© 2024 My Company Name. Generated on:${moment(new Date()).format(
          "DD.MM.YYYY,h:mm a"
        )}`,
        10,
        pageHeight - 10 // 10 pixels from the bottom.
      );

      // Save the PDF
      pdf.save("EnhancedListPDF.pdf");
      toast.success(`${"selectedName"} Download complete`, {
        // autoClose: 3000,
        onOpen: playSuccessSound,
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Download failed", { onOpen: playErrorSound });
    }
  };

  return (
    <div>
      <button
        className="ms-5 mt-3 border-1"
        onClick={() => {
          downloadPDF();
        }}
      >
        Button
      </button>

      <div className="p-5" id="">
        <img src={ASC22} alt="" style={{ width: "100px" }} />

        <p className="text-[red]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum illo
          odio sunt ratione fugit quia, suscipit possimus consectetur
          dignissimos eaque eos animi corporis aspernatur, officia aperiam
          necessitatibus quod debitis quibusdam.
        </p>

        <p className="text-[green]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum illo
          odio sunt ratione fugit quia, suscipit possimus consectetur
          dignissimos eaque eos animi corporis aspernatur, officia aperiam
          necessitatibus quod debitis quibusdam.
        </p>

        <p className="text-[blue]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum illo
          odio sunt ratione fugit quia, suscipit possimus consectetur
          dignissimos eaque eos animi corporis aspernatur, officia aperiam
          necessitatibus quod debitis quibusdam.
        </p>
      </div>

      <div className="hidde-n">
        <DemoPDF />
      </div>

      {/* <DemoPDF2 /> */}
    </div>
  );
};

// const DemoPDF2 = () => {
//   return (
//     <p className="text-[red]" id="pdf_section">
//       List PDF 2 22 Lorem ipsum dolor sit amet consectetur adipisicing elit.
//       Nostrum illo odio sunt ratione fugit quia, suscipit possimus consectetur
//       dignissimos eaque eos animi corporis aspernatur, officia aperiam
//       necessitatibus quod debitis quibusdam.
//     </p>
//   );
// };
export default Demo;
