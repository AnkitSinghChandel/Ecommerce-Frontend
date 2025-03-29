import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  sendMessage,
  fetchMessageByTaskId,
} from "../../redux/actions/taskAction";
import { useSelector, useDispatch } from "react-redux";
import sendIcon from "../../assets/icons/send.svg";
import attatchIcon from "../../assets/icons/attatch-icon.svg";
import emojiIcon from "../../assets/icons/emoji.svg";
import binIcon from "../../assets/icons/Bin.svg";
import parse from "html-react-parser";
import { Tooltip } from "antd";
import moment from "moment";
import Linkify from "linkify-react";

const Messages = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Ankit] = useAutoAnimate();
  const params = useParams();
  const userID = localStorage.getItem("userid");

  const [editorContent, setEditorContent] = useState("");
  const [messageData, setMessageData] = useState([]);
  const [attachmentData, setAttachmentData] = useState([]);
  const [showMoreComm, setShowMoreComm] = useState(false);
  let displayQuantity = showMoreComm ? undefined : 5;

  const addTaskMessageRes = useSelector(
    (state) => state.task.addTaskMessageRes
  );

  const fetchMessageByTaskIdRes = useSelector(
    (state) => state.task.fetchMessageByTaskIdRes
  );

  useEffect(() => {
    dispatch(fetchMessageByTaskId(props.taskID));
  }, [dispatch, props.taskID, addTaskMessageRes]);

  useEffect(() => {
    if (fetchMessageByTaskIdRes.status === true) {
      setMessageData(fetchMessageByTaskIdRes.data);
    }
  }, [fetchMessageByTaskIdRes]);

  const handleSendMessage = () => {
    if (props.isContentEmpty) {
      return false;
    }
    dispatch(sendMessage(userID, " ", props.taskID, props.messageContent));
    props.clear(""); // to clear setEditorContent in Editor screen.
  };

  const linkifyOptions = {
    attributes: {
      target: "_blank",
      rel: "noopener noreferrer",
    },
  };

  const formatFileSize = (size) => {
    return size >= 1024 * 1024
      ? `${(size / (1024 * 1024)).toFixed(2)} MB`
      : `${(size / 1024).toFixed(2)} KB`;
  };

  console.log("msg props", props);

  return (
    <>
      {/* comments section start */}
      <div ref={Ankit}>
        {attachmentData?.map((item, index) => {
          return (
            <li className="ps-3 pt-2" key={index}>
              {item.name} ({formatFileSize(item.size)})
            </li>
          );
        })}

        {/* <p>{attachmentData.name}</p> */}

        <div className="flex justify-between pt-3 px-2">
          <p>Comments</p>

          {messageData && messageData.length > 5 && (
            <p
              className="pointer"
              onClick={() => {
                setShowMoreComm(!showMoreComm);
              }}
            >
              {showMoreComm ? " Show less..." : "Show more..."}
            </p>
          )}
        </div>

        {messageData.slice(0, displayQuantity).map((item, index) => {
          return (
            <div key={index}>
              {/* <div
                className="commentsDiv my-3"
                dangerouslySetInnerHTML={{ __html: item.message }}
              /> */}

              <div className="commentsDiv my-3">
                {/* <Linkify options={linkifyOptions}>
                  {parse(item.message)}
                </Linkify> */}

                {item.isdeleted ? (
                  <span>This message was deleted</span>
                ) : (
                  <Linkify
                    options={{
                      attributes: {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      },
                    }}
                  >
                    {parse(item.message)}
                  </Linkify>
                )}

                <div className="flex gap-2">
                  <Tooltip title="Delete Msg" color={"red"}>
                    <img
                      src={binIcon}
                      alt=""
                      className="ms-auto w-[12px] pointer"
                      onClick={() => {
                        // asc
                      }}
                    />
                  </Tooltip>
                  <p className="mb-0 text-[14px]">
                    {moment(item.createdAt).format("DD.MM.YYYY,h:mm a")}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* comments section end */}
    </>
  );
};

export default Messages;
