import React, { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

function MyTodoTask() {
  const [Ankit] = useAutoAnimate();

  const [personalTaskData, setPersonalTaskData] = useState([]);

  const [staticFirstName, setStaticFirstName] = useState("");
  const [staticMiddleName, setStaticMiddleName] = useState("");
  const [staticLastName, setStaticLastName] = useState("");

  const handleInputChange = (index, field, value) => {
    const newItems = [...personalTaskData];
    newItems[index][field] = value;
    setPersonalTaskData(newItems);
  };

  // example arr ke 7th index me koi value dalna.
  let arr = [1, 2, 3, 4];
  arr[7] = 5;
  // arr[arr.length] = 5; for taking auto index
  console.log("asc56 todo", arr);

  return (
    <div ref={Ankit}>
      <p className="pt-3">My Personal ToDo Tasks</p>

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
                handleInputChange(index, "firstName", e.target.value)
              }
            />

            <input
              type="text"
              placeholder="Middle Name"
              className="ms-2 border-1"
              value={item.middleName}
              onChange={(e) =>
                handleInputChange(index, "middleName", e.target.value)
              }
            />

            <input
              type="text"
              placeholder="Last Name"
              className="ms-2 border-1"
              value={item.lastName}
              onChange={(e) =>
                handleInputChange(index, "lastName", e.target.value)
              }
            />

            <div className="flex gap-2 font-bold pointer">
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
            </div>
          </div>
        );
      })}

      {/* static Fields start */}
      <div className="flex gap-2 pt-5" style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="First Name"
          className="ms-2 border-1"
          value={staticFirstName}
          onChange={(e) => setStaticFirstName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Middle Name"
          className="ms-2 border-1"
          value={staticMiddleName}
          onChange={(e) => setStaticMiddleName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Last Name"
          className="ms-2 border-1"
          value={staticLastName}
          onChange={(e) => setStaticLastName(e.target.value)}
        />

        <div className="flex gap-2 font-bold pointer">
          {staticFirstName !== "" &&
            staticMiddleName !== "" &&
            staticLastName !== "" && (
              <p
                className="text-green-500"
                onClick={() => {
                  let arr = [...personalTaskData];
                  arr.push({
                    firstName: staticFirstName,
                    middleName: staticMiddleName,
                    lastName: staticLastName,
                  });
                  setPersonalTaskData(arr);

                  setStaticFirstName("");
                  setStaticMiddleName("");
                  setStaticLastName("");
                }}
              >
                ✔
              </p>
            )}
        </div>
      </div>
    </div>
  );
}

export default MyTodoTask;
