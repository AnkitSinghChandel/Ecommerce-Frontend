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
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";

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
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

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
      <div
        className="flex gap-2 pointer absolute"
        style={{
          alignItems: "baseline",
          alignSelf: "end",
          right: "5px",
          bottom: "70px",
        }}
      >
        <div
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const droppedFile = Array.from(e.dataTransfer.files);
            if (droppedFile.length > 0) {
              console.log("drop imgs", droppedFile);
              setAttachmentData(droppedFile);
            }
          }}
        >
          <label className="pointer">
            <img src={attatchIcon} alt="" width={12} />
            <input
              type="file"
              multiple
              // accept="image/*"
              // accept=".doc,.docx,.pdf,.xls,.xlsx,.xml,"
              // ref={hidden_Input_File}
              style={{ display: "none" }}
              onChange={(e) => {
                console.log("fileList", e.target.files);
                // setAttachmentData(e.target.files[0]); // single file upload.
                const selectedFiles = Array.from(e.target.files);
                setAttachmentData(selectedFiles);
              }}
            />
          </label>
        </div>

        <div className="relative">
          <div onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            <img src={emojiIcon} alt="" className="" width={20} />
          </div>
          {showEmojiPicker && (
            <EmojiPicker
              emojiStyle={EmojiStyle.GOOGLE} // Apple-style emojis
              style={{
                position: "absolute",
                top: "30px",
                right: "-45px",
                zIndex: "1",
              }}
              onEmojiClick={(e) => {
                if (!props.editor) return;
                props.editor.chain().focus().insertContent(e.emoji).run();
              }}
            />
          )}
        </div>

        <div>
          <button
            className="pointer"
            disabled={props.messageContent === "" && !attachmentData}
            onClick={() => {
              handleSendMessage();
              setEditorContent();
            }}
          >
            <img src={sendIcon} alt="" width={25} />
          </button>
        </div>
      </div>

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

          {messageData && messageData.length > 4 && (
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
