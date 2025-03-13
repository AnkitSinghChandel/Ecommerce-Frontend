import React, { useState } from "react";
import "../../styles/ProductsList.css";
import "../../styles/asc_Anime.css";
import Header from "../../layouts/Header";

const ProductsList = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Header
        // setQuery={setQuerystring}
        leftComponent={
          <div className="leftComponentCss">
            <p className="text-[#5CAF90] font-medium text-[18px]">
              You are in Products List
            </p>
          </div>
        }
      />

      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-blue-500 text-amber-800 rounded"
        >
          Open Popup
        </button>
      </div>

      <div className={isOpen ? "asc-anime-start" : "asc-anime-exit"}>
        <h2 className="text-lg font-semibold">333Popup Content</h2>
        <p className="text-gray-600">This is a sliding popup!</p>
      </div>
    </div>
  );
};

export default ProductsList;
