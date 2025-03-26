import React, { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

function MyTodoTask2() {
  const [Ankit] = useAutoAnimate();

  const [personalTaskData, setPersonalTaskData] = useState([
    {
      firstName: "",
      middleName: "",
      lastName: "",
    },
  ]);

  const handleOnChange2 = (index, key, value) => {
    // here value = e.target.value
    // and key = like => list[index]["supplier"]

    let list = [...personalTaskData];
    list[index][key] = value;
    let firstName_length = list[index]["firstName"].length;
    let middleName_length = list[index]["middleName"].length;
    let LastName_length = list[index]["lastName"].length;

    if (firstName_length > 0 && middleName_length > 0 && LastName_length > 0) {
      let obj = list[index + 1];
      if (!obj) {
        list.push({
          firstName: "",
          middleName: "",
          lastName: "",
        });
      }
    }
    setPersonalTaskData([...list]);
  };

  const handleOnChange = (index, key, value) => {
    let list = [...personalTaskData];
    list[index][key] = value;

    const { firstName, middleName, lastName } = list[index];

    if (firstName && middleName && lastName && !list[index + 1]) {
      list.push({ firstName: "", middleName: "", lastName: "" });
    }
    setPersonalTaskData(list);
  };

  return (
    <div ref={Ankit}>
      <p className="pt-3">My Personal ToDo Tasks2</p>

      {personalTaskData.map((item, index) => {
        return (
          <div
            className="flex gap-2 pt-5"
            key={index}
            style={{ marginBottom: "10px" }}
          >
            <input
              type="text"
              placeholder="First Name"
              className="ms-2 border-1"
              value={item.firstName}
              onChange={(e) =>
                handleOnChange(index, "firstName", e.target.value)
              }
            />

            <input
              type="text"
              placeholder="Middle Name"
              className="ms-2 border-1"
              value={item.middleName}
              onChange={(e) =>
                handleOnChange(index, "middleName", e.target.value)
              }
            />

            <input
              type="text"
              placeholder="Last Name"
              className="ms-2 border-1"
              value={item.lastName}
              onChange={(e) =>
                handleOnChange(index, "lastName", e.target.value)
              }
            />

            <div className="flex gap-2 pointer">
              {personalTaskData.length !== 1 && (
                <p
                  className="font-bold text-red-500"
                  onClick={() => {
                    let data = [...personalTaskData];
                    data.splice(index, 1);
                    setPersonalTaskData(data);
                  }}
                >
                  x
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MyTodoTask2;
