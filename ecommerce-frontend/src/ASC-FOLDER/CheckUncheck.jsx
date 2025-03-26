import React, { useState } from "react";

const PushedOnCheck = () => {
  let dummyData = [
    {
      id: "1",
      name: "Ankit",
      img: "https://lighthouse-spire.s3.eu-west-2.amazonaws.com/Ankit Singh.jpg",
    },

    {
      id: "2",
      name: "Singh",
      img: "https://lighthouse-spire.s3.eu-west-2.amazonaws.com/ASC2.jpg",
    },
    {
      id: "3",
      name: "Chandel",
      img: "https://lighthouse-spire.s3.eu-west-2.amazonaws.com/ASC22.jpg",
    },
    {
      id: "4",
      name: "Ashu",
      img: "https://lighthouse-spire.s3.eu-west-2.amazonaws.com/ASC22.jpg",
    },
  ];

  const [selectedItem, setSelectedItem] = useState([]);
  const [ascID, setAscID] = useState([]);
  console.log("asc3", selectedItem);

  return (
    <div>
      {dummyData.map((item, index) => {
        return (
          <div
            className="flex gap-4 ps-5"
            style={{ position: "relative" }}
            key={index}
          >
            <input
              className="form-check-input pointer"
              type="checkbox"
              // value="Not invoiced"
              id={item.id}
              // when want to checked one by one checkBox
              checked={selectedItem.find((data) => data.pushedID === item.id)}
              onClick={() => {
                let index2 = selectedItem.findIndex(
                  (x) => x.pushedID === item.id
                );
                console.log("asc3indx", index2);

                if (index2 !== -1) {
                  let data = [...selectedItem];
                  data.splice(index2, 1);
                  setSelectedItem(data);
                  return;
                }

                let pushingItem = [...selectedItem];
                pushingItem.push({
                  pushedName: item.name,
                  pushedID: item.id,
                });
                setSelectedItem(pushingItem);
              }}
            />
            <label htmlFor={item.id}>
              <p>{item.name}</p>
            </label>
          </div>
        );
      })}
    </div>

    // <div>
    //   {dummyData.map((item, index) => {
    //     return (
    //       <div className="flex gap-4 ps-5" style={{ position: "relative" }}>
    //         <input
    //           class="form-check-input pointer"
    //           type="checkbox"
    //           // value="Not invoiced"
    //           id={item.id}

    //           // when want to checked only single checkBox
    //           checked={item.id === ascID}
    //           onClick={() => {
    //             setAscID(item.id);

    //             let index2 = selectedItem.findIndex((x) => x.pushedID === item.id);
    //             console.log("asc3indx", index2);

    //             if (index2 !== -1) {
    //               let data = [...selectedItem];
    //               data.splice(index2, 1);
    //               setSelectedItem(data);
    //               setAscID("");
    //               return;
    //             }

    //             let pushingItem = [];
    //             pushingItem.push({
    //               pushedName: item.name,
    //               pushedID: item.id,
    //             });
    //             setSelectedItem(pushingItem);
    //           }}
    //         />
    //         <label htmlFor={item.id}>
    //           <p>{item.name}</p>
    //         </label>
    //       </div>
    //     );
    //   })}
    // </div>
  );
};

export default PushedOnCheck;
