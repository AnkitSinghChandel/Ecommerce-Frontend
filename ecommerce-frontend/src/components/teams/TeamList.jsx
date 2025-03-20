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
import {
  fetchAllTeams,
  deleteTeamById,
  TeamsGeneratePDF,
} from "../../Redux/actions/teamAction";
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
  const [animationParent] = useAutoAnimate();

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
    <div>
      <Header
        // setQuery={setQuerystring}
        leftComponent={
          <div className="leftComponentCss">
            <p> You are in Teams List </p>
          </div>
        }
      />
      <div className="table-responsive pt-3 px-5" id="ascScroll">
        <table className="table table-hover">
          <thead className="custom-thead">
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
              <th className="txtField">Phone Number</th>
              <th className="txtField">Developer's Price</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody className="tabLine" ref={animationParent}>
            {teamListData?.map((item, index) => {
              return (
                <tr className="trHover " key={index}>
                  <td className="ps-3">{index + 1}</td>
                  <td>{moment(item.creationDate).format("DD.MM.YYYY")}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.technology ? item.technology : "No Technology"}</td>
                  <td>{item.email}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{`$ ${item.devsPrice}`}</td>

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
                            pathname: `/add-update-team/${item._id}`,
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
            {/* Display a message when no projects are found */}
            {teamListData.length > 0 &&
              teamListData.filter(
                (item) =>
                  item.firstName
                    ?.toLowerCase()
                    .includes(searching.toLowerCase()) ||
                  item.phoneNumber
                    ?.toLowerCase()
                    .includes(searching.toLowerCase()) ||
                  item.email?.toLowerCase().includes(searching.toLowerCase())
              ).length === 0 && <span>No projects found!</span>}

            {/* Display a message when no data to display */}
            {teamListData.length === 0 && <span>No data to display!</span>}
          </tbody>

          {/* <tbody className="tabLine">
              <tr>
                <td>Ankit</td>
              </tr>
              <tr>
                <td>Singh</td>
              </tr>
              <tr>
                <td>Chandel</td>
              </tr>
            </tbody> */}
        </table>
      </div>
    </div>
  );
};

export default TeamsList;
