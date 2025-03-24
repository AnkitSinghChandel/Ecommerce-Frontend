import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import "../../styles/TeamList.css";
// import "../../styles/TeamListPDF.css";
import editIcon from "../../assets/icons/edit-2.svg";
import Pdficon from "../../assets/icons/Pdficon.svg";
import binIcon from "../../assets/icons/Bin.svg";
import search from "../../assets/icons/search.svg";
import searchIcon from "../../assets/icons/searchicon.svg";
import upArrow from "../../assets/icons/upArrow.png";
import ASC22 from "../../assets/images/ASC22.jpg";
import Header from "../../layouts/Header";
import CancelPopup from "../../dialogs/CancelPopup";
import { Tooltip } from "antd";
import { Empty } from "antd";
import {
  fetchAllTeams,
  deleteTeamById,
  TeamsGeneratePDF,
} from "../../redux/actions/teamAction";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import CurrentWeekDates from "../../datePicker/CurrentWeekDates";

import { toast } from "react-toastify";
import {
  playSuccessSound,
  playErrorSound,
} from "../../notifications-alert/CustomToastify";

// import html2pdf from "html2pdf.js";
// import TeamListPDF from "../../pdfs/TeamListPDF";

const TeamsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const SearchInputRef = useRef(null);
  const [Ankit] = useAutoAnimate();

  const fetchTeamRes = useSelector((state) => state.team.fetchTeamRes);
  const deleteTeamRes = useSelector((state) => state.team.deleteTeamRes);

  const [teamListData, setTeamListData] = useState([]);
  const [searching, setSearching] = useState("");
  const [orderBy, setOrderBy] = useState();
  const [apimessage, setApimessage] = useState("");
  const [searchBorderShow, setSearchBorderShow] = useState(false);
  const [arrowOptionsRotate, setArrowOptionsRotate] = useState(false);
  const [teamDelete, setTeamDelete] = useState("");
  const [teamDeleteName, setTeamDeleteName] = useState("");
  const [selectedSortShow, setSelectedSortShow] = useState(false);
  const [selectedSort, setSelectedSort] = useState("");

  // asc cancel popup start //
  const [cancelPopupShow, setCancelPopupShow] = useState(false);
  const handleClose = () => setCancelPopupShow(false);

  const handleCancel = (e) => {
    // history.push("/InvoiceAllList");
    navigate(-1);
  };
  const [typeInScreen, setTypeInScreen] = useState("");
  // asc cancel popup end //

  useEffect(() => {
    // dispatch(TeamsGeneratePDF());
  }, []);

  useEffect(() => {
    let a;
    if (orderBy === true) {
      a = "ascending";
    } else if (orderBy === false) {
      a = "descending";
    }
    dispatch(fetchAllTeams(searching, selectedSort, a));
  }, [searching, orderBy, selectedSort]);

  useEffect(() => {
    if (fetchTeamRes.status === true) {
      setTeamListData(fetchTeamRes.data);
    }
    if (fetchTeamRes.status === false) {
      setTeamListData(fetchTeamRes.data);
      setApimessage(fetchTeamRes?.message || "Failed to fetch team data.");
    }
  }, [fetchTeamRes]);

  useEffect(() => {
    if (deleteTeamRes.status === true) {
      toast.success(`${teamDeleteName} Deleted successfully`, {
        // autoClose: 3000,
        onOpen: playSuccessSound,
      });
      dispatch(fetchAllTeams());
    }
  }, [deleteTeamRes]);

  // const handleDeleteTeam = (teamDltId) => {
  //   dispatch(deleteTeamById(teamDltId));
  // };

  const handleDeleteTeam = () => {
    dispatch(deleteTeamById(teamDelete));
    setCancelPopupShow(false);
  };

  // ASC html2pdf pdf for start
  // const downloadPDF = (selectedName) => {
  //   const element = document.getElementById("teamPDFSection"); // pass id here of pdf div
  //   if (element) {
  //     html2pdf()
  //       .from(element)
  //       .set({
  //         // filename: "asc.pdf",
  //         filename: `${selectedName}.pdf`,
  //         html2canvas: { scale: 7 }, // Scale factor for better quality not more than 9
  //         jsPDF: { unit: "in", format: "letter", orientation: "portrait" }, // PDF options
  //       })
  //       .save()
  //       .then(() => {
  //         toast.success(`${selectedName} Download complete`, {
  //           // autoClose: 3000,
  //           onOpen: playSuccessSound,
  //         });
  //       });
  //   } else {
  //     console.error("Element not found for PDF conversion");
  //   }
  // };
  // ASC html2pdf pdf for end

  useEffect(() => {
    if (searchBorderShow && SearchInputRef.current) {
      SearchInputRef.current.focus();
    }
  }, [searchBorderShow]);

  return (
    <div className="ascSmooth">
      <Header
        setQuery={setSearching}
        placeholder={"You are in teams list..."}
        leftComponent={
          <div className="leftComponentCss">
            <p className="text-[#5CAF90] font-medium text-[18px]">
              {/* You are in Products List */}
            </p>
          </div>
        }
      />

      {cancelPopupShow && (
        <CancelPopup
          open={cancelPopupShow}
          // onCancel={() => setCancelPopupShow(false)}
          onCancel={handleClose}
          onOk={handleDeleteTeam}
          title={""}
          keyboard={true}
        />
      )}

      <sorting-and-searching-Div>
        <div className="flex justify-between flex-wrap pt-4 px-5">
          <div className="flex gap-3 items-center">
            <p className="text-[#4b5966] hover:text-[#5CAF90] text-[18px] font-medium">
              Team List
            </p>
            <img
              src={upArrow}
              alt=""
              className={arrowOptionsRotate ? "upArrow mt-1" : "downArrow mt-1"}
              onClick={() => {
                setArrowOptionsRotate(!arrowOptionsRotate);
                setOrderBy(!orderBy);
              }}
            />

            <div className="relative" ref={Ankit}>
              <p
                className="text-[#4b5966] hover:text-[#5CAF90] text-[18px] font-medium pointer"
                onClick={() => setSelectedSortShow(!selectedSortShow)}
              >
                {selectedSort || "Select..."}
              </p>

              {selectedSortShow && (
                <div className="selectBox2 py-2 px-3">
                  <h6 className="mb-1 text-[gray] text-[16px] opacity-50">
                    Select...
                  </h6>
                  <p
                    className="mb-1"
                    onClick={() => {
                      setSelectedSort("React");
                      setSelectedSortShow(false);
                    }}
                  >
                    React
                  </p>
                  <p
                    className="mb-1"
                    onClick={() => {
                      setSelectedSort("Node");
                      setSelectedSortShow(false);
                    }}
                  >
                    Node
                  </p>
                  <p
                    className="mb-1"
                    onClick={() => {
                      setSelectedSort("JavaScript");
                      setSelectedSortShow(false);
                    }}
                  >
                    JavaScript
                  </p>
                  <p
                    className="mb-1"
                    onClick={() => {
                      setSelectedSort("Python");
                      setSelectedSortShow(false);
                    }}
                  >
                    <span className="flex justify-between gap-2">
                      Python
                      {selectedSort === "Python" && (
                        <span className="ms-auto pe-2">✔</span>
                      )}
                    </span>
                  </p>
                </div>
              )}

              {/* another way */}
              {selectedSortShow && (
                <div className="selectBox2 py-2 px-3 left-[200px]!">
                  <h6 className="mb-1 ps-2 text-gray-600">Select...</h6>
                  {["React", "Node", "JavaScript", "Python"].map((item) => (
                    <div
                      key={item}
                      className="mb-1 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                      onClick={() => {
                        setSelectedSort(item);
                        setSelectedSortShow(false);
                      }}
                    >
                      <span className="flex justify-between gap-2">
                        {item}

                        {selectedSort === item && (
                          <span className="ms-auto pe-2">✔</span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <search-Section>
            <div className="relative hidden sm:block">
              <input
                ref={SearchInputRef}
                className={
                  searchBorderShow ? "search_input ps-2 pe-5" : "invisibleInput"
                }
                type="text"
                placeholder="Search Team..."
                autoFocus={true}
                value={searching}
                onChange={(e) => {
                  setSearching(e.target.value);
                }}
              />
              <img
                className="search_input_icon"
                src={searchBorderShow ? search : searchIcon}
                alt=""
                onClick={() => {
                  setSearchBorderShow(!searchBorderShow);
                }}
              />
            </div>
          </search-Section>
        </div>
      </sorting-and-searching-Div>

      <div className="ascTableWrapper mt-7 px-5" id="">
        <table className="tableContainer table">
          <thead>
            <tr className="tableHeading">
              <th className="txtField">S.No</th>
              <th className="txtField" style={{ width: "10%" }}>
                Date
              </th>
              <th className="txtField">First Name</th>
              <th className="txtField">Last Name</th>
              <th className="txtField">Technology</th>
              <th className="txtField" style={{ width: "20%" }}>
                Email
              </th>
              <th className="txtField">Phone Number</th>
              <th className="txtField">Developer's Price</th>
              <th className="invisible">ASC</th>
              <th className="invisible">ASC</th>
              <th className="invisible">ASC</th>
            </tr>
          </thead>
          <tbody ref={Ankit}>
            {/* {tableData.map((row) => (
                <tr key={row.id}>
                  <td data-label="ID">{row.id}</td>
                  <td data-label="Name">{row.name}</td>
                  <td data-label="Email">{row.email}</td>
                  <td data-label="Role">{row.role}</td>
                </tr>
              ))} */}
            {teamListData?.map((item, index) => {
              console.log("asc team data", item);
              return (
                <tr key={index}>
                  <td className="ps-3">{index + 1}</td>
                  <td>{moment(item.creationDate).format("DD.MM.YYYY")}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.technology ? item.technology : "No Technology"}</td>
                  <td>{item.email}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{`₹ ${item.devsPrice}`}</td>

                  <td style={{ width: "50px" }}>
                    <Tooltip title="Edit Team">
                      <img
                        className="editIconClass pointer"
                        src={editIcon}
                        alt=""
                        // onClick={() => {
                        //   history.push({
                        //     pathname: "/NewInvoice",
                        //     state: {
                        //       from: "Quote_Screen",
                        //       historyQuoteid: quote.quoteid,
                        //       historyQuoteCode: quote.quotecode,
                        //       historyProjectid: quote.projectid,
                        //       historyProjectName: quote.projectname,
                        //       historyClientid: client?.clientid,
                        //       historyClientName: client.clientname,
                        //     },
                        //   });
                        // }}

                        onClick={() =>
                          navigate({
                            // pathname: "/update-team",
                            // pathname: `/update-team/${item._id}`,
                            pathname: `/update-team/${item._id}`,
                            state: {
                              from: "TeamList",
                              navigateId: item._id,
                              param2: "asc4",
                              asc: "asc",
                            },
                          })
                        }
                      />
                    </Tooltip>
                  </td>

                  <td style={{ width: "50px" }}>
                    <Tooltip title="PDF Team">
                      <img
                        className="editIconClass pointer"
                        src={Pdficon}
                        alt=""
                        onClick={() => {
                          // setTeamDelete(item._id);
                          // setTeamDeleteName(item.firstName);
                          // downloadPDF(item.firstName);
                        }}
                      />
                    </Tooltip>
                  </td>

                  <td style={{ width: "50px" }}>
                    <Tooltip title="Delete Team" color={"red"}>
                      <img
                        className="editIconClass pointer"
                        src={binIcon}
                        alt=""
                        // onClick={() => handleDeleteTeam(item._id)}
                        onClick={() => {
                          setCancelPopupShow(true);
                          setTeamDelete(item._id);
                          setTeamDeleteName(item.firstName);
                        }}
                      />
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {teamListData.length === 0 && (
          <div className="pt-10">
            <Empty />
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamsList;
